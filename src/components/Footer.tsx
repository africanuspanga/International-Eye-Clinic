import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Share2, Camera, Send, PlayCircle } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Our Doctors", href: "/doctors" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

const services = [
  { label: "Cataract Surgery", href: "/services/cataract" },
  { label: "LASIK Surgery", href: "/services/lasik" },
  { label: "Glaucoma Treatment", href: "/services/glaucoma" },
  { label: "Retina Care", href: "/services/retina" },
  { label: "Cornea Transplant", href: "/services/cornea" },
  { label: "Eye Diagnostics", href: "/services/eye-tests" },
];

const hours = [
  { day: "Monday", time: "8:30 AM – 5:30 PM" },
  { day: "Tuesday", time: "8:30 AM – 5:30 PM" },
  { day: "Wednesday", time: "8:30 AM – 5:30 PM" },
  { day: "Thursday", time: "8:30 AM – 5:30 PM" },
  { day: "Friday", time: "8:30 AM – 5:30 PM" },
  { day: "Saturday", time: "8:30 AM – 5:30 PM" },
  { day: "Sunday", time: "Closed" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#1a2a6c]">
      {/* Top border */}
      <div className="h-1 bg-[#e62d26]" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="relative h-16 w-44 mb-1">
                <Image src="/International eye clinic logo.png" alt="International Eye Hospital" fill
                  className="object-contain object-left brightness-0 invert" />
              </div>
              <p className="text-white/50 text-xs" style={{ fontFamily: "'Poppins', sans-serif" }}>IFG Hospitals Group</p>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Tanzania&apos;s premier specialized eye hospital, delivering world-class ophthalmic care since 2014.
            </p>

            <ul className="space-y-3 mb-7">
              <li>
                <span className="flex items-start gap-2.5 text-white/60 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <MapPin size={15} className="text-[#e62d26] mt-0.5 flex-shrink-0" />
                  Tropical Center, New Bagamoyo Road,<br />P.O. Box 2083, Dar es Salaam, Tanzania
                </span>
              </li>
              <li>
                <a href="tel:+255784104300" className="flex items-center gap-2.5 text-white/60 hover:text-white text-sm transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <Phone size={14} className="text-[#e62d26] flex-shrink-0" />
                  +255 784 104 300
                </a>
              </li>
              <li>
                <a href="mailto:info@eye.co.tz" className="flex items-center gap-2.5 text-white/60 hover:text-white text-sm transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <Mail size={14} className="text-[#e62d26] flex-shrink-0" />
                  info@eye.co.tz
                </a>
              </li>
            </ul>

            <div className="flex gap-2.5">
              {[Share2, Camera, Send, PlayCircle].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#e62d26] flex items-center justify-center text-white/50 hover:text-white transition-all">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-2 group" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <span className="w-0 h-px bg-[#e62d26] group-hover:w-3 transition-all" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-2 group" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <span className="w-0 h-px bg-[#e62d26] group-hover:w-3 transition-all" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Working Hours</h4>
            <div className="space-y-2">
              {hours.map((h) => (
                <div key={h.day} className="flex justify-between text-xs" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <span className="text-white/50">{h.day}</span>
                  <span className={h.day === "Sunday" ? "text-[#e62d26]" : "text-white/80"}>{h.time}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 bg-[#e62d26]/20 border border-[#e62d26]/30 rounded-xl p-4">
              <p className="text-[#e62d26] text-xs font-semibold mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>Emergency?</p>
              <a href="tel:+255784104300" className="text-white font-medium text-sm hover:text-white/80 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                +255 784 104 300
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs text-center sm:text-left" style={{ fontFamily: "'Poppins', sans-serif" }}>
            © {new Date().getFullYear()} International Eye Hospital (IFG Hospitals Group). All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service"].map((l) => (
              <Link key={l} href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
