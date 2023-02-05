import { prisma } from "~/db.server";

export const getRecipeById = async (id: string) => {
  const recipe = await prisma.recipe.findUnique({
    include: {
      allergens: true,
      ingredients: true,
      category: true,
      tags: true,
      cuisines: true,
      steps: true,
    },
    where: {
      id,
    },
  });
  return recipe;
};
