import { supabaseClient } from "./supabase";

export const addRecipe = async (session, recipeId: string) => {
  const supabaseAccessToken = await session.getToken({
    template: "supabase",
  });

  const supabase = await supabaseClient(supabaseAccessToken);
  const { data, error, status } = await supabase
    .from("recipes")
    .upsert(
      { recipe: recipeId, user_id: session.user.id },
      { onConflict: "recipe" },
    )
    .single();

  return { data, error, status };
};
