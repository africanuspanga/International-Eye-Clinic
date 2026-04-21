import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Heart, Globe, Target } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mission, Vision & Values | International Eye Hospital",
  description: "Discover what drives International Eye Hospital — our mission to deliver exceptional eye care and our vision for Tanzania as a center of health tourism.",
};

const pillars = [
  {
    icon: Eye,
    title: "Medical Excellence",
    desc: "Stay updated on medical and technological developments taking place across the medical world.",
  },
  {
    icon: Heart,
    title: "Continuous Improvement",
    desc: "Adopting continuous improvement to satisfy patients, families, and their relatives.",
  },
  {
    icon: Globe,
    title: "Social Responsibility",
    desc: "Observing our social responsibility and respecting patients' rights while serving the community.",
  },
  {
    icon: Target,
    title: "Health Tourism",
    desc: "Delivering excellent diagnosis of eye diseases and making Tanzania a center of health tourism in the region.",
  },
];

export default function MissionPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="About Us"
          title="Mission, Vision &"
          highlight="Values"
          description="What drives us every day to deliver exceptional eye care and shape the future of ophthalmology in Tanzania."
          breadcrumbs={[
            { label: "About Us", href: "/about" },
            { label: "Mission & Values", href: "/about/mission" },
          ]}
          cta={{ label: "Book Appointment", href: "/appointment" }}
        />

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-14 items-start">
              <div>
                <div className="section-label">Our Purpose</div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#111827] leading-tight mb-6"
                  style={{ fontFamily: "'Merriweather', serif" }}
                >
                  Comprehensive High-Quality Eye Health Services
                </h2>

                <div className="space-y-5">
                  <p
                    className="text-[#374151] leading-[1.8]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Our focus is to provide comprehensive, high-quality eye health services. To achieve our mission, we strive every single day to uphold the standards that have made us one of Tanzania's most trusted eye hospitals.
                  </p>

                  <p
                    className="text-[#374151] leading-[1.8]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    We are committed to staying at the forefront of medical technology, embracing continuous improvement, and honoring our social responsibility to the communities we serve. Patient rights and dignity are at the center of everything we do.
                  </p>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="bg-[#1a2a6c] rounded-2xl p-6 text-white">
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ fontFamily: "'Merriweather', serif" }}
                    >
                      Our Mission
                    </h3>
                    <p
                      className="text-white/80 text-sm leading-relaxed"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      To provide comprehensive, high-quality eye care services using advanced technology, continuous improvement, and a patient-centered approach that respects the dignity and rights of every individual we serve.
                    </p>
                  </div>

                  <div className="bg-[#f5f6fa] rounded-2xl p-6 border border-gray-100">
                    <h3
                      className="text-lg font-bold text-[#1a2a6c] mb-2"
                      style={{ fontFamily: "'Merriweather', serif" }}
                    >
                      Our Vision
                    </h3>
                    <p
                      className="text-[#6b7280] text-sm leading-relaxed"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      To become the leading eye hospital in Tanzania, East Africa, and across Africa — recognized internationally as a center of excellence for eye health and medical tourism.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5]">
                  <Image
                    src="/images/eye examination 1.jpg"
                    alt="Eye examination at International Eye Hospital"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 bg-[#e62d26] text-white rounded-2xl p-5 shadow-xl">
                  <div
                    className="text-3xl font-bold"
                    style={{ fontFamily: "'Merriweather', serif" }}
                  >
                    12+
                  </div>
                  <div
                    className="text-xs text-white/80 uppercase tracking-widest mt-1"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Years of Service
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#f5f6fa]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="section-label mx-auto w-fit">What We Stand For</div>
              <h2
                className="text-4xl font-bold text-[#111827] mt-2"
                style={{ fontFamily: "'Merriweather', serif" }}
              >
                The Four Pillars of Our Commitment
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover-lift"
                  >
                    <div className="w-12 h-12 bg-[#e8edf7] rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon size={22} className="text-[#1a2a6c]" />
                    </div>
                    <h3
                      className="font-bold text-[#111827] mb-2 text-sm"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {p.title}
                    </h3>
                    <p
                      className="text-[#6b7280] text-xs leading-relaxed"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {p.desc}
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
              Experience Our Care
            </h2>
            <p
              className="text-white/70 mb-7"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Book your appointment today and see why patients trust International Eye Hospital.
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
