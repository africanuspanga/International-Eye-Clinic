import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Share2, Camera, PlayCircle } from "lucide-react";
import InstagramIcon from "./InstagramIcon";
import XIcon from "./XIcon";
import { getContact } from "@/lib/cms/content";

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
  { label: "Glaucoma Treatment", href: "/services/glaucoma" },
  { label: "Retina Care", href: "/services/retina" },
  { label: "Cornea Transplant", href: "/services/cornea" },
  { label: "Eye Diagnostics", href: "/services/eye-tests" },
  { label: "General Eye Examination", href: "/services/general-exam" },
];

const DEFAULT_SOCIALS = {
  instagram: "https://www.instagram.com/ieh_tz?igsh=MTF3aHZya3Q0bnVoZA%3D%3D&utm_source=qr",
  facebook: "https://www.facebook.com/IEH.TZ/",
  x: "https://x.com/IEH_tz",
};

export default async function Footer() {
  const contact = await getContact();
  const tel = `tel:+${contact.phone.replace(/\D/g, "")}`;
  const hours = [
    ...["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => ({ day, time: contact.hoursWeekday })),
    { day: "Saturday", time: contact.hoursSaturday },
    { day: "Sunday", time: contact.hoursSunday },
  ];
  const social = {
    instagram: contact.instagram ?? DEFAULT_SOCIALS.instagram,
    facebook: contact.facebook ?? DEFAULT_SOCIALS.facebook,
    x: contact.x ?? DEFAULT_SOCIALS.x,
    youtube: contact.youtube ?? "",
  };
  return (
    <footer id="contact" className="bg-[#e62d26]">
      {/* Top border */}
      <div className="h-1 bg-[#1a2a6c]" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="relative h-16 w-44 mb-1">
                <Image src="/International eye clinic logo.png" alt="International Eye Hospital" fill
                  className="object-contain object-left brightness-0 invert" />
              </div>
              <p className="text-white/60 text-xs font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>AN AMERICAN HEALTHCARE INSTITUTE</p>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-xs font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Tanzania&apos;s premier specialized eye hospital, delivering world-class ophthalmic care since 2014.
            </p>

            <ul className="space-y-3 mb-7">
              <li>
                <span className="flex items-start gap-2.5 text-white/80 text-sm font-bold whitespace-pre-line" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <MapPin size={15} className="text-[#1a2a6c] mt-0.5 flex-shrink-0" />
                  {contact.address}
                </span>
              </li>
              <li>
                <a href={tel} className="flex items-center gap-2.5 text-white/80 hover:text-white text-sm transition-colors font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <Phone size={14} className="text-[#1a2a6c] flex-shrink-0" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2.5 text-white/80 hover:text-white text-sm transition-colors font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <Mail size={14} className="text-[#1a2a6c] flex-shrink-0" />
                  {contact.email}
                </a>
              </li>
            </ul>

            <div className="flex gap-2.5">
              {social.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1a2a6c] flex items-center justify-center text-white/50 hover:text-white transition-all"
                  title="@ieh_tz">
                  <InstagramIcon size={14} />
                </a>
              )}
              {social.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1a2a6c] flex items-center justify-center text-white/50 hover:text-white transition-all" title="Facebook">
                  <Camera size={14} />
                </a>
              )}
              {social.x && (
                <a href={social.x} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1a2a6c] flex items-center justify-center text-white/50 hover:text-white transition-all" title="X">
                  <XIcon size={14} />
                </a>
              )}
              {social.youtube && (
                <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1a2a6c] flex items-center justify-center text-white/50 hover:text-white transition-all" title="YouTube">
                  <PlayCircle size={14} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/80 hover:text-white text-sm transition-colors flex items-center gap-2 group font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <span className="w-0 h-px bg-[#1a2a6c] group-hover:w-3 transition-all" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="text-white/80 hover:text-white text-sm transition-colors flex items-center gap-2 group font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <span className="w-0 h-px bg-[#1a2a6c] group-hover:w-3 transition-all" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Working Hours</h4>
            <div className="space-y-2">
              {hours.map((h) => (
                <div key={h.day} className="flex justify-between text-xs" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <span className="text-white/80 font-bold">{h.day}</span>
                  <span className={h.day === "Sunday" ? "text-[#1a2a6c] font-bold" : "text-white/80 font-bold"}>{h.time}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 bg-[#1a2a6c]/20 border border-[#1a2a6c]/30 rounded-xl p-4">
              <p className="text-[#1a2a6c] text-xs font-bold mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>Emergency?</p>
              <a href={tel} className="text-white font-bold text-sm hover:text-white/80 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {contact.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs text-center sm:text-left font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
            © {new Date().getFullYear()} International Eye Hospital (AN AMERICAN HEALTHCARE INSTITUTE). All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service"].map((l) => (
              <Link key={l} href="#" className="text-white/50 hover:text-white/80 text-xs transition-colors font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
