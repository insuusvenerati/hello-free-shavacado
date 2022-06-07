import { ActiveSessionResource } from "@clerk/types";
import { Grocery } from "./getGroceries";
import { supabaseClient } from "./supabase";

export const addRecipe = async (session: ActiveSessionResource, grocery: Grocery) => {
  const supabaseAccessToken = await session.getToken({ template: "supabase" });
  const supabase = await supabaseClient(supabaseAccessToken);

  const { data } = await supabase
    .from<Grocery>("groceries")
    .upsert(grocery, { returning: "minimal" });
  return data;
};
