import { PrismaClientValidationError } from "@prisma/client/runtime";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import type { Recipe } from "~/types/recipe";

const prisma = new PrismaClient();

const BASE_URL = `https://www.hellofresh.com/gw/recipes/recipes/search?country=us&locale=en-US&`;

const TOKEN_URL =
  "https://stiforr-cors-anywhere.fly.dev/https://www.hellofresh.com/gw/auth/token?client_id=senf&grant_type=client_credentials";

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

  for (let skip = 0; skip <= 3750; skip += 250) {
    console.log(skip);

    try {
      const response = await fetch(`${BASE_URL}take=250&skip=${skip}`, {
        headers: { authorization: `Bearer ${token.access_token}` },
      });

      const recipes = (await response.json()) as Recipe;

      await prisma.$transaction(
        recipes.items.map((item) =>
          prisma.recipe.create({
            data: {
              id: item.id,
              name: item.name,
              description: item.description,
              difficulty: item.difficulty,
              imagePath: item.imagePath,
              seoDescription: item.seoDescription,
              averageRating: item.averageRating,
              slug: item.slug,
              // category: item.category
              //   ? {
              //       connectOrCreate: {
              //         where: {
              //           name: item.category?.name ?? undefined,
              //           id: item.category?.id ?? undefined,
              //         },
              //         create: {
              //           name: item.category?.name ?? undefined,
              //           iconPath: item.category?.iconPath ?? undefined,
              //         },
              //       },
              //     }
              //   : undefined,
              favoritesCount: item.favoritesCount,
              totalTime: item.totalTime,
              prepTime: item.prepTime,
              nutrition: JSON.stringify(item.nutrition),
              ingredients: {
                connectOrCreate: item.ingredients.map((ingredient) => ({
                  where: { name: ingredient.name },
                  create: {
                    name: ingredient.name,
                  },
                })),
              },
              allergens: {
                connectOrCreate: item.allergens.map((allergen) => ({
                  where: { name: allergen.name, id: allergen.id },
                  create: {
                    name: allergen.name,
                    iconPath: allergen.iconPath,
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
                    instructionsMarkdown: step.instructionsMarkdown,
                  },
                })),
              },
              tags: {
                connectOrCreate: item.tags.map((tag) => ({
                  where: { name: tag.name },
                  create: { name: tag.name },
                })),
              },
              ratingsCount: item.ratingsCount,
            },
          })
        )
      );
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
