import { useClerk, useSession } from "@clerk/nextjs";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query";
import { Grocery } from "../types/grocery";
import { addGrocery } from "../util/addGrocery";

type MutationError = {
  statusCode: string;
  message: string;
};

export const useAddGroceryMutation = () => {
  const { session } = useSession();
  const queryClient = useQueryClient();
  const { openSignIn } = useClerk();
  return useMutation<Grocery, MutationError, Grocery>(
    (grocery) => {
      return addGrocery(session, grocery, openSignIn);
    },
    {
      onSuccess: async (grocery) => {
        await queryClient.invalidateQueries(["groceries", session]);
        await queryClient.invalidateQueries(["favoriteRecipes", session]);
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
