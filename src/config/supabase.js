import { createClient } from "@supabase/supabase-js";
import 'dotenv/config'


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('SUPABASE_URL:', supabaseUrl)
  console.error('SUPABASE_ANON_KEY exists:', !!supabaseKey)
  process.exit(1) // stop app cleanly
}

const Supabase = createClient(supabaseUrl, supabaseKey);

export default Supabase;
