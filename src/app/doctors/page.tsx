import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Award, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Doctors | International Eye Hospital",
  description: "Meet our internationally trained ophthalmologists at International Eye Hospital, Dar es Salaam.",
};

const doctors = [
  {
    name: "Prof. Dr. A. Bulent Guler",
    title: "Chief Ophthalmologist & Founder",
    specialty: ["Retina", "Cataract", "Glaucoma", "Keratoconus"],
    experience: "25+",
    education: "Istanbul University, Faculty of Medicine",
    membership: "American Academy of Ophthalmology",
    href: "/doctors/bulent-guler",
    bio: "A highly experienced ophthalmologist with over 25 years of specialization in retina, cataract, glaucoma, and keratoconus. As the founder of International Eye Hospital, Prof. Dr. Guler brings world-class expertise to Tanzania, having trained and practiced internationally at leading institutions.",
  },
  {
    name: "Assoc. Prof. Aydin Yildirim",
    title: "Corneal & Refractive Surgeon",
    specialty: ["Cornea", "LASIK", "Refractive Surgery", "Keratoconus"],
    experience: "18+",
    education: "Ankara University School of Medicine",
    membership: "European Society of Ophthalmology",
    href: "/doctors/aydin-yildirim",
    bio: "Specialized corneal surgeon with over 18 years of expertise in LASIK, corneal transplantation, and keratoconus management. Has performed thousands of refractive procedures with outstanding outcomes.",
  },
  {
    name: "Assoc. Prof. Ugurcan Keskin",
    title: "Glaucoma & Paediatric Specialist",
    specialty: ["Glaucoma", "Optic Nerve", "Paediatric Eye", "Medical Retina"],
    experience: "15+",
    education: "Royal College of Ophthalmologists, UK",
    membership: "World Glaucoma Association",
    href: "/doctors/ugurcan-keskin",
    bio: "Internationally trained glaucoma specialist with expertise in early diagnosis, medical and surgical glaucoma management, and paediatric ophthalmology. Committed to preserving vision across all age groups.",
  },
];

export default function DoctorsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Our Doctors"
          title="Meet Our"
          highlight="Specialists"
          description="Our team of internationally trained ophthalmologists brings decades of expertise and a passion for restoring and preserving vision."
          breadcrumbs={[{ label: "Doctors", href: "/doctors" }]}
          cta={{ label: "Book Appointment", href: "/appointment" }}
        />

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {doctors.map((doc) => (
                <div key={doc.name} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-black/10 hover:border-[#1a2a6c]/20 transition-all overflow-hidden hover-lift">
                  {/* Photo */}
                  <div className="relative h-80 bg-[#e8edf7]">
                    <Image src="/doctor headshot place holder.jpg" alt={doc.name} fill className="object-cover object-top" />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1a2a6c] to-transparent" />
                    <div className="absolute top-4 right-4 bg-[#e62d26] text-white rounded-xl px-3 py-1.5 text-center">
                      <div className="text-lg font-bold leading-none" style={{ fontFamily: "'Merriweather', serif" }}>{doc.experience}</div>
                      <div className="text-[9px] uppercase tracking-wider mt-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Yrs Exp</div>
                    </div>
                  </div>

                  <div className="p-7">
                    <h3 className="font-bold text-[#111827] text-lg mb-0.5 group-hover:text-[#1a2a6c] transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {doc.name}
                    </h3>
                    <p className="text-[#1a2a6c] text-sm font-semibold mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>{doc.title}</p>
                    <p className="text-[#6b7280] text-sm leading-relaxed mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>{doc.bio}</p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {doc.specialty.map((s) => (
                        <span key={s} className="bg-[#e8edf7] text-[#1a2a6c] text-xs font-medium px-2.5 py-1 rounded-full" style={{ fontFamily: "'Poppins', sans-serif" }}>{s}</span>
                      ))}
                    </div>

                    <div className="border-t border-gray-100 pt-4 space-y-2 mb-5">
                      <div className="flex items-center gap-2 text-xs text-[#6b7280]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        <GraduationCap size={13} className="text-[#1a2a6c]" /> {doc.education}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#6b7280]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        <Award size={13} className="text-[#1a2a6c]" /> {doc.membership}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Link href={doc.href} className="flex items-center gap-1.5 text-[#1a2a6c] text-sm font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        View Profile <ArrowRight size={13} />
                      </Link>
                      <Link href="/appointment" className="ml-auto bg-[#e62d26] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#c4201a] transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Book
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#1a2a6c]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Book with a Specialist Today
            </h2>
            <p className="text-white/70 mb-7" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Our doctors are ready to help you see better and live better.
            </p>
            <Link href="/appointment"
              className="inline-flex items-center gap-2 bg-[#e62d26] hover:bg-[#c4201a] text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              Request Appointment
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
