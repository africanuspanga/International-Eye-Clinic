import { createClient } from "@supabase/supabase-js";

// Credentials come from .env.local — never hardcode the service-role key.
// Run with: node --experimental-strip-types --env-file=.env.local scripts/<name>.ts
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name} — see .env.local`);
  return value;
}

const supabase = createClient(
  requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
  requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

async function setup() {
  // Check if tables exist by querying eye_conditions
  const { data, error } = await supabase.from("eye_conditions").select("id").limit(1);
  
  if (error && error.message.includes("does not exist")) {
    console.log("Tables do not exist. Please run the SQL in Supabase Dashboard SQL Editor:");
    console.log("1. Go to https://btcppgoomgdvrvexyojb.supabase.co/project/_/sql");
    console.log("2. Copy and paste the contents of supabase-schema.sql");
    console.log("3. Click Run");
  } else {
    console.log("Database tables already exist!");
  }
}

setup().catch(console.error);
