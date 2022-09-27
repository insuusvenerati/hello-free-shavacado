import { useAuth } from "@clerk/nextjs";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query";
import { AddGrocery, Grocery } from "../types/grocery";
import { addGrocery } from "../util/addGrocery";

export const useAddGroceryMutation = () => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  return useMutation<Grocery, Error, AddGrocery, unknown>(
    (grocery) => {
      return addGrocery(userId, grocery);
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
          title: error.message,
          message: "Unable to add ingredient",
        });
      },
    },
  );
};
