import { db } from "./db.server";

export const getRecipes = async (userId: string | undefined | null) => {
  if (!userId) {
    throw new Error("Missing User ID");
  }

  return await db.recipe.findMany({
    where: {
      userId,
    },
  });
};
