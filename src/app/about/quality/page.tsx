import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Lock, MessageCircle, Award, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quality Policy | International Eye Hospital",
  description: "Our commitment to continuous improvement, patient safety, confidentiality, and international standards of eye care in Tanzania.",
};

const commitments = [
  {
    icon: Award,
    title: "Continuous Improvement",
    desc: "We adopt improvement at all levels of the organization to maintain the highest level of quality health care services.",
  },
  {
    icon: Users,
    title: "Staff Development",
    desc: "Medical staff participate in national and international congresses, symposia, and both in-house and external training programs.",
  },
  {
    icon: Lock,
    title: "Patient Confidentiality",
    desc: "Patients' confidentiality is maintained at the highest level at every stage of diagnosis and treatment.",
  },
  {
    icon: MessageCircle,
    title: "Open Communication",
    desc: "Communication between health professionals and patients enables participation in treatment and valuable feedback.",
  },
  {
    icon: ShieldCheck,
    title: "International Standards",
    desc: "We use appropriate physical environments, quality health care facilities, and the best available technology.",
  },
];

export default function QualityPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="About Us"
          title="Our Quality"
          highlight="Policy"
          description="Our unwavering commitment to continuous improvement, patient safety, and international standards of care."
          breadcrumbs={[
            { label: "About Us", href: "/about" },
            { label: "Quality Policy", href: "/about/quality" },
          ]}
          cta={{ label: "Book Appointment", href: "/appointment" }}
        />

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-14 items-start">
              <div>
                <div className="section-label">Excellence in Care</div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#111827] leading-tight mb-6"
                  style={{ fontFamily: "'Merriweather', serif" }}
                >
                  Committed to the Highest Standards
                </h2>

                <div className="space-y-5">
                  <p
                    className="text-[#374151] leading-[1.8]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    International Eye Hospital continuously adopts improvement at all levels of the organization to keep the highest level of quality health care services. Our medical staff actively participate in national and international congresses and symposia, while all staff receive both in-house and external training on a routine basis.
                  </p>

                  <p
                    className="text-[#374151] leading-[1.8]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Patients' confidentiality is maintained at the highest level. Medical assistants are always with patients, aiming to increase the satisfaction level of patients and their relatives. We believe that trust is built through transparency, consistency, and genuine compassion.
                  </p>

                  <p
                    className="text-[#374151] leading-[1.8]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    We always use appropriate physical environments, quality health care facilities, and the best technology available to meet international standards. Communication between health professionals and patients is our tool to enable patients and their relatives to participate in the treatment process — and for us to receive feedback about our services.
                  </p>
                </div>

                <div className="mt-8 bg-[#f5f6fa] rounded-2xl p-6 border border-gray-100">
                  <h3
                    className="font-bold text-[#1a2a6c] mb-3"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Key Quality Objectives
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Maintain zero-tolerance for compromise on patient safety",
                      "Ensure timely and accurate diagnosis for every patient",
                      "Invest in latest technology and staff training annually",
                      "Achieve measurable patient satisfaction improvements",
                      "Uphold ethical medical practice in all procedures",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-[#374151]"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e62d26] mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5]">
                  <Image
                    src="/images/eye examination 6.jpg"
                    alt="Quality eye examination at International Eye Hospital"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-[#1a2a6c] text-white rounded-2xl p-5 shadow-xl">
                  <div
                    className="text-3xl font-bold"
                    style={{ fontFamily: "'Merriweather', serif" }}
                  >
                    1000+
                  </div>
                  <div
                    className="text-xs text-white/70 uppercase tracking-widest mt-1"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Patients Treated
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#f5f6fa]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="section-label mx-auto w-fit">Our Pledge</div>
              <h2
                className="text-4xl font-bold text-[#111827] mt-2"
                style={{ fontFamily: "'Merriweather', serif" }}
              >
                Five Core Commitments
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {commitments.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover-lift"
                  >
                    <div className="w-12 h-12 bg-[#e8edf7] rounded-xl flex items-center justify-center mb-4">
                      <Icon size={22} className="text-[#1a2a6c]" />
                    </div>
                    <h3
                      className="font-bold text-[#111827] mb-2 text-sm"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {c.title}
                    </h3>
                    <p
                      className="text-[#6b7280] text-xs leading-relaxed"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {c.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#1a2a6c]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2
              className="text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Merriweather', serif" }}
            >
              Trust Your Eyes to the Best
            </h2>
            <p
              className="text-white/70 mb-7"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Experience quality eye care that meets international standards, right here in Dar es Salaam.
            </p>
            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 bg-[#e62d26] hover:bg-[#c4201a] text-white font-semibold px-8 py-3.5 rounded-full transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Book Appointment <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
