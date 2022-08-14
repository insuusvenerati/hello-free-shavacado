import { useQuery } from "react-query";
import { getRecipeById } from "util/getRecipeById";

export const useGetRecipeById = (id: string | undefined) => {
  return useQuery(["get-recipe-by-id", id], () => getRecipeById({ id }), { enabled: !!id });
};
