import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.supabase_url || "";
const supabaseKey = process.env.supabase_api || "";

export const supabase = createClient(supabaseUrl, supabaseKey);
