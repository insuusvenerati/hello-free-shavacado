import { ActiveSessionResource } from "@clerk/types";
import { FavoritedRecipe } from "./getRecipes";
import { supabaseClient } from "./supabase";

export const deleteRecipe = async (session: ActiveSessionResource, id: number) => {
  if (!session) {
    throw new Error("No session available. Are you logged in?");
  }

  if (!id) {
    throw new Error("No recipe was given O.o");
  }

  const supabaseAccessToken = await session.getToken({
    template: "supabase",
  });

  const supabase = await supabaseClient(supabaseAccessToken);
  const { data, error } = await supabase.from<FavoritedRecipe>("recipes").delete().match({ id: id });

  if (error) {
    throw error;
  }

  return { data };
};
