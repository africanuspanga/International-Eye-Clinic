import Link from "next/link";
import { Calendar, Phone } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 bg-[#e62d26] relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5" style={{ fontFamily: "'Merriweather', serif" }}>
          Your Vision Deserves<br />Expert Care
        </h2>
        <p className="text-white/85 text-lg leading-relaxed mb-8 max-w-xl mx-auto" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Early diagnosis is the key to preserving your sight. Schedule your comprehensive eye examination with our specialists today.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Link href="/appointment"
            className="inline-flex items-center gap-2.5 bg-white text-[#e62d26] hover:bg-gray-50 font-bold px-9 py-4 rounded-full text-base transition-all hover:shadow-xl hover:-translate-y-0.5"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            <Calendar size={18} />
            Book Appointment
          </Link>
          <a href="tel:+255784104300"
            className="inline-flex items-center gap-2.5 border-2 border-white/50 hover:border-white text-white font-semibold px-9 py-4 rounded-full text-base transition-all hover:-translate-y-0.5"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            <Phone size={18} />
            Call Now
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-white/70 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
          <span>✓ No referral required</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span>✓ Insurance accepted</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span>✓ Emergency? Call us now</span>
        </div>
      </div>
    </section>
  );
}
