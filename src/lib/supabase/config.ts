// Public Supabase settings. The anon key is designed to be public (it ships to
// every browser) — row-level security in the database is what protects data.
// The fallbacks keep the site working even if the env vars are missing on a
// deployment.
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://btcppgoomgdvrvexyojb.supabase.co";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0Y3BwZ29vbWdkdnJ2ZXh5b2piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3NDk2MDIsImV4cCI6MjA5MjMyNTYwMn0.vdYQyE4aUdpiu_T7qlwrFjlmVzUmvybRfGx9roCsF4M";

export const MEDIA_BUCKET = "media";
