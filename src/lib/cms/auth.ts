import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const isAdminUser = (user: { app_metadata?: Record<string, unknown> } | null | undefined) =>
  user?.app_metadata?.role === "admin";

/** For admin pages: returns an authenticated client or redirects to /login. */
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !isAdminUser(user)) redirect("/login");
  return { supabase, user };
}

/** For server actions: returns an authenticated client or throws. */
export async function adminClientOrThrow() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !isAdminUser(user)) throw new Error("Your session has expired. Please sign in again.");
  return supabase;
}
