import { useAuth, useClerk } from "@clerk/nextjs";
import { SyntheticEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ImportedRecipe } from "../types/importedRecipe";
import { addImportedRecipe } from "../util/addImportedRecipe";

export const useAddImportedRecipeMutation = () => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const [url, setUrl] = useState("");
  const { openSignIn } = useClerk();
  const { mutate, isLoading, error, isError } = useMutation<ImportedRecipe, Error, string, unknown>(
    (url: string) => addImportedRecipe({ url, user: userId, openSignIn }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["importedRecipes", userId]);
      },
    },
  );

  const onSubmitHandler = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(url);
  };

  return {
    isLoading,
    onSubmitHandler,
    setUrl,
    url,
    error,
    isError,
  };
};
