import { AKIS_BASE_URL } from "~/constants";
import type { AkisRecipesByCategory } from "~/types/akis-recipes";

export const getRecipeByCategory = async ({
  category,
}: {
  category: number;
}): Promise<AkisRecipesByCategory> => {
  try {
    const response = await fetch(
      `${AKIS_BASE_URL}?category_id=${category}&per_page=20&lang=en&version=1.1`,
      {
        headers: {
          Host: "akispetretzikis.com",
        },
      },
    );
    const data = (await response.json()) as AkisRecipesByCategory;
    return data;
  } catch (error) {
    return error;
  }
};
