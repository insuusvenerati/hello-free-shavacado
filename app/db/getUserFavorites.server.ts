import { prisma } from "~/db.server";

export const getUserFavorites = async (userId: string) => {
  return await prisma.favoriteRecipe.findMany({
    where: { user: { some: { id: userId } } },
  });
};
