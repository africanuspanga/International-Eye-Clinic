"use client";

import { useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import type { PatientTestimonial } from "@/lib/cms/content";


export default function Testimonials({ testimonials }: { testimonials: PatientTestimonial[] }) {
  const [current, setCurrent] = useState(0);
  const perPage = 3;

  const max = Math.ceil(testimonials.length / perPage) - 1;
  const slice = testimonials.slice(current * perPage, current * perPage + perPage);

  return (
    <section className="py-20 bg-[#e62d26]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="section-label" style={{ background: "rgba(255,255,255,0.12)", color: "white" }}>Testimonials</div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mt-2" style={{ fontFamily: "'Merriweather', serif" }}>
              What Our Patients Say
            </h2>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setCurrent((c) => Math.max(c - 1, 0))} disabled={current === 0}
              className="w-11 h-11 rounded-full border border-white/25 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-all disabled:opacity-30">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => setCurrent((c) => Math.min(c + 1, max))} disabled={current >= max}
              className="w-11 h-11 rounded-full border border-white/25 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-all disabled:opacity-30">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {slice.map((t, i) => (
            <div key={i} className="relative bg-white rounded-2xl p-7 shadow-xl hover-lift">
              {/* Quote */}
              <Quote size={40} className="absolute top-5 right-6 text-[#e62d26]/8 fill-[#e62d26]/8" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Badge */}
              <span className="inline-block bg-[#fdecea] text-[#e62d26] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {t.procedure}
              </span>

              {/* Text */}
              <p className="text-[#374151] text-sm leading-relaxed mb-6 relative z-10" style={{ fontFamily: "'Poppins', sans-serif" }}>
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Divider */}
              <div className="h-px bg-gray-100 mb-5" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: t.color, fontFamily: "'Poppins', sans-serif" }}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-[#111827] text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>{t.name}</p>
                  <p className="text-[#6b7280] text-xs" style={{ fontFamily: "'Poppins', sans-serif" }}>{t.location}</p>
                </div>
              </div>

              {/* Bottom blue accent */}
              <div className="absolute bottom-0 left-7 right-7 h-0.5 bg-[#e62d26] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: max + 1 }).map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all ${current === i ? "bg-white w-8" : "bg-white/30 w-1.5 hover:bg-white/50"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
