import { db } from "./db.server";

export const getAllCreatedRecipes = async (userId: string | null) => {
  if (!userId) {
    throw new Error("No user id provided");
  }

  const createdRecipes = await db.createdRecipe.findMany({
    where: {
      userId,
    },
  });

  return createdRecipes;
};
