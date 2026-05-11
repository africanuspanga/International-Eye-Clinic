import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Award, ArrowRight } from "lucide-react";

const doctors = [
  {
    name: "Dr. Muammer Coskun",
    title: "Consultant Ophthalmologist / Eye Surgeon",
    specialty: ["Cataract Surgery", "Glaucoma Surgery", "Laser Eye Procedures", "Medical Retina", "Pterygium Surgery"],
    experience: "20+",
    education: "Ege University Faculty of Medicine",
    membership: "Turkish Ophthalmology Society",
    href: "/doctors/muammer-coskun",
    image: "/doctors/muammer-coskun.jpeg",
    bio: "Experienced ophthalmologist and eye surgeon with more than two decades of clinical and surgical experience across leading hospitals in Turkey and Nigeria.",
  },
  {
    name: "Dr. Vangilisasi Msola",
    title: "Ophthalmologist, Epidemiologist & Data Scientist",
    specialty: ["General Ophthalmology", "Public Health Eye Care", "Clinical Research", "Health Data", "Medical Teaching"],
    experience: "5+",
    education: "University of the Witwatersrand",
    membership: "Tanzania Ophthalmologist Society",
    href: "/doctors/vangilisasi-msola",
    image: "/doctors/vangilisasi-msola.jpeg",
    bio: "Tanzanian ophthalmologist with additional expertise in epidemiology, implementation science, data science, health research, and medical teaching.",
  },
  {
    name: "Dr. Zayd Mohamed Sangey",
    title: "Ophthalmologist",
    specialty: ["Cornea", "Refractive & External Eye Diseases", "Cataract", "Glaucoma", "Medical Retina", "Uveitis", "Pediatric Ophthalmology"],
    experience: "3+",
    education: "Muhimbili University of Health and Allied Sciences",
    membership: "Tanzania Ophthalmology Society",
    href: "/doctors/zayd-sangey",
    image: "/doctors/zayd-sangey.jpeg",
    bio: "A compassionate ophthalmologist focused on improving vision through preventive, corrective, medical, and surgical eye care.",
  },
  {
    name: "Dr. Harley H. Mkini",
    title: "Optometrist",
    specialty: ["Refraction", "Contact Lenses", "Low Vision", "Pediatric Optometry", "Diabetic Eye Clinic", "Glaucoma Clinic"],
    experience: "4+",
    education: "Kilimanjaro Christian Medical University College",
    membership: "IACLE, Myopia Society",
    href: "/doctors/harley-mkini",
    image: "/doctors/harley-mkini.jpeg",
    bio: "Optometrist and primary eye care provider experienced in refraction, contact lenses, low vision rehabilitation, glaucoma clinic support, and diabetic eye clinic support.",
  },
  {
    name: "Dr. Michael Machimu",
    title: "Optometrist",
    specialty: ["Vision Testing", "Corrective Lenses", "Eye Condition Assessment", "Patient Eye Care", "Preventive Vision Care"],
    experience: "3+",
    education: "Kilimanjaro Christian Medical University College",
    membership: "",
    href: "/doctors/michael-machimu",
    image: "/doctors/michael-machimu.jpeg",
    bio: "A skilled optometrist providing professional vision assessment, corrective lens support, and patient-focused eye care services.",
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
              Meet Our Eye Care<br />
              <span className="text-[#e62d26]">Specialists</span>
            </h2>
          </div>
          <p className="text-[#6b7280] text-sm leading-relaxed max-w-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Expert ophthalmology and optometry care in Dar es Salaam. Our team is dedicated to protecting vision and improving quality of life.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mb-10">
          {doctors.map((doc) => (
            <div key={doc.name} className="group bg-white rounded-2xl border border-gray-100 shadow-sm shadow-black/5 hover:shadow-xl hover:shadow-black/10 hover:border-[#e62d26]/20 transition-all duration-300 overflow-hidden hover-lift">
              {/* Photo */}
              <div className="relative h-72 bg-[#fdecea] overflow-hidden">
                <Image
                  src={doc.image}
                  alt={doc.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={`object-cover group-hover:scale-105 transition-transform duration-500 ${doc.name === "Dr. Harley H. Mkini" ? "object-center" : "object-top"}`}
                />
                {/* Overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#e62d26] to-transparent" />
                {/* Experience badge */}
                <div className="absolute top-4 right-4 bg-[#1a2a6c] text-white rounded-xl px-3 py-1.5 text-center">
                  <div className="text-lg font-bold leading-none" style={{ fontFamily: "'Merriweather', serif" }}>{doc.experience}</div>
                  <div className="text-[9px] tracking-wider uppercase mt-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Yrs Exp</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-[#111827] text-lg mb-0.5 group-hover:text-[#e62d26] transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {doc.name}
                </h3>
                <p className="text-[#e62d26] text-sm font-semibold mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {doc.title}
                </p>
                <p className="text-[#6b7280] text-sm leading-relaxed mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {doc.bio}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {doc.specialty.map((s) => (
                    <span key={s} className="bg-[#fdecea] text-[#e62d26] text-xs font-medium px-2.5 py-1 rounded-full" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {s}
                    </span>
                  ))}
                </div>

                {/* Credentials */}
                <div className="border-t border-gray-100 pt-4 space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-xs text-[#6b7280]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <GraduationCap size={13} className="text-[#e62d26]" />
                    {doc.education}
                  </div>
                  {doc.membership && (
                    <div className="flex items-center gap-2 text-xs text-[#6b7280]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      <Award size={13} className="text-[#e62d26]" />
                      {doc.membership}
                    </div>
                  )}
                </div>

                <Link href={doc.href}
                  className="flex items-center gap-1.5 text-[#e62d26] text-sm font-semibold hover:gap-2.5 transition-all"
                  style={{ fontFamily: "'Poppins', sans-serif" }}>
                  View Profile <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/doctors"
            className="inline-flex items-center gap-2 border-2 border-[#e62d26] text-[#e62d26] hover:bg-[#e62d26] hover:text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-all"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            View All Doctors <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
