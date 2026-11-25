"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ExternalLink, LogOut, Menu, X } from "lucide-react";
import { COLLECTIONS, SITE_ADMIN } from "@/lib/cms/collections";
import { createClient } from "@/lib/supabase/client";
import { AdminIcon } from "./icons";
import { ToastProvider } from "./ui";

type NavItem = { href: string; label: string; icon: string; badge?: number };

export function AdminShell({
  userEmail,
  newSubmissions,
  children,
}: {
  userEmail: string;
  newSubmissions: number;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const sections: { title?: string; items: NavItem[] }[] = [
    { items: [{ href: "/admin", label: "Dashboard", icon: "LayoutDashboard" }] },
    { title: "Content", items: COLLECTIONS.map((c) => ({ href: `/admin/${c.key}`, label: c.label, icon: c.icon })) },
    {
      title: "Manage",
      items: [
        { href: "/admin/inbox", label: "Inbox", icon: "Inbox", badge: newSubmissions },
        { href: "/admin/media", label: "Media Library", icon: "Images" },
        { href: "/admin/settings", label: "Settings & Google Tags", icon: "Settings" },
      ],
    },
  ];

  async function signOut() {
    await createClient().auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <ToastProvider>
      <div
        className="min-h-screen bg-[#f5f6f8] text-slate-900"
        style={
          {
            "--admin-accent": SITE_ADMIN.accent,
            "--admin-accent-dark": SITE_ADMIN.accentDark,
            "--admin-sidebar": SITE_ADMIN.sidebar,
          } as React.CSSProperties
        }
      >
        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <span className="text-sm font-bold">{SITE_ADMIN.short} · Admin</span>
          <button type="button" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)} className="rounded-lg p-2 hover:bg-slate-100">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </header>

        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[var(--admin-sidebar)] text-white transition-transform duration-200 lg:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white">
              <Image src={SITE_ADMIN.logo} alt="" fill sizes="40px" className="object-contain p-1" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold">{SITE_ADMIN.name}</span>
              <span className="block text-xs text-white/50">Content manager</span>
            </span>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {sections.map((section, i) => (
              <div key={i} className="mb-5">
                {section.title && (
                  <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-white/35">{section.title}</p>
                )}
                <ul className="space-y-0.5">
                  {section.items.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                            active ? "bg-white/12 text-white" : "text-white/65 hover:bg-white/6 hover:text-white"
                          }`}
                        >
                          <AdminIcon name={item.icon} className={`h-4 w-4 ${active ? "text-[var(--admin-accent)]" : ""}`} />
                          <span className="flex-1">{item.label}</span>
                          {item.badge ? (
                            <span className="rounded-full bg-[var(--admin-accent)] px-2 py-0.5 text-[11px] font-bold text-white">{item.badge}</span>
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <div className="space-y-1 border-t border-white/10 p-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/65 hover:bg-white/6 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" /> View website
            </a>
            <button
              type="button"
              onClick={signOut}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/65 hover:bg-white/6 hover:text-white"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
            <p className="truncate px-3 pt-1 text-[11px] text-white/35" title={userEmail}>
              {userEmail}
            </p>
          </div>
        </aside>

        {open && <div className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden" onClick={() => setOpen(false)} />}

        <main className="lg:pl-64">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 lg:py-10">{children}</div>
        </main>
      </div>
    </ToastProvider>
  );
}
