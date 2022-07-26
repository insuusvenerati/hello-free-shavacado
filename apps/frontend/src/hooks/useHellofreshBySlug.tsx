import { useQuery } from "react-query";
import { RecipeQuery } from "../types/recipes";
import { hellofreshSearchBySlug } from "../util/hellofresh";

export const useHellofreshBySlug = (
  slug: string | string[] | undefined,
  initialData?: RecipeQuery,
) => {
  return useQuery(
    ["hellofresh-by-slug", slug],
    async () => {
      return await hellofreshSearchBySlug({ slug });
    },
    { enabled: !!slug, initialData: initialData },
  );
};
