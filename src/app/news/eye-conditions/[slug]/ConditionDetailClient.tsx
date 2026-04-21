"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  Languages,
  Stethoscope,
  ShieldAlert,
  Pill,
  Activity,
  FileText,
  Menu,
  X,
} from "lucide-react";
import { useTranslation } from "@/lib/translation-context";
import type { EyeCondition } from "@/lib/eye-conditions-data";

interface SimpleCondition {
  slug: string;
  name: string;
  shortDesc: string;
}

interface Props {
  condition: EyeCondition;
  allConditions: SimpleCondition[];
}

const sections = [
  { id: "overview", label: "Overview", icon: FileText },
  { id: "symptoms", label: "Symptoms", icon: Stethoscope },
  { id: "causes", label: "Causes", icon: ShieldAlert },
  { id: "treatments", label: "Treatment", icon: Pill },
  { id: "when-to-see-doctor", label: "When to See a Doctor", icon: Activity },
];

export default function ConditionDetailClient({ condition, allConditions }: Props) {
  const { isSwahili, toggle } = useTranslation();
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY + 140;
    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el && el.offsetTop <= scrollY && el.offsetTop + el.offsetHeight > scrollY) {
        setActiveSection(section.id);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 120;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMobileSidebarOpen(false);
  };

  const content = isSwahili ? condition.swahili : condition;
  const langLabel = isSwahili ? "Tafsiri kwa Kiingereza" : "Translate to Swahili";
  const langFlag = isSwahili ? "🇬🇧" : "🇹🇿";

  return (
    <>
      {/* Translate bar */}
      <div className="bg-[#f5f6fa] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <button
            onClick={toggle}
            className="inline-flex items-center gap-2 text-[#1a2a6c] font-semibold text-sm hover:text-[#e62d26] transition-colors"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <Languages size={16} />
            <span className="text-lg">{langFlag}</span>
            {langLabel}
          </button>
          <span className="text-[#9ca3af] text-xs hidden sm:inline" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Toggle language for this page
          </span>
        </div>
      </div>

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar */}
            <aside className="lg:w-72 flex-shrink-0">
              <div className="lg:sticky lg:top-28">
                {/* Mobile toggle */}
                <button
                  onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                  className="lg:hidden w-full flex items-center justify-between bg-[#1a2a6c] text-white px-5 py-3.5 rounded-xl text-sm font-semibold mb-3"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  <span className="flex items-center gap-2">
                    <Menu size={16} /> {isSwahili ? "Sehemu" : "Sections"}
                  </span>
                  {mobileSidebarOpen ? <X size={16} /> : <ChevronRight size={16} />}
                </button>

                <div
                  className={`${
                    mobileSidebarOpen ? "block" : "hidden"
                  } lg:block bg-[#f8f9fc] rounded-2xl overflow-hidden border border-gray-100 mb-6`}
                >
                  <div className="h-1 bg-[#1a2a6c]" />
                  <div className="p-2">
                    {sections.map((section) => {
                      const Icon = section.icon;
                      const isActive = activeSection === section.id;
                      return (
                        <button
                          key={section.id}
                          onClick={() => scrollTo(section.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
                            isActive
                              ? "bg-[#1a2a6c] text-white shadow-md"
                              : "text-[#374151] hover:bg-white hover:shadow-sm"
                          }`}
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          <Icon size={16} className={isActive ? "text-white" : "text-[#6b7280]"} />
                          <span className="flex-1">
                            {isSwahili
                              ? section.id === "overview"
                                ? "Muhtasari"
                                : section.id === "symptoms"
                                ? "Dalili"
                                : section.id === "causes"
                                ? "Sababu"
                                : section.id === "treatments"
                                ? "Matibabu"
                                : "Lini Kuona Daktari"
                              : section.label}
                          </span>
                          <ChevronRight
                            size={13}
                            className={`transition-transform ${isActive ? "rotate-90" : ""} ${
                              isActive ? "text-white/70" : "text-[#9ca3af]"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quick navigation to other conditions */}
                <div className="hidden lg:block bg-white rounded-2xl border border-gray-100 p-5">
                  <h4
                    className="font-bold text-[#111827] text-sm mb-4"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {isSwahili ? "Hali Zingine za Macho" : "Other Eye Conditions"}
                  </h4>
                  <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
                    {allConditions
                      .filter((c) => c.slug !== condition.slug)
                      .map((c) => (
                        <Link
                          key={c.slug}
                          href={`/news/eye-conditions/${c.slug}`}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#6b7280] hover:text-[#1a2a6c] hover:bg-[#f5f6fa] transition-colors"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          <ArrowRight size={12} className="text-[#e62d26] flex-shrink-0" />
                          {c.name}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Overview */}
              <div id="overview" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#e8edf7] flex items-center justify-center text-[#1a2a6c]">
                    <FileText size={18} />
                  </div>
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-[#111827]"
                    style={{ fontFamily: "'Merriweather', serif" }}
                  >
                    {isSwahili ? `Ni nini ${condition.name}?` : `What is ${condition.name}?`}
                  </h2>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                  <p
                    className="text-[#374151] leading-[1.8] text-[15px]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {content.overview}
                  </p>
                </div>
              </div>

              {/* Symptoms */}
              <div id="symptoms" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#fdecea] flex items-center justify-center text-[#e62d26]">
                    <Stethoscope size={18} />
                  </div>
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-[#111827]"
                    style={{ fontFamily: "'Merriweather', serif" }}
                  >
                    {isSwahili ? `Dalili za ${condition.name}` : `${condition.name} Symptoms`}
                  </h2>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                  <ul className="space-y-3">
                    {content.symptoms.map((symptom, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-[#374151] text-[15px] leading-relaxed"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e62d26] mt-2 flex-shrink-0" />
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Causes */}
              <div id="causes" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                    <ShieldAlert size={18} />
                  </div>
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-[#111827]"
                    style={{ fontFamily: "'Merriweather', serif" }}
                  >
                    {isSwahili ? `Sababu za ${condition.name}` : `${condition.name} Causes`}
                  </h2>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                  <ul className="space-y-3">
                    {content.causes.map((cause, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-[#374151] text-[15px] leading-relaxed"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                        {cause}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Treatments */}
              <div id="treatments" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <Pill size={18} />
                  </div>
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-[#111827]"
                    style={{ fontFamily: "'Merriweather', serif" }}
                  >
                    {isSwahili
                      ? `Matibabu ya ${condition.name}`
                      : `Treatment for ${condition.name}`}
                  </h2>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                  <ul className="space-y-3">
                    {content.treatments.map((treatment, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-[#374151] text-[15px] leading-relaxed"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                        {treatment}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* When to See a Doctor */}
              <div id="when-to-see-doctor" className="scroll-mt-28 mb-14">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#1a2a6c]/10 flex items-center justify-center text-[#1a2a6c]">
                    <Activity size={18} />
                  </div>
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-[#111827]"
                    style={{ fontFamily: "'Merriweather', serif" }}
                  >
                    {isSwahili ? "Lini Kuona Daktari" : "When to See a Doctor"}
                  </h2>
                </div>
                <div className="bg-[#1a2a6c] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, white 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <div className="relative z-10">
                    <p
                      className="text-white/90 leading-[1.8] text-[15px]"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {content.whenToSeeDoctor}
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Conditions */}
              <div className="mb-14">
                <h3
                  className="text-xl font-bold text-[#111827] mb-5"
                  style={{ fontFamily: "'Merriweather', serif" }}
                >
                  {isSwahili ? "Hali Zingine Zinazohusiana" : "Related Conditions"}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {allConditions
                    .filter((c) => c.slug !== condition.slug)
                    .slice(0, 4)
                    .map((c) => (
                      <Link
                        key={c.slug}
                        href={`/news/eye-conditions/${c.slug}`}
                        className="group bg-white border border-gray-100 rounded-xl p-5 hover:border-[#1a2a6c]/20 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="font-semibold text-[#111827] text-sm group-hover:text-[#1a2a6c] transition-colors"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                          >
                            {c.name}
                          </span>
                          <ArrowRight
                            size={14}
                            className="text-[#9ca3af] group-hover:text-[#1a2a6c] group-hover:translate-x-1 transition-all"
                          />
                        </div>
                        <p
                          className="text-[#6b7280] text-xs leading-relaxed line-clamp-2"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          {c.shortDesc}
                        </p>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#f5f6fa]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2
            className="text-3xl font-bold text-[#111827] mb-4"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            {isSwahili ? "Unahitaji Msaada wa Kitaalamu?" : "Need Professional Help?"}
          </h2>
          <p
            className="text-[#6b7280] mb-7"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {isSwahili
              ? "Wataalamu wetu wa macho wako hapa kukusaidia. Panga miadi leo kwa uchunguzi kamili wa macho."
              : "Our eye specialists are here to help. Schedule an appointment today for a comprehensive eye examination."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/appointment"
              className="bg-[#e62d26] hover:bg-[#c4201a] text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {isSwahili ? "Weka Miadi" : "Book Appointment"}
            </Link>
            <a
              href="tel:+255784104300"
              className="border-2 border-[#1a2a6c]/20 hover:border-[#1a2a6c] text-[#1a2a6c] font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              +255 784 104 300
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
