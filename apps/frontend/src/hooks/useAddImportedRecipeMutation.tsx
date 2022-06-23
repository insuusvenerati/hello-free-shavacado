import { useSession } from "@clerk/nextjs";
import { SyntheticEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ImportedRecipe } from "../types/importedRecipe";
import { addImportedRecipe } from "../util/addImportedRecipe";

export const useAddImportedRecipeMutation = () => {
  const { session } = useSession();
  const queryClient = useQueryClient();
  const [url, setUrl] = useState("");
  const { mutate, isLoading, error, isError } = useMutation<ImportedRecipe, Error, string, unknown>(
    (url: string) => addImportedRecipe({ url, user: session.user.id }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["importedRecipes", session]);
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
