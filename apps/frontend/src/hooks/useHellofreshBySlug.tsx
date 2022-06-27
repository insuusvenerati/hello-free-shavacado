import { useQuery } from "react-query";
import { hellofreshSearchBySlug } from "../util/hellofresh";

export const useHellofreshBySlug = (slug: string) => {
  return useQuery(
    ["hellofresh-by-slug", slug],
    async () => {
      return await hellofreshSearchBySlug({ slug });
    },
    { staleTime: 60 * 60, enabled: !!slug },
  );
};
