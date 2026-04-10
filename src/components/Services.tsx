"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Zap, Activity, FlaskConical, Microscope, ScanEye, HeartPulse, Stethoscope, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Microscope,
    title: "Cataract Surgery",
    category: "Surgery",
    href: "/services/cataract",
    desc: "Advanced surgical procedures to restore clear vision using modern intraocular lens technology, performed by internationally trained surgeons.",
    image: "/images/eye examination 8.jpg",
  },
  {
    icon: Zap,
    title: "LASIK Surgery",
    category: "Laser",
    href: "/services/lasik",
    desc: "State-of-the-art laser vision correction to eliminate dependency on glasses or contact lenses with precision and safety.",
    image: "/images/lasik 1.jpg",
  },
  {
    icon: Activity,
    title: "Glaucoma Treatment",
    category: "Medical",
    href: "/services/glaucoma",
    desc: "Early diagnosis and comprehensive treatment to protect your optic nerve and preserve your long-term vision.",
    image: "/images/eye test 1.jpg",
  },
  {
    icon: ScanEye,
    title: "Retina Care",
    category: "Specialist",
    href: "/services/retina",
    desc: "Full-time retina subspecialists offering diagnosis and treatment for diabetic retinopathy, macular degeneration and more.",
    image: "/images/optic 4.jpg",
  },
  {
    icon: Eye,
    title: "Cornea Transplant",
    category: "Surgery",
    href: "/services/cornea",
    desc: "Surgical replacement and treatment of damaged corneal tissue using the latest techniques for optimal visual outcomes.",
    image: "/images/eye examination 9.jpg",
  },
  {
    icon: FlaskConical,
    title: "OCT & Diagnostics",
    category: "Diagnostics",
    href: "/services/eye-tests",
    desc: "Full diagnostic testing suite including OCT, FFA, Corneal Topography, Tonometry, Visual Field and more.",
    image: "/images/eye test 2.jpg",
  },
  {
    icon: HeartPulse,
    title: "Keratoconus Crosslinking",
    category: "Specialist",
    href: "/services/keratoconus",
    desc: "Expert management of keratoconus including corneal cross-linking and specialty contact lenses.",
    image: "/images/lasik 2.jpg",
  },
  {
    icon: Stethoscope,
    title: "General Eye Examination",
    category: "General",
    href: "/services/general-exam",
    desc: "Comprehensive eye health assessments with automated refraction, tonometry, visual field testing and more.",
    image: "/images/eye examination 1.jpg",
  },
];

const categories = ["All", "Surgery", "Laser", "Medical", "Specialist", "Diagnostics", "General"];

export default function Services() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? services : services.filter((s) => s.category === active);

  return (
    <section id="services" className="py-20 bg-[#f5f6fa]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-label mx-auto w-fit">Our Services</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#111827] leading-tight mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
            Comprehensive Eye Care
          </h2>
          <p className="text-[#6b7280] text-base max-w-xl mx-auto" style={{ fontFamily: "'Poppins', sans-serif" }}>
            From routine check-ups to complex surgical procedures — all under one specialized roof.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${
                active === cat
                  ? "bg-[#1a2a6c] text-white border-[#1a2a6c]"
                  : "bg-white text-[#6b7280] border-gray-200 hover:border-[#1a2a6c] hover:text-[#1a2a6c]"
              }`} style={{ fontFamily: "'Poppins', sans-serif" }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.title} href={s.href}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm shadow-black/5 hover:shadow-lg hover:shadow-black/10 border border-gray-100 hover:border-[#1a2a6c]/20 transition-all duration-300 hover-lift">
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <Image src={s.image} alt={s.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a6c]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center">
                    <Icon size={15} className="text-[#1a2a6c]" />
                  </div>
                </div>
                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-[#111827] text-base mb-1.5 group-hover:text-[#1a2a6c] transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {s.title}
                  </h3>
                  <p className="text-[#6b7280] text-xs leading-relaxed mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {s.desc}
                  </p>
                  <div className="flex items-center gap-1 text-[#1a2a6c] text-xs font-semibold group-hover:gap-2 transition-all" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Learn more <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link href="/services"
            className="inline-flex items-center gap-2 bg-[#1a2a6c] hover:bg-[#243688] text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            View All Services <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
