"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const slides = [
  { src: "/images/hero/slide-1.jpeg", alt: "International Eye Hospital — Advanced eye care in Dar es Salaam" },
  { src: "/images/hero/slide-2.jpeg", alt: "Modern eye clinic facility and equipment" },
  { src: "/images/hero/slide-3.jpeg", alt: "Expert ophthalmologists providing specialized care" },
  { src: "/images/hero/slide-4.jpeg", alt: "Patient-centered eye examinations and treatments" },
];

const SLIDE_INTERVAL = 5000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section
      id="home"
      className="relative w-full h-[88vh] min-h-[620px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-[1]" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#e62d26]/80 via-[#e62d26]/60 to-[#e62d26]/20 z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#e62d26]/40 via-transparent to-transparent z-[2]" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 mb-7">
              <span className="w-2 h-2 rounded-full bg-[#1a2a6c] animate-pulse" />
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
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1a2a6c] mt-1">
                on Your Eyes
              </span>
            </h1>

            {/* Sub */}
            <p className="text-white/80 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl" style={{ fontFamily: "'Poppins', sans-serif" }}>
              We combine advanced medical technology with experienced specialists to deliver comprehensive eye care services.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/appointment"
                className="bg-[#1a2a6c] hover:bg-[#243688] text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-blue-600/30 text-sm"
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

      {/* Slide indicators */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-white w-8"
                : "bg-white/40 w-1.5 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/50 z-10">
        <span className="text-[10px] tracking-widest uppercase" style={{ fontFamily: "'Poppins', sans-serif" }}>Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
