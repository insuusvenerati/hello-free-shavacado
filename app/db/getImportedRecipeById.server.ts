import { prisma } from "~/db.server";

export const getImportedRecipeById = async (id: string) => {
  const recipes = await prisma.importedRecipe.findUnique({
    where: { id },
    include: {
      recipeIngredients: true,
      recipeInstructions: true,
    },
  });
  return recipes;
};
