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

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  await prisma.recipe.deleteMany({});

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
    },
  });

  for (let skip = 0; skip <= skipLimit; skip += 250) {
    console.log(`Fetching recipes ${skip} to ${skip + 250} with a max of ${skipLimit}...`);

    try {
      const response = await fetch(`${BASE_URL}take=250&skip=${skip}`, {
        headers: { authorization: `Bearer ${token.access_token}` },
      });

      const recipes = (await response.json()) as Recipes;

      // const ingredients = recipes.items.map((item) => item.ingredients).flat();
      // const allergens = recipes.items.map((item) => item.allergens).flat();
      // const cuisines = recipes.items.map((item) => item.cuisines).flat();
      // const categories = recipes.items.map((item) => item.category).flat();

      await prisma.$transaction(
        recipes.items.map((item) => {
          return prisma.recipe.create({
            data: {
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
                  where: { name: ingredient.name },
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
                  where: { name: allergen.name },
                  create: {
                    name: allergen.name,
                    id: allergen.id,
                    iconPath: allergen.iconPath,
                  },
                })),
              },
              cuisines: {
                connectOrCreate: item.cuisines.map((cuisine) => ({
                  where: { name: cuisine.name },
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
                      where: { name: item.category.name },
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
                  where: { name: tag.name },
                  create: {
                    name: tag.name,
                    id: tag.id,
                  },
                })),
              },
            },
          });
        }),
      );
    } catch (error) {
      console.error(error);
      continue;
    }
  }

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
