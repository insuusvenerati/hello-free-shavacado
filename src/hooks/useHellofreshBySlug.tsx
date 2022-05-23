import { useQuery } from "react-query";
import { hellofreshSearchBySlug } from "../util/hellofresh";

export const useHellofreshBySlug = (slug: string, token: string) => {
  return useQuery(
    ["hellofresh-by-slug", slug, token],
    async () => {
      return await hellofreshSearchBySlug({ token, slug });
    },
    { staleTime: 60 * 60 * 24, notifyOnChangeProps: ["data", "error"] },
  );
};
