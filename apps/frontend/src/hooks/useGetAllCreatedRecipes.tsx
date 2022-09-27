import { useAuth, useClerk } from "@clerk/nextjs";
import { useQuery } from "react-query";
import { CreatedRecipe } from "types/createdRecipe";
import { getAllCreatedRecipes } from "util/getAllCreatedRecipes";

/**
 * React hook to get all created recipes and return them
 */
export const useGetAllCreatedRecipes = () => {
  const { userId, getToken } = useAuth();
  const { openSignIn } = useClerk();

  if (!userId) {
    openSignIn();
  }

  return useQuery<CreatedRecipe[], unknown>(
    ["created-recipe", userId],
    async () => getAllCreatedRecipes({ userId, token: await getToken() }),
    {
      enabled: !!userId,
    },
  );
};
