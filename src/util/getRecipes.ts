import { ActiveSessionResource } from "@clerk/types";
import { supabaseClient } from "./supabase";

export type FavoritedRecipe = {
  recipe: string;
  id: number;
  user_id: string;
};

export const getRecipes = async (session: ActiveSessionResource) => {
  const supabaseAccessToken = await session?.getToken({ template: "supabase" });
  const supabase = await supabaseClient(supabaseAccessToken);
  const { data } = await supabase.from<FavoritedRecipe>("recipes").select("*");
  return data;
};
