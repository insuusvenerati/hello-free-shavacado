import { useAuth, useClerk } from "@clerk/nextjs";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query";
import { Grocery } from "../types/grocery";
import { addGrocery } from "../util/addGrocery";

type MutationError = {
  statusCode: string;
  message: string;
};

export const useAddGroceryMutation = () => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const { openSignIn } = useClerk();
  return useMutation<Grocery, MutationError, Grocery>(
    (grocery) => {
      return addGrocery(userId, grocery, openSignIn);
    },
    {
      onSuccess: async (grocery) => {
        await queryClient.invalidateQueries(["groceries", userId]);
        await queryClient.invalidateQueries(["favoriteRecipes", userId]);
        showNotification({
          color: "green",
          title: "Wooo",
          message: `Successfully added ${grocery.ingredient} to your grocery list`,
        });
      },
      onError: (error) => {
        showNotification({
          color: "red",
          title: `Code ${error.statusCode}`,
          message: "Unable to add ingredient",
        });
      },
    },
  );
};
