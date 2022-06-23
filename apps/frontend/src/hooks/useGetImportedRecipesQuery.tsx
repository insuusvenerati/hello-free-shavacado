import { useSession } from "@clerk/nextjs";
import { useQuery } from "react-query";
import { getImportedRecipes } from "../util/getImportedRecipes";

export const useGetImportedRecipesQuery = () => {
  const { session } = useSession();
  return useQuery(["importedRecipes", session], () => getImportedRecipes(session));
};
