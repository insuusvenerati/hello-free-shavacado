import { supabaseClient } from "./supabase";

export const addRecipe = async ({ session, recipeSlug, recipeName, openSignIn }) => {
  if (!session) {
    openSignIn({});
  }

  if (!recipeSlug) {
    console.log(recipeSlug);
  }

  const supabaseAccessToken = await session.getToken({
    template: "supabase",
  });

  const supabase = await supabaseClient(supabaseAccessToken);

  const { data, error } = await supabase
    .from("recipes")
    .upsert({ recipe: recipeSlug, user_id: session.user.id, name: recipeName }, { onConflict: "recipe" })
    .single();

  if (error) {
    throw error;
  }

  return { data };
};
