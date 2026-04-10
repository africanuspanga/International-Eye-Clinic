"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section id="home" className="relative w-full h-[88vh] min-h-[620px] overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/Eye clinic Hero Section Video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a2a6c]/90 via-[#1a2a6c]/70 to-[#1a2a6c]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a6c]/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 mb-7">
              <span className="w-2 h-2 rounded-full bg-[#e62d26] animate-pulse" />
              <span className="text-white text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: "'Poppins', sans-serif" }}>
                International Eye Hospital — Dar es Salaam
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-white leading-tight mb-5"
              style={{ fontFamily: "'Merriweather', Georgia, serif" }}
            >
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold">
                We Keep an Eye
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold text-[#e62d26] mt-1">
                on Your Eyes
              </span>
            </h1>

            {/* Sub */}
            <p className="text-white/80 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl" style={{ fontFamily: "'Poppins', sans-serif" }}>
              At International Eye Hospital, we combine advanced medical technology with experienced specialists to deliver comprehensive eye care services you can trust.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/appointment"
                className="bg-[#e62d26] hover:bg-[#c4201a] text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-red-600/30 text-sm"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Book Appointment
              </Link>
              <a
                href="https://wa.me/255784104300?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-200 backdrop-blur-sm text-sm"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Ask Your Doctor
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/50 z-10">
        <span className="text-[10px] tracking-widest uppercase" style={{ fontFamily: "'Poppins', sans-serif" }}>Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
