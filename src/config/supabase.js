import { createClient } from "@supabase/supabase-js";
import 'dotenv/config'


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const Supabase = createClient(supabaseUrl, supabaseKey);

export default Supabase;
