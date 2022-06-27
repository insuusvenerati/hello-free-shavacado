import { useAuth } from "@clerk/nextjs";
import { MouseEventHandler } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteImportedRecipe } from "../util/deleteImportedRecipe";

export const useDeleteImportedRecipeMutation = () => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const { mutate, isLoading, error, isError } = useMutation<
    unknown,
    unknown,
    unknown,
    MouseEventHandler<HTMLButtonElement>
  >((id: string) => deleteImportedRecipe({ id: id, user: userId }), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["importedRecipes", userId]);
    },
  });

  return {
    mutate,
    isLoading,
    error,
    isError,
  };
};
