import { getCookie } from "cookies-next";
import { useQuery } from "react-query";
import { RecipeQuery } from "../types/recipes";
import { hellofreshSearchBySlug } from "../util/hellofresh";

export const useHellofreshBySlug = (
  slug: string | string[] | undefined,
  initialData?: RecipeQuery,
) => {
  const token = getCookie("hf-token") as string;
  return useQuery(
    ["hellofresh-by-slug", slug],
    async () => {
      return await hellofreshSearchBySlug({ slug, token });
    },
    { enabled: !!slug, initialData: initialData },
  );
};
