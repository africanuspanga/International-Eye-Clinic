import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Award, ArrowRight } from "lucide-react";

const doctors = [
  {
    name: "Prof. Dr. A. Bulent Guler",
    title: "Chief Ophthalmologist",
    specialty: ["Retina", "Cataract", "Glaucoma", "Keratoconus"],
    experience: "25+",
    education: "Istanbul University",
    membership: "American Academy of Ophthalmology",
    href: "/doctors/bulent-guler",
    bio: "A highly experienced ophthalmologist with over 25 years of specialization in retina, cataract, glaucoma, and keratoconus. International expert leading our team.",
  },
  {
    name: "Assoc. Prof. Aydin Yildirim",
    title: "Corneal & LASIK Surgeon",
    specialty: ["Cornea", "LASIK", "Refractive Surgery"],
    experience: "18+",
    education: "Ankara University School of Medicine",
    membership: "European Society of Ophthalmology",
    href: "/doctors/aydin-yildirim",
    bio: "Specialized corneal surgeon with expertise in LASIK procedures and corneal transplantation using the latest surgical technologies.",
  },
  {
    name: "Assoc. Prof. Ugurcan Keskin",
    title: "Glaucoma Specialist",
    specialty: ["Glaucoma", "Optic Nerve", "Paediatric Eye"],
    experience: "15+",
    education: "Royal College of Ophthalmologists",
    membership: "World Glaucoma Association",
    href: "/doctors/ugurcan-keskin",
    bio: "Internationally trained glaucoma specialist with deep expertise in early diagnosis, medical management, and surgical intervention.",
  },
];

export default function Doctors() {
  return (
    <section id="doctors" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="section-label">Our Specialists</div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#111827] leading-tight" style={{ fontFamily: "'Merriweather', serif" }}>
              Meet Our Expert<br />
              <span className="text-[#1a2a6c]">Doctors</span>
            </h2>
          </div>
          <p className="text-[#6b7280] text-sm leading-relaxed max-w-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Internationally trained ophthalmologists with decades of experience, dedicated to restoring and preserving your vision.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-7 mb-10">
          {doctors.map((doc) => (
            <div key={doc.name} className="group bg-white rounded-2xl border border-gray-100 shadow-sm shadow-black/5 hover:shadow-xl hover:shadow-black/10 hover:border-[#1a2a6c]/20 transition-all duration-300 overflow-hidden hover-lift">
              {/* Photo */}
              <div className="relative h-72 bg-[#e8edf7] overflow-hidden">
                <Image
                  src="/doctor headshot place holder.jpg"
                  alt={doc.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1a2a6c] to-transparent" />
                {/* Experience badge */}
                <div className="absolute top-4 right-4 bg-[#e62d26] text-white rounded-xl px-3 py-1.5 text-center">
                  <div className="text-lg font-bold leading-none" style={{ fontFamily: "'Merriweather', serif" }}>{doc.experience}</div>
                  <div className="text-[9px] tracking-wider uppercase mt-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Yrs Exp</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-[#111827] text-lg mb-0.5 group-hover:text-[#1a2a6c] transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {doc.name}
                </h3>
                <p className="text-[#1a2a6c] text-sm font-semibold mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {doc.title}
                </p>
                <p className="text-[#6b7280] text-sm leading-relaxed mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {doc.bio}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {doc.specialty.map((s) => (
                    <span key={s} className="bg-[#e8edf7] text-[#1a2a6c] text-xs font-medium px-2.5 py-1 rounded-full" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {s}
                    </span>
                  ))}
                </div>

                {/* Credentials */}
                <div className="border-t border-gray-100 pt-4 space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-xs text-[#6b7280]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <GraduationCap size={13} className="text-[#1a2a6c]" />
                    {doc.education}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#6b7280]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <Award size={13} className="text-[#1a2a6c]" />
                    {doc.membership}
                  </div>
                </div>

                <Link href={doc.href}
                  className="flex items-center gap-1.5 text-[#1a2a6c] text-sm font-semibold hover:gap-2.5 transition-all"
                  style={{ fontFamily: "'Poppins', sans-serif" }}>
                  View Profile <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/doctors"
            className="inline-flex items-center gap-2 border-2 border-[#1a2a6c] text-[#1a2a6c] hover:bg-[#1a2a6c] hover:text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-all"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            View All Doctors <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
