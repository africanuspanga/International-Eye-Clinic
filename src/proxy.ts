import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/session";

// Guards the CMS. Only runs on /admin and /login so public pages are never
// slowed down by an auth check.
export async function proxy(request: NextRequest) {
  const { supabase, getResponse } = updateSession(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdmin = user?.app_metadata?.role === "admin";
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !isAdmin) {
    const url = new URL("/login", request.url);
    if (pathname !== "/admin") url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname === "/login" && isAdmin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return getResponse();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
