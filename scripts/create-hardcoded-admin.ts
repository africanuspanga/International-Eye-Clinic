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
  const email = "info@eye.co.tz";
  const password = process.env.ADMIN_PASSWORD || "Eye@2026";

  const { data: users } = await supabase.auth.admin.listUsers();
  const existing = users?.users?.find((u) => u.email === email);

  if (existing) {
    const { error } = await supabase.auth.admin.updateUserById(existing.id, {
      password,
      app_metadata: { ...existing.app_metadata, role: "admin" },
    });
    if (error) throw error;
    console.log(`Updated ${email}: password reset and admin role granted.`);
    return;
  }

  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    app_metadata: { role: "admin" },
  });
  if (error) throw error;
  console.log(`Created admin ${email}.`);
}

createAdmin().catch((e) => {
  console.error(e);
  process.exit(1);
});
