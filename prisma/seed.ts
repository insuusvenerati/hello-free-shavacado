import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime";
import bcrypt from "bcryptjs";
import type { Item, Recipe } from "~/types/recipe";

const prisma = new PrismaClient();
const skipLimit = process.env.CI ? 250 : 3750;
const BASE_URL = `https://www.hellofresh.com/gw/recipes/recipes/search?country=us&locale=en-US&`;

const TOKEN_URL =
  "https://stiforr-cors-anywhere.fly.dev/https://www.hellofresh.com/gw/auth/token?client_id=senf&grant_type=client_credentials";

const itemNotValidForImport = (item: Item) => {
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

      const recipes = (await response.json()) as Recipe;

      for (const item of recipes.items) {
        if (itemNotValidForImport(item)) continue;

        const existingRecipe = await prisma.recipe.findUnique({
          where: {
            id: item.id,
            name: item.name,
          },
        });

        if (!existingRecipe) {
          try {
            await prisma.recipe.create({
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
                totalTime: item.totalTime,
                prepTime: item.prepTime,
                allergens: {
                  connectOrCreate: item.allergens.map((allergen) => ({
                    where: { name: allergen.name, id: allergen.id },
                    create: {
                      name: allergen.name,
                      iconPath: allergen.iconPath,
                      id: allergen.id,
                    },
                  })),
                },
                ingredients: {
                  connectOrCreate: item.ingredients.map((ingredient) => ({
                    where: { id: ingredient.id, name: ingredient.name },
                    create: {
                      name: ingredient.name,
                      id: ingredient.id,
                    },
                  })),
                },
                steps: {
                  connectOrCreate: item.steps.map((step) => ({
                    where: {
                      recipeId_index: { index: step.index, recipeId: item.id },
                    },
                    create: {
                      index: step.index,
                      image: step.images[0]?.path ?? undefined,
                      caption: step.images[0]?.caption ?? undefined,
                      instructions: step.instructions,
                      instructionsHTML: step.instructionsHTML,
                    },
                  })),
                },
                nutrition: JSON.stringify(item.nutrition),
                cuisines: {
                  connectOrCreate: item.cuisines.map((cuisine) => ({
                    where: { name: cuisine.name, id: cuisine.id },
                    create: {
                      name: cuisine.name,
                      iconPath: cuisine.iconPath,
                      id: cuisine.id,
                    },
                  })),
                },
                category: item.category
                  ? {
                      connectOrCreate: {
                        where: { id: item.category.id, name: item.category.name },
                        create: {
                          name: item.category.name,
                          iconPath: item.category.iconPath,
                          id: item.category.id,
                        },
                      },
                    }
                  : undefined,
                tags: {
                  connectOrCreate: item.tags.map((tag) => ({
                    where: { name: tag.name, id: tag.id },
                    create: {
                      name: tag.name,
                      id: tag.id,
                    },
                  })),
                },
              },
            });
          } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
              console.log(`Found duplicate recipe: ${item.name}`);
              const existingRecipe = await prisma.recipe.findUnique({
                where: {
                  id: item.id,
                  name: item.name,
                },
                include: {
                  allergens: true,
                },
              });
              if (existingRecipe) {
                await prisma.recipe.update({
                  where: {
                    id: existingRecipe.id,
                    name: existingRecipe.name,
                  },
                  data: {
                    description: item.description,
                    difficulty: item.difficulty,
                    imagePath: item.imagePath,
                    seoDescription: item.seoDescription,
                    averageRating: item.averageRating,
                    ratingsCount: item.ratingsCount,
                    slug: item.slug,
                    favoritesCount: item.favoritesCount,
                    totalTime: item.totalTime,
                    prepTime: item.prepTime,
                    allergens: {
                      connectOrCreate: item.allergens.map((allergen) => ({
                        where: { name: allergen.name, id: allergen.id },
                        create: {
                          name: allergen.name,
                          iconPath: allergen.iconPath,
                          id: allergen.id,
                        },
                      })),
                    },
                    ingredients: {
                      connectOrCreate: item.ingredients.map((ingredient) => ({
                        where: { id: ingredient.id, name: ingredient.name },
                        create: {
                          name: ingredient.name,
                          id: ingredient.id,
                        },
                      })),
                    },
                    steps: {
                      connectOrCreate: item.steps.map((step) => ({
                        where: {
                          recipeId_index: { index: step.index, recipeId: item.id },
                        },
                        create: {
                          index: step.index,
                          image: step.images[0]?.path ?? undefined,
                          caption: step.images[0]?.caption ?? undefined,
                          instructions: step.instructions,
                          instructionsHTML: step.instructionsHTML,
                        },
                      })),
                    },
                    nutrition: JSON.stringify(item.nutrition),
                    cuisines: {
                      connectOrCreate: item.cuisines.map((cuisine) => ({
                        where: { name: cuisine.name, id: cuisine.id },
                        create: {
                          name: cuisine.name,
                          iconPath: cuisine.iconPath,
                          id: cuisine.id,
                        },
                      })),
                    },
                    category: item.category
                      ? {
                          connectOrCreate: {
                            where: { id: item.category.id, name: item.category.name },
                            create: {
                              name: item.category.name,
                              iconPath: item.category.iconPath,
                              id: item.category.id,
                            },
                          },
                        }
                      : undefined,
                    tags: {
                      connectOrCreate: item.tags.map((tag) => ({
                        where: { name: tag.name, id: tag.id },
                        create: {
                          name: tag.name,
                          id: tag.id,
                        },
                      })),
                    },
                  },
                });
              }
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new Error(error.message);
      }
      console.error(error);
      process.exit(1);
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
