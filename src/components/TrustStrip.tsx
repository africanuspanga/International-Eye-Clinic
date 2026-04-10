"use client";

import { useEffect, useRef, useState } from "react";
import { Award, Users, Clock, Shield } from "lucide-react";

const stats = [
  { icon: Clock, number: 12, suffix: "+", label: "Years of Excellence", desc: "Serving Tanzania since 2014" },
  { icon: Award, number: 25, suffix: "+", label: "Doctor Experience", desc: "Years of specialist expertise" },
  { icon: Users, number: 1000, suffix: "+", label: "Patients Treated", desc: "Trusted by thousands across Tanzania" },
  { icon: Shield, number: 20, suffix: "+", label: "Insurance Partners", desc: "Major insurers accepted" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const steps = 60;
        const duration = 1600;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
}

export default function TrustStrip() {
  return (
    <section className="bg-[#1a2a6c] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-[#1a2a6c] p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Merriweather', serif" }}>
                  <Counter target={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-[#e62d26] text-xs font-semibold tracking-widest uppercase mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {stat.label}
                </p>
                <p className="text-white/50 text-xs" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
