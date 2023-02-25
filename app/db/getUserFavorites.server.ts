import { prisma } from "~/db.server";

export const getUserFavorites = async (userId: string) => {
  return await prisma.favoriteRecipe.findMany({
    where: { user: { some: { id: userId } } },
    select: {
      recipe: {
        select: {
          tags: true,
          name: true,
          imagePath: true,
          id: true,
          description: true,
        },
      },
      id: true,
      recipeId: true,
    },
  });
};
