import { createClient } from "@supabase/supabase-js";

export const supabaseClient = async (supabaseAccessToken: string) => {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);

  // set Supabase JWT on the client object,
  // so it is sent up with all Supabase requests
  supabase.auth.setAuth(supabaseAccessToken);

  return supabase;
};
