import { ActiveSessionResource } from "@clerk/types";
import { supabaseClient } from "./supabase";

export const addRecipe = async (session: ActiveSessionResource, recipeId: string) => {
  if (!session) {
    throw new Error("No session available. Are you logged in?");
  }

  if (!recipeId) {
    throw new Error("No recipe was given O.o");
  }

  const supabaseAccessToken = await session.getToken({
    template: "supabase",
  });

  const supabase = await supabaseClient(supabaseAccessToken);
  const { data, error } = await supabase
    .from("recipes")
    .upsert({ recipe: recipeId, user_id: session.user.id }, { onConflict: "recipe" })
    .single();

  if (error) {
    throw error;
  }

  return { data };
};
