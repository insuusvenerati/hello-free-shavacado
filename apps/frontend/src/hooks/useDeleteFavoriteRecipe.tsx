import { ActiveSessionResource } from "@clerk/types";
import { MouseEventHandler } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteRecipe } from "../util/deleteRecipe";

export const useDeleteFavoriteRecipe = (session: ActiveSessionResource, id: string) => {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, unknown, MouseEventHandler<HTMLButtonElement>>(
    async () => {
      return await deleteRecipe(session, id);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("recipes");
        await queryClient.invalidateQueries(["groceries", session]);
      },
    },
  );
};
