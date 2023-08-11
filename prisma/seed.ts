import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import type { Item, Recipes } from "~/types/recipe";

const prisma = new PrismaClient();
const skipLimit = process.env.CI ? 250 : 4000;
const BASE_URL = `https://www.hellofresh.com/gw/recipes/recipes/search?country=us&locale=en-US&`;

const TOKEN_URL =
  "https://stiforr-cors-anywhere.fly.dev/https://www.hellofresh.com/gw/auth/token?client_id=senf&grant_type=client_credentials";

export const itemNotValidForImport = (item: Item) => {
  return (
    !Array.isArray(item.ingredients) ||
    !item.ingredients.length ||
    !Array.isArray(item.steps) ||
    !item.steps.length ||
    item.ratingsCount < 100 ||
    item.ingredients.length < 2
  );
};

async function seed() {
  const email = "rachel@remix.run";
  const tokenResponse = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "X-Requested-With": "Stiforr",
    },
  });
  const token = await tokenResponse.json();

  await prisma.user.delete({ where: { email } }).catch(() => {});
  await prisma.recipe.deleteMany({}).catch(() => {});

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  await prisma.user.create({
    data: {
      email,
      imageUrl: "https://placeimg.com/192/192/people",
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      colorScheme: "cream",
    },
  });

  for (let skip = 0; skip <= skipLimit; skip += 50) {
    console.log(`Fetching recipes ${skip} to ${skip + 50} with a max of ${skipLimit}...`);

    try {
      const response = await fetch(`${BASE_URL}take=50&skip=${skip}`, {
        headers: { authorization: `Bearer ${token.access_token}` },
      });

      const recipes: Recipes = await response.json();

      const ingredients = recipes.items.flatMap((item) => item.ingredients);

      await prisma.$transaction(
        ingredients.map((ingredient) => {
          return prisma.ingredient.upsert({
            where: { id: ingredient.id },
            update: {
              id: ingredient.id,
              name: ingredient.name,
              description: ingredient.description,
              imageLink: ingredient.imageLink,
              imagePath: ingredient.imagePath,
              slug: ingredient.slug,
              type: ingredient.type,
            },
            create: {
              id: ingredient.id,
              name: ingredient.name,
              description: ingredient.description,
              imageLink: ingredient.imageLink,
              imagePath: ingredient.imagePath,
              slug: ingredient.slug,
              type: ingredient.type,
            },
          });
        }),
      );

      await prisma.$transaction(
        recipes.items
          .filter((item) => !itemNotValidForImport(item))
          .map((item) => {
            return prisma.recipe.upsert({
              where: { id: item.id },
              create: {
                id: item.id,
                name: item.name,
                description: item.description,
                difficulty: item.difficulty,
                imagePath: item.imagePath,
                seoDescription: item.seoDescription,
                averageRating: item.averageRating,
                ratingsCount: item.ratingsCount,
                slug: item.slug,
                favoritesCount: item.favoritesCount,
                nutrition: JSON.stringify(item.nutrition),
                totalTime: item.totalTime,
                prepTime: item.prepTime,
                ingredients: {
                  connectOrCreate: item.ingredients.map((ingredient) => ({
                    where: { id: ingredient.id },
                    create: {
                      name: ingredient.name,
                      id: ingredient.id,
                      slug: ingredient.slug,
                      description: ingredient.description,
                      imagePath: ingredient.imagePath,
                      imageLink: ingredient.imageLink,
                      type: ingredient.type,
                    },
                  })),
                },
                allergens: {
                  connectOrCreate: item.allergens.map((allergen) => ({
                    where: { id: allergen.id },
                    create: {
                      name: allergen.name,
                      id: allergen.id,
                      iconPath: allergen.iconPath,
                    },
                  })),
                },
                cuisines: {
                  connectOrCreate: item.cuisines.map((cuisine) => ({
                    where: { id: cuisine.id },
                    create: {
                      name: cuisine.name,
                      id: cuisine.id,
                      iconPath: cuisine.iconPath,
                    },
                  })),
                },
                category: item.category
                  ? {
                      connectOrCreate: {
                        where: { id: item.category.id },
                        create: {
                          name: item.category.name,
                          id: item.category.id,
                          iconPath: item.category.iconPath,
                        },
                      },
                    }
                  : {},
                steps: {
                  connectOrCreate: item.steps.map((step) => ({
                    where: { recipeId_index: { recipeId: item.id, index: step.index } },
                    create: {
                      index: step.index,
                      instructions: step.instructions,
                      instructionsHTML: step.instructionsHTML,
                      instructionsMarkdown: step.instructionsMarkdown,
                    },
                  })),
                },
                tags: {
                  connectOrCreate: item.tags.map((tag) => ({
                    where: { id: tag.id },
                    create: {
                      name: tag.name,
                      id: tag.id,
                      recipeId: item.id,
                    },
                  })),
                },
              },
              update: {},
            });
          }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  // if (process.env.NODE_ENV !== "production") {
  //   await Promise.all(
  //     recipeUrls.map(async (url) => {
  //       const recipe = await recipeDataScraper(url);

  //       return await prisma.importedRecipe.create({
  //         data: {
  //           ...recipe,
  //           image: typeof recipe.image === "object" ? recipe.image.url : recipe.image,
  //           description: recipe.description ?? null,
  //           recipeYield: recipe.recipeYield.toString() ?? null,
  //           keywords: {
  //             create: recipe.keywords?.map((keyword) => ({
  //               name: keyword,
  //             })),
  //           },
  //           recipeInstructions: {
  //             create: recipe.recipeInstructions?.map((instruction, index) => ({
  //               caption: instruction,
  //               index: index,
  //             })),
  //           },
  //           recipeIngredients: {
  //             create: recipe.recipeIngredients?.map((ingredient) => ({
  //               name: ingredient,
  //             })),
  //           },
  //           recipeCuisines: {
  //             create: recipe.recipeCuisines?.map((cuisine) => ({
  //               name: cuisine,
  //             })),
  //           },
  //           recipeCategories: {
  //             create: recipe.recipeCategories?.map((category) => ({
  //               name: category,
  //             })),
  //           },
  //           user: {
  //             connect: {
  //               id: user.id,
  //             },
  //           },
  //         },
  //       });
  //     }),
  //   );
  // }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
