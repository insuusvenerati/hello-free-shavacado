import { useQuery } from "react-query";
import { hellofreshSearchBySlug } from "../util/hellofresh";

export const useHellofreshBySlug = (slug: string | string[] | undefined) => {
  return useQuery(
    ["hellofresh-by-slug", slug],
    async () => {
      return await hellofreshSearchBySlug({ slug });
    },
    { enabled: !!slug },
  );
};
