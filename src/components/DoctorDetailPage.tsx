import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, GraduationCap, Award, Stethoscope, Languages, Users, Calendar, Phone } from "lucide-react";
import type { Doctor } from "@/lib/doctors-data";
import { doctors } from "@/lib/doctors-data";

interface Props {
  doctor: Doctor;
}

export default function DoctorDetailPage({ doctor }: Props) {
  const otherDoctors = doctors.filter((d) => d.slug !== doctor.slug);

  const infoCards = [
    { icon: MapPin, label: "Place of Birth", value: doctor.birthPlace },
    { icon: GraduationCap, label: "Training", value: doctor.training },
    { icon: Award, label: "Specialization", value: doctor.specialization },
    { icon: Stethoscope, label: "Profession", value: doctor.profession },
    { icon: Languages, label: "Languages", value: doctor.languages },
  ];

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Our Doctors"
          title={doctor.name}
          highlight=""
          description={`${doctor.title} — ${doctor.profession}`}
          breadcrumbs={[
            { label: "Doctors", href: "/doctors" },
            { label: doctor.name, href: `/doctors/${doctor.slug}` },
          ]}
          cta={{ label: "Book Appointment", href: "/appointment" }}
        />

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Doctor Card */}
                <div className="bg-[#f8f9fc] rounded-2xl p-6 sm:p-8 border border-gray-100 mb-10">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden flex-shrink-0 bg-[#e8edf7]">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h2
                        className="text-2xl font-bold text-[#111827] mb-1"
                        style={{ fontFamily: "'Merriweather', serif" }}
                      >
                        {doctor.name}
                      </h2>
                      <p
                        className="text-[#e62d26] font-semibold text-sm mb-3"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {doctor.title}
                      </p>
                      <p
                        className="text-[#6b7280] text-sm leading-relaxed"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {doctor.profession}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                  {infoCards.map((card) => {
                    const Icon = card.icon;
                    return (
                      <div
                        key={card.label}
                        className="bg-white rounded-xl border border-gray-100 p-5 hover:border-[#1a2a6c]/20 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-9 h-9 rounded-lg bg-[#e8edf7] flex items-center justify-center text-[#1a2a6c]">
                            <Icon size={16} />
                          </div>
                          <span
                            className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                          >
                            {card.label}
                          </span>
                        </div>
                        <p
                          className="text-[#374151] text-sm font-medium leading-relaxed pl-12"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          {card.value}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Associations */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#e8edf7] flex items-center justify-center text-[#1a2a6c]">
                      <Users size={18} />
                    </div>
                    <h3
                      className="text-lg font-bold text-[#111827]"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Member Associations
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {doctor.associations.map((assoc) => (
                      <li
                        key={assoc}
                        className="flex items-start gap-3 text-[#374151] text-sm"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e62d26] mt-1.5 flex-shrink-0" />
                        {assoc}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Additional Info */}
                {doctor.additionalInfo && (
                  <div className="bg-[#1a2a6c] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-[0.05]"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, white 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                      }}
                    />
                    <div className="relative z-10 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <h3
                          className="text-lg font-bold mb-1"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          Experience
                        </h3>
                        <p
                          className="text-white/80 text-sm leading-relaxed"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          {doctor.additionalInfo}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-10 bg-[#f8f9fc] rounded-2xl p-6 sm:p-8 border border-gray-100">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3
                        className="text-lg font-bold text-[#111827] mb-1"
                        style={{ fontFamily: "'Merriweather', serif" }}
                      >
                        Book a Consultation
                      </h3>
                      <p
                        className="text-[#6b7280] text-sm"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        Schedule an appointment with {doctor.name.split(" ").pop()}.
                      </p>
                    </div>
                    <Link
                      href="/appointment"
                      className="inline-flex items-center gap-2 bg-[#e62d26] hover:bg-[#c4201a] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors whitespace-nowrap"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      <Phone size={15} />
                      Book Appointment
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="lg:sticky lg:top-28 space-y-6">
                  {/* Other Doctors */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h4
                      className="font-bold text-[#111827] mb-4"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Other Doctors
                    </h4>
                    <div className="space-y-3">
                      {otherDoctors.map((d) => (
                        <Link
                          key={d.slug}
                          href={`/doctors/${d.slug}`}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f5f6fa] transition-colors group"
                        >
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#e8edf7] flex-shrink-0">
                            <Image
                              src={d.image}
                              alt={d.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p
                              className="font-semibold text-[#111827] text-sm group-hover:text-[#1a2a6c] transition-colors truncate"
                              style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                              {d.name}
                            </p>
                            <p
                              className="text-[#9ca3af] text-xs truncate"
                              style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                              {d.title}
                            </p>
                          </div>
                          <ArrowRight
                            size={14}
                            className="text-[#9ca3af] group-hover:text-[#1a2a6c] ml-auto flex-shrink-0"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="bg-[#1a2a6c] rounded-2xl p-6 text-white">
                    <h4
                      className="font-bold mb-4"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Working Hours
                    </h4>
                    <div className="space-y-2 text-sm">
                      {[
                        { day: "Mon – Sat", time: "8:30 AM – 5:30 PM" },
                        { day: "Sunday", time: "Closed" },
                      ].map((h) => (
                        <div
                          key={h.day}
                          className="flex justify-between"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          <span className="text-white/60">{h.day}</span>
                          <span
                            className={
                              h.day === "Sunday"
                                ? "text-[#e62d26]"
                                : "text-white/90"
                            }
                          >
                            {h.time}
                          </span>
                        </div>
                      ))}
                    </div>
                    <a
                      href="tel:+255784104300"
                      className="mt-5 inline-flex items-center gap-2 bg-[#e62d26] hover:bg-[#c4201a] text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors w-full justify-center"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      <Phone size={14} /> +255 784 104 300
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
