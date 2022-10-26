import { db } from "./db.server";

export const getImportedRecipes = async (userId: string | undefined | null) => {
  if (!userId) throw new Error("No user id");

  return await db.importedRecipe.findMany({
    where: {
      userId,
    },
  });
};
