"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const slides: { src: string; alt: string }[] = [
  { src: "/images/hero/poster-glaucoma.png", alt: "Glaucoma — damage to the optic nerve that can lead to total loss of vision if not detected and treated early. Call 0784 104 300" },
  { src: "/images/hero/poster-glaucoma-causes.png", alt: "Causes and symptoms of glaucoma — age, ethnicity and family history. Call 0784 104 300" },
  { src: "/images/hero/poster-glaucoma-prevention.png", alt: "Glaucoma prevention and treatment — early detection through regular eye exams. Call 0784 104 300" },
  { src: "/images/hero/poster-smart-lenses.png", alt: "Smart Lenses — faida za kutumia. Weka oda yako sasa" },
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
