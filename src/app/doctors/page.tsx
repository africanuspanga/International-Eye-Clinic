import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Award, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { getDoctors } from "@/lib/cms/content";

export const revalidate = 3600;

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


export default async function DoctorsPage() {
  const doctors = (await getDoctors()).map((d) => ({
    ...d,
    specialty: d.specialties,
    href: `/doctors/${d.slug}`,
    bio: d.bio || d.shortBio,
  }));
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
                    <Image src={doc.image} alt={doc.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className={`object-cover ${doc.imagePosition === "center" ? "object-center" : "object-top"}`} />
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
