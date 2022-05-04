import { supabaseClient } from "./supabase";

export const getRecipes = async (session) => {
  const supabaseAccessToken = await session?.getToken({ template: "supabase" });
  const supabase = await supabaseClient(supabaseAccessToken);
  const { data } = await supabase.from("recipes").select("*");
  return data;
};
