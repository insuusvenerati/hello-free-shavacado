import { useClerk, useSession } from "@clerk/nextjs";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query";
import { Grocery } from "../types/grocery";
import { addGrocery } from "../util/addGrocery";

export const useAddGroceryMutation = () => {
  const { session } = useSession();
  const queryClient = useQueryClient();
  const { openSignIn } = useClerk();
  return useMutation<Grocery, Error, Grocery>(
    (grocery) => {
      return addGrocery(session, grocery, openSignIn);
    },
    {
      onSuccess: (grocery) => {
        queryClient.invalidateQueries(["groceries", session]);
        queryClient.invalidateQueries("recipes");
        showNotification({
          color: "green",
          title: "Wooo",
          message: `Successfully added ${grocery.ingredient} to your grocery list`,
        });
      },
      onError: () => {
        showNotification({
          color: "red",
          title: "Oh no",
          message: "Unable to add ingredient",
        });
      },
    },
  );
};
