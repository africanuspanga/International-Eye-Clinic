import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, School, HeartHandshake, Eye, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Social Responsibility | International Eye Hospital",
  description: "International Eye Hospital's CSR initiatives — eye screenings, community outreach, and free medical assistance across Tanzania.",
};

const initiatives = [
  {
    icon: School,
    title: "School Screenings",
    desc: "We conduct eye screenings for students at schools across Dar es Salaam, identifying vision problems early and providing referrals for treatment.",
  },
  {
    icon: HeartHandshake,
    title: "Medical Assistance",
    desc: "We provide medical assistance to patients with economic difficulties, ensuring that financial constraints never stand in the way of eye health.",
  },
  {
    icon: Eye,
    title: "Awareness Programs",
    desc: "We participate in providing knowledge and awareness on eye conditions and diseases to corporate companies, schools, and community groups.",
  },
  {
    icon: Globe,
    title: "Health Tourism Vision",
    desc: "Our focus is to ensure a community free from eye diseases and to position Tanzania as a center of health tourism in East Africa and beyond.",
  },
];

export default function CsrPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="About Us"
          title="Corporate Social"
          highlight="Responsibility"
          description="Giving back to the community through eye screenings, outreach programs, and accessible care for all."
          breadcrumbs={[
            { label: "About Us", href: "/about" },
            { label: "CSR", href: "/about/csr" },
          ]}
          cta={{ label: "Book Appointment", href: "/appointment" }}
        />

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-14 items-start">
              <div>
                <div className="section-label">Giving Back</div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#111827] leading-tight mb-6"
                  style={{ fontFamily: "'Merriweather', serif" }}
                >
                  Serving the Community That Trusts Us
                </h2>

                <div className="space-y-5">
                  <p
                    className="text-[#374151] leading-[1.8]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Since its establishment, International Eye Hospital has achieved several meaningful CSR projects. We believe that quality eye care is a right, not a privilege, and we work tirelessly to extend our services beyond the walls of our hospital.
                  </p>

                  <p
                    className="text-[#374151] leading-[1.8]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    We actively participate in providing knowledge and awareness on eye conditions and diseases to corporate companies and schools. By educating the public, we aim to prevent avoidable vision loss and encourage early intervention.
                  </p>

                  <p
                    className="text-[#374151] leading-[1.8]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    We conduct eye screenings for students at schools and provide medical assistance to patients with economic difficulties. Our focus is to ensure a community free from eye diseases and to establish Tanzania as a center of health tourism in East Africa and Africa in general.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4">
                  {[
                    ["50+", "Schools Visited"],
                    ["10,000+", "Screenings Done"],
                    ["100%", "Commitment"],
                  ].map(([n, l]) => (
                    <div
                      key={l}
                      className="bg-[#e8edf7] rounded-xl p-4 text-center"
                    >
                      <div
                        className="text-2xl font-bold text-[#1a2a6c] mb-1"
                        style={{ fontFamily: "'Merriweather', serif" }}
                      >
                        {n}
                      </div>
                      <div
                        className="text-xs text-[#6b7280]"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5]">
                  <Image
                    src="/images/eye examination 9.jpg"
                    alt="Community eye screening program"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 bg-[#e62d26] text-white rounded-2xl p-5 shadow-xl">
                  <div
                    className="text-3xl font-bold"
                    style={{ fontFamily: "'Merriweather', serif" }}
                  >
                    Free
                  </div>
                  <div
                    className="text-xs text-white/80 uppercase tracking-widest mt-1"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Screenings for Schools
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#f5f6fa]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="section-label mx-auto w-fit">Our Programs</div>
              <h2
                className="text-4xl font-bold text-[#111827] mt-2"
                style={{ fontFamily: "'Merriweather', serif" }}
              >
                How We Make a Difference
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {initiatives.map((i) => {
                const Icon = i.icon;
                return (
                  <div
                    key={i.title}
                    className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover-lift"
                  >
                    <div className="w-12 h-12 bg-[#e8edf7] rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon size={22} className="text-[#1a2a6c]" />
                    </div>
                    <h3
                      className="font-bold text-[#111827] mb-2 text-sm"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {i.title}
                    </h3>
                    <p
                      className="text-[#6b7280] text-xs leading-relaxed"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {i.desc}
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
              Partner With Us
            </h2>
            <p
              className="text-white/70 mb-7"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Want to collaborate on a CSR initiative? Reach out and let's bring better vision to more communities together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#e62d26] hover:bg-[#c4201a] text-white font-semibold px-8 py-3.5 rounded-full transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Get in Touch <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
