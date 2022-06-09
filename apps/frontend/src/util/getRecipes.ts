import { API_URL } from "./constants";

export type FavoritedRecipe = {
  createdAt: string;
  recipe: string;
  id: string;
  userId: string;
  name: string;
  imagePath: string;
};

export const getRecipes = async (): Promise<FavoritedRecipe[]> => {
  const response = await fetch(`${API_URL}/recipe`);
  return await response.json();
  // try {
  //   const supabaseAccessToken = await session?.getToken({ template: "supabase" });
  //   const supabase = await supabaseClient(supabaseAccessToken);
  //   const { data } = await supabase.from<FavoritedRecipe>("recipes").select("*");
  //   return data;
  // } catch (error) {
  //   throw new Error(error);
  // }
};
