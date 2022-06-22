import { useSession } from "@clerk/nextjs";
import { useQuery } from "react-query";
import { getRecipes } from "../util/getRecipes";

export const useFavoriteRecipesQuery = () => {
  const { session } = useSession();
  return useQuery(["favoriteRecipes", session], () => getRecipes(session), {
    staleTime: 60 * 60,
    refetchOnWindowFocus: false,
    notifyOnChangeProps: ["data", "error"],
    enabled: !!session,
  });
};
