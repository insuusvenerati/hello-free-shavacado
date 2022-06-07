import { ActiveSessionResource } from "@clerk/types";
import { supabaseClient } from "./supabase";

export const getHellofresh = async (session: ActiveSessionResource) => {
  try {
    const supabaseAccessToken = await session.getToken({ template: "supabase" });
    const supabase = await supabaseClient(supabaseAccessToken);
    const { data } = await supabase.from("hellofresh").select("id");
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
