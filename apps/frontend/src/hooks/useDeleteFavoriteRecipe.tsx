import { ActiveSessionResource } from "@clerk/types";
import { PostgrestError } from "@supabase/supabase-js";
import { MouseEventHandler } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteRecipe } from "../util/deleteRecipe";

export const useDeleteFavoriteRecipe = (session: ActiveSessionResource, id: string) => {
  const queryClient = useQueryClient();
  return useMutation<unknown, PostgrestError, unknown, MouseEventHandler<HTMLButtonElement>>(
    async () => {
      return await deleteRecipe(session, id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["recipes"]);
      },
    },
  );
};
