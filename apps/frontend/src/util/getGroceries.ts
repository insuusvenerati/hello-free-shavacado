import { supabaseClient } from "./supabase";
import { ActiveSessionResource } from "@clerk/types";

export type Grocery = {
  id: number;
  created_at: Date;
  ingredient: string;
  amount: number;
  slug: string;
  imagePath: string;
  family: any;
  user_id: string;
};

export const getGroceries = async (session: ActiveSessionResource) => {
  try {
    const supabaseAccessToken = await session?.getToken({ template: "supabase" });
    const supabase = await supabaseClient(supabaseAccessToken);
    const { data } = await supabase.from<Grocery>("groceries").select("*");
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
