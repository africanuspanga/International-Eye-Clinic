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
  description: "Meet our eye care specialists at International Eye Hospital, Dar es Salaam — Dr. Muammer Coskun, Dr. Vangilisasi Msola, Dr. Zayd Mohamed Sangey, Dr. Harley H. Mkini, and Dr. Michael Machimu.",
  alternates: {
    canonical: "https://www.internationaleyehospital.com/doctors",
  },
  openGraph: {
    title: "Our Doctors | International Eye Hospital",
    description: "Meet our eye care specialists at International Eye Hospital, Dar es Salaam.",
    images: [
      {
        url: "/images/hero/slide-1.jpeg",
        width: 1200,
        height: 630,
        alt: "International Eye Hospital - Our Doctors",
      },
    ],
  },
};

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
    bio: "Experienced ophthalmologist and eye surgeon with more than two decades of clinical and surgical experience across leading hospitals in Turkey and Nigeria. His areas of experience include cataract surgery, glaucoma surgery, pterygium surgery, YAG laser, argon laser, medical retina treatments, and other ophthalmic procedures.",
  },
  {
    name: "Dr. Vangilisasi Msola",
    title: "Ophthalmologist, Epidemiologist & Data Scientist",
    specialty: ["General Ophthalmology", "Public Health Eye Care", "Clinical Research", "Health Data", "Medical Teaching"],
    experience: "5+",
    education: "University of the Witwatersrand, Mzumbe University",
    membership: "Tanzania Ophthalmologist Society",
    href: "/doctors/vangilisasi-msola",
    image: "/doctors/vangilisasi-msola.jpeg",
    bio: "Tanzanian ophthalmologist with advanced training in ophthalmology, epidemiology, implementation science, and corporate management. He has worked with International Eye Hospital since June 2022 and has broad experience in clinical ophthalmology, research, public health, teaching, and health data analysis.",
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
    bio: "A compassionate ophthalmologist focused on improving vision through preventive, corrective, medical, and surgical eye care. Trained at Muhimbili, he provides specialist care with special interests in cornea, refractive and external eye diseases, cataract, glaucoma, medical retina, uveitis, and pediatric ophthalmology.",
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
    bio: "Optometrist and primary eye care provider with experience in refraction, ophthalmic dispensing, low vision rehabilitation, binocular vision assessment, pediatric and geriatric optometry, contact lenses, glaucoma clinic support, diabetic eye clinic support, and ocular disease management. He has served at International Eye Hospital since August 2021.",
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
    bio: "A skilled optometrist providing professional vision assessment, corrective lens support, and patient-focused eye care services. He holds a Bachelor of Science in Optometry from Kilimanjaro Christian Medical University College and is currently pursuing a Master of Science in Applied Epidemiology and Biostatistics.",
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
          description="Our medical team brings together experienced ophthalmologists, optometrists, researchers, and eye care professionals dedicated to protecting vision and improving quality of life."
          breadcrumbs={[{ label: "Doctors", href: "/doctors" }]}
          cta={{ label: "Book Appointment", href: "/appointment" }}
        />

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doc) => (
                <div key={doc.name} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-black/10 hover:border-[#e62d26]/20 transition-all overflow-hidden hover-lift">
                  {/* Photo */}
                  <div className="relative h-80 bg-[#fdecea]">
                    <Image src={doc.image} alt={doc.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className={`object-cover ${doc.name === "Dr. Harley H. Mkini" ? "object-center" : "object-top"}`} />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#e62d26] to-transparent" />
                    <div className="absolute top-4 right-4 bg-[#1a2a6c] text-white rounded-xl px-3 py-1.5 text-center">
                      <div className="text-lg font-bold leading-none" style={{ fontFamily: "'Merriweather', serif" }}>{doc.experience}</div>
                      <div className="text-[9px] uppercase tracking-wider mt-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Yrs Exp</div>
                    </div>
                  </div>

                  <div className="p-7">
                    <h3 className="font-bold text-[#111827] text-lg mb-0.5 group-hover:text-[#e62d26] transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>{doc.name}</h3>
                    <p className="text-[#e62d26] text-sm font-semibold mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>{doc.title}</p>
                    <p className="text-[#6b7280] text-sm leading-relaxed mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>{doc.bio}</p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {doc.specialty.map((s) => (
                        <span key={s} className="bg-[#fdecea] text-[#e62d26] text-xs font-medium px-2.5 py-1 rounded-full" style={{ fontFamily: "'Poppins', sans-serif" }}>{s}</span>
                      ))}
                    </div>

                    <div className="border-t border-gray-100 pt-4 space-y-2 mb-5">
                      <div className="flex items-center gap-2 text-xs text-[#6b7280]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        <GraduationCap size={13} className="text-[#e62d26]" /> {doc.education}
                      </div>
                      {doc.membership && (
                        <div className="flex items-center gap-2 text-xs text-[#6b7280]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          <Award size={13} className="text-[#e62d26]" /> {doc.membership}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <Link href={doc.href} className="flex items-center gap-1.5 text-[#e62d26] text-sm font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        View Profile <ArrowRight size={13} />
                      </Link>
                      <Link href="/appointment" className="ml-auto bg-[#1a2a6c] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#243688] transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
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
        <section className="py-16 bg-[#e62d26]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Book with a Specialist Today
            </h2>
            <p className="text-white/70 mb-7" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Our doctors are ready to help you see better and live better.
            </p>
            <Link href="/appointment"
              className="inline-flex items-center gap-2 bg-[#1a2a6c] hover:bg-[#243688] text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
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
