import { ActiveSessionResource } from "@clerk/types";
import { Item } from "../types/recipes";
import { supabaseClient } from "./supabase";

export const addHellofresh = async (session: ActiveSessionResource, hellofresh: Item) => {
  const supabaseAccessToken = await session.getToken({ template: "supabase" });
  const supabase = await supabaseClient(supabaseAccessToken);

  const { data } = await supabase
    .from("hellofresh")
    .upsert({ recipe: hellofresh, id: hellofresh.id }, { onConflict: "id" });
  return data;
};
