import { useSession } from "@clerk/nextjs";
import { MouseEventHandler } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteImportedRecipe } from "../util/deleteImportedRecipe";

export const useDeleteImportedRecipeMutation = () => {
  const { session } = useSession();
  const queryClient = useQueryClient();
  const { mutate, isLoading, error, isError } = useMutation<
    unknown,
    unknown,
    unknown,
    MouseEventHandler<HTMLButtonElement>
  >((id: string) => deleteImportedRecipe({ id: id, user: session.user.id }), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["importedRecipes", session]);
    },
  });

  return {
    mutate,
    isLoading,
    error,
    isError,
  };
};
