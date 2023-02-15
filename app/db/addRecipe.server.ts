import { typedjson } from "remix-typedjson";
import { prisma } from "~/db.server";
import { getRecipeByName } from "~/models/recipe.server";
import { getTokenFromDatabase } from "~/models/token.server";

export const addRecipe = async ({
  name,
  id,
  userId,
}: {
  name: string;
  id: string;
  userId: string;
}) => {
  const token = await getTokenFromDatabase();
  const recipes = await getRecipeByName({ name, token });

  if (!recipes.items.length) {
    return typedjson({ ok: "false", result: "Recipe not found", method: "POST" });
  }

  const item = recipes.items[0];

  const createRecipeResult = await prisma.recipe.create({
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

  if (createRecipeResult) {
    const addRecipeResult = await prisma.favoriteRecipe.upsert({
      where: {
        recipeId: id,
      },
      update: {
        user: {
          connect: {
            id: userId,
          },
        },
      },
      create: {
        user: {
          connect: {
            id: userId,
          },
        },
        recipe: {
          connect: {
            id,
          },
        },
      },
    });
    return typedjson({ ok: "true", result: addRecipeResult, method: "POST" });
  }

  return typedjson({ ok: "false", result: "Unknown error occured", method: "POST" });
};
