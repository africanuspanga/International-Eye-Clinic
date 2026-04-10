import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | International Eye Hospital",
  description: "Comprehensive eye care services at International Eye Hospital — cataract surgery, LASIK, retina care, glaucoma, cornea transplant, and advanced diagnostics.",
};

const servicesList = [
  {
    title: "Cataract Surgery",
    href: "/services/cataract",
    image: "/images/eye examination 8.jpg",
    desc: "Modern surgical techniques to remove clouded lenses and restore clear vision using premium intraocular lenses.",
    category: "Surgery",
  },
  {
    title: "LASIK – Refractive Surgery",
    href: "/services/lasik",
    image: "/images/lasik 1.jpg",
    desc: "Advanced laser correction for myopia, hyperopia, and astigmatism — free yourself from glasses.",
    category: "Laser",
  },
  {
    title: "Glaucoma",
    href: "/services/glaucoma",
    image: "/images/eye test 1.jpg",
    desc: "Early detection and long-term management of glaucoma to preserve your optic nerve and vision.",
    category: "Medical",
  },
  {
    title: "Retina – Diabetic Retinopathy",
    href: "/services/retina",
    image: "/images/optic 4.jpg",
    desc: "Expert retina care including treatment for diabetic retinopathy, macular degeneration, and retinal detachment.",
    category: "Specialist",
  },
  {
    title: "Keratoconus Crosslinking",
    href: "/services/keratoconus",
    image: "/images/lasik 2.jpg",
    desc: "Corneal crosslinking and specialty contact lens management for keratoconus patients.",
    category: "Specialist",
  },
  {
    title: "Cornea Transplant",
    href: "/services/cornea",
    image: "/images/eye examination 9.jpg",
    desc: "Full-thickness and lamellar corneal transplantation by our experienced corneal surgeons.",
    category: "Surgery",
  },
  {
    title: "Optic Department",
    href: "/services/optic",
    image: "/images/eye examination 6.jpg",
    desc: "Prescription glasses and contact lens services with the latest optical technology.",
    category: "General",
  },
  {
    title: "General Eye Examination",
    href: "/services/general-exam",
    image: "/images/eye examination 1.jpg",
    desc: "Comprehensive eye health assessment for all ages — ideal for annual check-ups and early detection.",
    category: "General",
  },
  {
    title: "Eye Tests (Diagnostics)",
    href: "/services/eye-tests",
    image: "/images/eye test 2.jpg",
    desc: "OCT, FFA, Corneal Topography, Tonometry, Visual Field, A-Scan and full diagnostic testing.",
    category: "Diagnostics",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Our Services"
          title="Comprehensive"
          highlight="Eye Care"
          description="From routine examinations to complex surgical procedures — all under one specialized roof with internationally trained specialists."
          breadcrumbs={[{ label: "Services", href: "/services" }]}
          cta={{ label: "Book Appointment", href: "/appointment" }}
        />

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {servicesList.map((s) => (
                <Link key={s.title} href={s.href}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-black/10 hover:border-[#1a2a6c]/20 transition-all hover-lift">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={s.image} alt={s.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a6c]/70 to-transparent" />
                    <span className="absolute top-3 left-3 bg-[#e62d26] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {s.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-[#111827] text-base mb-2 group-hover:text-[#1a2a6c] transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {s.title}
                    </h3>
                    <p className="text-[#6b7280] text-sm leading-relaxed mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {s.desc}
                    </p>
                    <div className="flex items-center gap-1.5 text-[#1a2a6c] text-sm font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Learn more <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#1a2a6c]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Not Sure Which Service You Need?
            </h2>
            <p className="text-white/70 mb-7" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Book a general eye examination and our specialists will guide you to the right treatment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/appointment"
                className="bg-[#e62d26] hover:bg-[#c4201a] text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
                style={{ fontFamily: "'Poppins', sans-serif" }}>
                Book Appointment
              </Link>
              <a href="tel:+255784104300"
                className="border-2 border-white/40 hover:border-white text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
                style={{ fontFamily: "'Poppins', sans-serif" }}>
                Call +255 784 104 300
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
