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

async function createAdmin() {
  const email = process.argv[2] || "admin@eye.co.tz";
  const password = process.argv[3];
  if (!password) throw new Error("Usage: create-admin.ts <email> <password>");

  console.log(`Creating admin user: ${email}`);

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    // Only users with this role can sign in to /admin.
    app_metadata: { role: "admin" },
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
