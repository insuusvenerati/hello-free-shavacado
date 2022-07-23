import { useAuth } from "@clerk/nextjs";
import { MouseEventHandler } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteRecipe } from "../util/deleteRecipe";

export const useDeleteFavoriteRecipe = (id: string | null | undefined) => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, unknown, MouseEventHandler<HTMLButtonElement>>(
    async () => {
      return await deleteRecipe({ userId, id });
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["favoriteRecipes", userId]);
        await queryClient.invalidateQueries(["groceries", userId]);
      },
    },
  );
};
