"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown, Phone, Calendar } from "lucide-react"; // Phone used in top bar + mobile

const eyeTests = [
  { label: "OCT", href: "/services/oct" },
  { label: "Fundus Fluorescein Angiography (FFA)", href: "/services/ffa" },
  { label: "Corneal Topography", href: "/services/corneal-topography" },
  { label: "Keratometry", href: "/services/keratometry" },
  { label: "Pachymetry", href: "/services/pachymetry" },
  { label: "Tonometry", href: "/services/tonometry" },
  { label: "Visual Field Test", href: "/services/visual-field" },
  { label: "A-Scan Ultrasound", href: "/services/a-scan" },
  { label: "Automated Refraction", href: "/services/automated-refraction" },
];

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Chairman of Board of Directors", href: "/about/chairman" },
      { label: "Mission & Values", href: "/about/mission" },
      { label: "Quality Policy", href: "/about/quality" },
      { label: "Corporate Social Responsibility", href: "/about/csr" },
      { label: "Why International Eye Hospital", href: "/about/why-us" },
    ],
  },
  {
    label: "Our Services & Procedures",
    href: "/services",
    children: [
      { label: "Eye Tests", href: "/services/eye-tests", sub: eyeTests },
      { label: "Cataract Surgery", href: "/services/cataract" },
      { label: "Glaucoma", href: "/services/glaucoma" },
      { label: "LASIK – Refractive Surgery", href: "/services/lasik" },
      { label: "Retina – Diabetic Retinopathy", href: "/services/retina" },
      { label: "Keratoconus Crosslinking", href: "/services/keratoconus" },
      { label: "Cornea Transplant", href: "/services/cornea" },
      { label: "Optic Department", href: "/services/optic" },
      { label: "General Eye Examination", href: "/services/general-exam" },
      { label: "Laser Treatments", href: "/services/laser", sub: eyeTests },
    ],
  },
  {
    label: "Our Doctors",
    href: "/doctors",
    children: [
      { label: "Prof. Dr. A. Bulent Guler", href: "/doctors/bulent-guler" },
      { label: "Assoc. Prof. Aydin Yildirim", href: "/doctors/aydin-yildirim" },
      { label: "Assoc. Prof. Ugurcan Keskin", href: "/doctors/ugurcan-keskin" },
    ],
  },
  {
    label: "News",
    href: "/news",
    children: [
      { label: "Eye Conditions", href: "/news/eye-conditions" },
      { label: "Publications", href: "/news/publications" },
      { label: "Gallery", href: "/news/gallery" },
      { label: "Videos", href: "/news/videos" },
      { label: "Testimonies", href: "/news/testimonies" },
      { label: "Brochures", href: "/news/brochures" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

function DropdownItem({ item }: { item: typeof navItems[0] }) {
  const [subOpen, setSubOpen] = useState<string | null>(null);

  if (!item.children) return null;

  return (
    <div className="py-1">
      {item.children.map((child) => {
        const hasSub = "sub" in child && child.sub && child.sub.length > 0;
        return (
          <div
            key={child.label}
            className="relative"
            onMouseEnter={() => hasSub ? setSubOpen(child.label) : undefined}
            onMouseLeave={() => setSubOpen(null)}
          >
            <Link
              href={child.href}
              className="flex items-center justify-between px-5 py-2.5 text-[#374151] hover:bg-[#e8edf7] hover:text-[#1a2a6c] text-sm font-medium transition-colors"
            >
              {child.label}
              {hasSub && <ChevronDown size={13} className="-rotate-90" />}
            </Link>
            {hasSub && subOpen === child.label && (
              <div className="absolute left-full top-0 min-w-[240px] bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                {child.sub!.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    className="block px-5 py-2.5 text-[#374151] hover:bg-[#e8edf7] hover:text-[#1a2a6c] text-sm transition-colors"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#1a2a6c] text-white text-xs hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <span style={{ fontFamily: "'Poppins', sans-serif" }} className="text-white/70">
            Tropical Center, New Bagamoyo Road, Dar es Salaam, Tanzania
          </span>
          <div className="flex items-center gap-6">
            <a href="tel:+255784104300" className="flex items-center gap-1.5 text-white hover:text-white/80 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <Phone size={12} />
              +255 784 104 300
            </a>
            <a href="mailto:info@eye.co.tz" className="text-white/70 hover:text-white transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
              info@eye.co.tz
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-black/8" : "shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="relative h-16 w-44">
                <Image
                  src="/International eye clinic logo.png"
                  alt="International Eye Hospital"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Desktop nav */}
            <ul className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children ? handleMouseEnter(item.label) : undefined}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      openDropdown === item.label
                        ? "text-[#1a2a6c] bg-[#e8edf7]"
                        : "text-[#111827] hover:text-[#1a2a6c] hover:bg-[#e8edf7]"
                    }`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && openDropdown === item.label && (
                    <div
                      className="absolute top-full left-0 min-w-[240px] bg-white rounded-xl shadow-xl shadow-black/10 border border-gray-100 z-50 overflow-hidden"
                      style={{ transform: "translateY(4px)" }}
                    >
                      {/* Blue top accent */}
                      <div className="h-0.5 bg-[#1a2a6c]" />
                      <DropdownItem item={item} />
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="hidden xl:flex items-center gap-3">
              <Link
                href="/appointment"
                className="flex items-center gap-2 bg-[#e62d26] hover:bg-[#c4201a] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <Calendar size={15} />
                Book Appointment
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 text-[#111827] hover:text-[#1a2a6c]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 xl:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
        <div
          className={`absolute top-0 left-0 h-full w-80 bg-white shadow-2xl overflow-y-auto transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Mobile header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="relative h-12 w-36">
              <Image src="/International eye clinic logo.png" alt="International Eye Hospital" fill className="object-contain object-left" />
            </div>
            <button onClick={() => setMobileOpen(false)} className="p-1.5 text-gray-500">
              <X size={22} />
            </button>
          </div>

          {/* Mobile links */}
          <div className="p-4">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-gray-50 last:border-0">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={() => !item.children && setMobileOpen(false)}
                    className="flex-1 py-3 text-[#111827] font-medium text-sm"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      className="p-2 text-gray-400"
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                </div>
                {item.children && mobileExpanded === item.label && (
                  <div className="pl-4 pb-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-[#6b7280] hover:text-[#1a2a6c] text-sm"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile CTA */}
            <div className="mt-6 space-y-3">
              <Link
                href="/appointment"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 bg-[#e62d26] text-white font-semibold py-3 rounded-full w-full"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <Calendar size={16} />
                Book Appointment
              </Link>
              <a
                href="tel:+255784104300"
                className="flex items-center justify-center gap-2 border-2 border-[#1a2a6c] text-[#1a2a6c] font-medium py-3 rounded-full w-full text-sm"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <Phone size={15} />
                +255 784 104 300
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
