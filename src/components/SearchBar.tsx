"use client";

import { useState } from "react";
import { Search, X, Stethoscope, Eye, Microscope, ArrowRight } from "lucide-react";
import Link from "next/link";

const searchItems = [
  { label: "Cataract Surgery", href: "/services/cataract", icon: Eye },
  { label: "Glaucoma Treatment", href: "/services/glaucoma", icon: Stethoscope },
  { label: "Retina Care", href: "/services/retina", icon: Eye },
  { label: "Cornea Transplant", href: "/services/cornea", icon: Eye },
  { label: "General Eye Examination", href: "/services/general-exam", icon: Stethoscope },
  { label: "Eye Tests & Diagnostics", href: "/services/eye-tests", icon: Microscope },
  { label: "Keratoconus Crosslinking", href: "/services/keratoconus", icon: Eye },
  { label: "Our Doctors", href: "/doctors", icon: Stethoscope },
  { label: "Book Appointment", href: "/appointment", icon: ArrowRight },
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = query.trim()
    ? searchItems.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <section className="relative z-20 -mt-10 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl shadow-black/10 border border-gray-100 p-2">
          <div className="relative flex items-center">
            <Search size={20} className="absolute left-4 text-[#6b7280]" />
            <input
              type="text"
              placeholder="What are you looking for? (e.g. Cataract, Glaucoma, Doctors...)"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              className="w-full pl-12 pr-10 py-3.5 rounded-xl text-sm text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#e62d26]/30 transition-all"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setOpen(false);
                }}
                className="absolute right-4 text-[#9ca3af] hover:text-[#111827] transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {open && query.trim() && (
            <div className="mt-2 border-t border-gray-100 pt-2">
              {filtered.length > 0 ? (
                <div className="max-h-64 overflow-y-auto">
                  {filtered.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => {
                          setQuery("");
                          setOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#fdecea] transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#fdecea] flex items-center justify-center flex-shrink-0">
                          <Icon size={14} className="text-[#e62d26]" />
                        </div>
                        <span
                          className="text-sm text-[#374151] font-medium"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          {item.label}
                        </span>
                        <ArrowRight
                          size={14}
                          className="text-[#9ca3af] ml-auto flex-shrink-0"
                        />
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p
                  className="px-4 py-3 text-sm text-[#6b7280]"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  No results found for &ldquo;{query}&rdquo;. Try searching for services or doctors.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
