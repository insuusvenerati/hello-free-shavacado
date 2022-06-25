import { useAuth } from "@clerk/nextjs";
import { useQuery } from "react-query";
import { getImportedRecipes, getOneImportedRecipe } from "../util/getImportedRecipes";

export const useGetImportedRecipesQuery = () => {
  const { userId } = useAuth();
  return useQuery(["importedRecipes", userId], () => getImportedRecipes(userId));
};

export const useGetOneImportedRecipeQuery = ({ id }: { id: string }) => {
  const { userId } = useAuth();
  return useQuery(["importedRecipe", userId, id], () => getOneImportedRecipe({ id, userId }));
};
