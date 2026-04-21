import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://btcppgoomgdvrvexyojb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0Y3BwZ29vbWdkdnJ2ZXh5b2piIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Njc0OTYwMiwiZXhwIjoyMDkyMzI1NjAyfQ.6DTf0FHeFTk-2iCepEA2lpUuFWpcopYceb7iDICDMmI",
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
