import Image from "next/image";
import Link from "next/link";
import { Home, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1a2a6c] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-white/[0.03] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#e62d26]/10 blur-3xl" />
      </div>

      {/* Logo */}
      <Link href="/" className="relative h-14 w-44 mb-12 opacity-90 hover:opacity-100 transition-opacity">
        <Image
          src="/International eye clinic logo.png"
          alt="International Eye Hospital"
          fill
          className="object-contain brightness-0 invert"
        />
      </Link>

      {/* Eye icon as 404 visual */}
      <div className="relative mb-8">
        <div className="text-[160px] sm:text-[200px] font-black leading-none text-white/5 select-none" style={{ fontFamily: "'Merriweather', serif" }}>
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32">
            <Image
              src="/Eye Favicon.png"
              alt="Eye icon"
              fill
              className="object-contain drop-shadow-[0_0_20px_rgba(230,45,38,0.6)]"
            />
          </div>
        </div>
      </div>

      {/* Text */}
      <h1
        className="text-3xl sm:text-4xl font-bold text-white mb-4"
        style={{ fontFamily: "'Merriweather', serif" }}
      >
        Page Not Found
      </h1>
      <p
        className="text-white/60 text-base max-w-sm mb-10 leading-relaxed"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        This page doesn&apos;t exist or may have moved. Let us help you find what you&apos;re looking for.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 bg-[#e62d26] hover:bg-[#c4201a] text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-all hover:shadow-lg hover:shadow-red-500/30"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <Home size={16} />
          Back to Homepage
        </Link>
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 border-2 border-white/20 text-white hover:bg-white/10 font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <Phone size={16} />
          Contact Us
        </Link>
      </div>

      {/* Quick links */}
      <div className="border-t border-white/10 pt-8 w-full max-w-md">
        <p
          className="text-white/40 text-xs uppercase tracking-widest mb-5"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Quick Links
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { label: "Our Services", href: "/services" },
            { label: "Our Doctors", href: "/doctors" },
            { label: "Book Appointment", href: "/appointment" },
            { label: "About Us", href: "/about" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/50 hover:text-white text-sm transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
