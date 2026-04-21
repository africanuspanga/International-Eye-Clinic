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

async function createAdmin() {
  const email = process.argv[2] || "admin@eye.co.tz";
  const password = process.argv[3] || "Admin123!";

  console.log(`Creating admin user: ${email}`);

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }

  console.log("Admin user created successfully!");
  console.log("User ID:", data.user?.id);
  console.log("Email:", email);
  console.log("Password:", password);
}

createAdmin().catch(console.error);
