import { useQuery } from "react-query";
import { getAllIngredients } from "util/getAllIngredients";

export const useGetAllIngredients = () => {
  return useQuery(["ingredients"], getAllIngredients);
};
