import { useClerk } from "@clerk/nextjs";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query";
import { CreatedRecipe } from "types/createdRecipe";
import { addCreatedRecipe } from "util/addCreatedRecipe";

type AddRecipe = {
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  difficulty: string;
  tags: string[];
  image: string;
};

export const useAddCreatedRecipeMutation = () => {
  const queryClient = useQueryClient();
  const { openSignIn, user } = useClerk();

  if (!user) {
    openSignIn();
  }

  return useMutation<CreatedRecipe, Error, AddRecipe, unknown>(
    (recipe) => addCreatedRecipe(user, recipe),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["created-recipe", user]);
        showNotification({
          color: "green",
          title: "Wooo",
          message: "Successfully added recipe",
        });
      },
      onError: (error) => {
        showNotification({
          color: "red",
          title: "Oh no",
          message: error.message,
        });
      },
    },
  );
};
