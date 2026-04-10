import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const values = [
  "Specialized Eye Hospital — one of few in Tanzania",
  "Internationally trained ophthalmologists",
  "Advanced Laser & Diagnostic Technology",
  "Full-time Retina & Corneal Specialists",
  "Trusted by 20+ Insurance Providers",
  "Continuous Medical Innovation & Training",
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left: Images */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-black/10 aspect-[4/5]">
              <Image src="/About us section homepage.jpg" alt="International Eye Hospital facility" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a6c]/30 to-transparent" />
            </div>

            {/* Stat badge */}
            <div className="absolute -bottom-5 -right-5 lg:-right-8 bg-[#1a2a6c] text-white rounded-2xl p-5 shadow-xl">
              <div className="text-3xl font-bold" style={{ fontFamily: "'Merriweather', serif" }}>12+</div>
              <div className="text-xs text-white/70 tracking-widest uppercase mt-1" style={{ fontFamily: "'Poppins', sans-serif" }}>Years of Excellence</div>
            </div>

            {/* Inset image */}
            <div className="absolute top-6 -right-5 lg:-right-8 w-32 h-40 rounded-xl overflow-hidden shadow-lg border-4 border-white hidden lg:block">
              <Image src="/images/eye examination 6.jpg" alt="Eye care" fill className="object-cover" />
            </div>

            {/* Red accent */}
            <div className="absolute top-1/3 -left-3 w-1 h-20 bg-[#e62d26] rounded-full" />
          </div>

          {/* Right: Content */}
          <div>
            <div className="section-label">About Us</div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#111827] leading-tight mb-5" style={{ fontFamily: "'Merriweather', serif" }}>
              Tanzania&apos;s Premier<br />
              <span className="text-[#1a2a6c]">Eye Care</span> Institution
            </h2>

            <p className="text-[#374151] text-base leading-relaxed mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Founded in 2014, International Eye Hospital is one of the few specialized eye hospitals in Tanzania equipped with modern infrastructure and advanced medical technologies.
            </p>
            <p className="text-[#6b7280] text-sm leading-relaxed mb-7" style={{ fontFamily: "'Poppins', sans-serif" }}>
              We offer a full spectrum of ophthalmic services — from routine eye examinations to highly specialized treatments including retina care, corneal procedures, and laser surgeries — driven by a commitment to excellence and patient-centered care.
            </p>

            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {values.map((v) => (
                <li key={v} className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#1a2a6c] mt-0.5 flex-shrink-0" />
                  <span className="text-[#374151] text-sm leading-snug" style={{ fontFamily: "'Poppins', sans-serif" }}>{v}</span>
                </li>
              ))}
            </ul>

            <div className="flex gap-3 flex-wrap">
              <Link href="/about"
                className="bg-[#1a2a6c] hover:bg-[#243688] text-white font-semibold px-7 py-3 rounded-full text-sm transition-colors"
                style={{ fontFamily: "'Poppins', sans-serif" }}>
                Learn More About Us
              </Link>
              <Link href="/appointment"
                className="border-2 border-[#1a2a6c] text-[#1a2a6c] hover:bg-[#e8edf7] font-semibold px-7 py-3 rounded-full text-sm transition-colors"
                style={{ fontFamily: "'Poppins', sans-serif" }}>
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
