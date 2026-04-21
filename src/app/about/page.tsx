import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Heart, Lightbulb, Shield, Star, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | International Eye Hospital",
  description: "Learn about International Eye Hospital — our mission, values, quality policy, and commitment to world-class eye care in Tanzania since 2014.",
  openGraph: {
    title: "About Us | International Eye Hospital",
    description: "Our mission, values, quality policy, and commitment to world-class eye care in Tanzania.",
  },
};

const values = [
  { icon: Star, label: "Excellence", desc: "We pursue the highest standards in every aspect of care." },
  { icon: Lightbulb, label: "Innovation", desc: "Adopting the latest technologies and medical advancements." },
  { icon: Heart, label: "Patient Care", desc: "Every decision centers on the patient's wellbeing." },
  { icon: Shield, label: "Integrity", desc: "Transparent, honest, and ethical in everything we do." },
  { icon: Users, label: "Social Responsibility", desc: "Giving back through community outreach and free screenings." },
];

const subPages = [
  { label: "Chairman's Message", href: "/about/chairman", desc: "A message from our founder on our vision for eye care in Africa." },
  { label: "Mission & Values", href: "/about/mission", desc: "What drives us every day to deliver exceptional care." },
  { label: "Quality Policy", href: "/about/quality", desc: "Our commitment to continuous improvement and patient safety." },
  { label: "CSR Program", href: "/about/csr", desc: "Community screenings, outreach, and giving back to Tanzania." },
  { label: "Why Choose Us", href: "/about/why-us", desc: "What makes International Eye Hospital different from the rest." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="About Us"
          title="Tanzania's Leading"
          highlight="Eye Care Institution"
          description="Founded in 2014, we are one of the few specialized eye hospitals in Tanzania equipped with modern infrastructure, advanced medical technologies, and internationally trained specialists."
          breadcrumbs={[{ label: "About Us", href: "/about" }]}
          cta={{ label: "Book Appointment", href: "/appointment" }}
        />

        {/* Main content */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-14 items-start">
              <div>
                <div className="section-label">Our Story</div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] leading-tight mb-5" style={{ fontFamily: "'Merriweather', serif" }}>
                  Delivering World-Class Eye Care Since 2014
                </h2>
                <p className="text-[#374151] leading-relaxed mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  International Eye Hospital was established with one clear goal: to provide the people of Tanzania with access to the same standard of eye care available at leading international hospitals.
                </p>
                <p className="text-[#6b7280] text-sm leading-relaxed mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  We are part of the IFG Hospitals Group and are equipped with state-of-the-art diagnostic and surgical equipment, including advanced laser systems, OCT machines, and surgical suites designed to international standards.
                </p>
                <p className="text-[#6b7280] text-sm leading-relaxed mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Our team of internationally trained ophthalmologists regularly participates in global medical congresses and training programs, ensuring our patients benefit from the most current knowledge and techniques in the field.
                </p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[["12+", "Years Experience"], ["1000+", "Patients Treated"], ["20+", "Insurance Partners"]].map(([n, l]) => (
                    <div key={l} className="bg-[#e8edf7] rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-[#1a2a6c] mb-1" style={{ fontFamily: "'Merriweather', serif" }}>{n}</div>
                      <div className="text-xs text-[#6b7280]" style={{ fontFamily: "'Poppins', sans-serif" }}>{l}</div>
                    </div>
                  ))}
                </div>

                {/* Mission & Vision */}
                <div className="space-y-4">
                  {[
                    { title: "Mission", text: "To provide comprehensive, high-quality eye care services using advanced technology and continuous improvement." },
                    { title: "Vision", text: "To become the leading eye hospital in Tanzania, East Africa, and across Africa." },
                  ].map((mv) => (
                    <div key={mv.title} className="border-l-4 border-[#e62d26] pl-5">
                      <h4 className="font-bold text-[#1a2a6c] mb-1 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Our {mv.title}</h4>
                      <p className="text-[#6b7280] text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>{mv.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5]">
                  <Image src="/images/eye examination 1.jpg" alt="International Eye Hospital" fill className="object-cover" />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-[#1a2a6c] text-white rounded-2xl p-5 shadow-xl">
                  <div className="text-3xl font-bold" style={{ fontFamily: "'Merriweather', serif" }}>12+</div>
                  <div className="text-xs text-white/70 uppercase tracking-widest mt-1" style={{ fontFamily: "'Poppins', sans-serif" }}>Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-[#f5f6fa]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="section-label mx-auto w-fit">Our Values</div>
              <h2 className="text-4xl font-bold text-[#111827] mt-2" style={{ fontFamily: "'Merriweather', serif" }}>
                What We Stand For
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.label} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover-lift">
                    <div className="w-12 h-12 bg-[#e8edf7] rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon size={22} className="text-[#1a2a6c]" />
                    </div>
                    <h3 className="font-bold text-[#111827] mb-2 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>{v.label}</h3>
                    <p className="text-[#6b7280] text-xs leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Sub-pages */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="section-label mx-auto w-fit">Explore More</div>
              <h2 className="text-4xl font-bold text-[#111827] mt-2" style={{ fontFamily: "'Merriweather', serif" }}>
                Learn More About Us
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {subPages.map((p) => (
                <Link key={p.label} href={p.href}
                  className="group bg-white border border-gray-100 hover:border-[#1a2a6c]/30 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all hover-lift">
                  <div className="w-2 h-2 rounded-full bg-[#e62d26] mb-4" />
                  <h3 className="font-bold text-[#111827] group-hover:text-[#1a2a6c] mb-2 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {p.label}
                  </h3>
                  <p className="text-[#6b7280] text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>{p.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#1a2a6c]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Ready to Experience Our Care?
            </h2>
            <p className="text-white/70 mb-7" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Book your appointment today and experience world-class eye care in Tanzania.
            </p>
            <Link href="/appointment"
              className="inline-flex items-center gap-2 bg-[#e62d26] hover:bg-[#c4201a] text-white font-semibold px-8 py-3.5 rounded-full transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              Book Appointment
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
