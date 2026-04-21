import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Stethoscope, UserCheck, Building2, BadgeCheck, ShieldCheck, Plane } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why International Eye Hospital | About Us",
  description: "Discover why patients choose International Eye Hospital — experienced specialists, modern infrastructure, advanced laser equipment, and trusted insurance partnerships.",
};

const reasons = [
  {
    icon: Stethoscope,
    title: "Specialized Experts",
    desc: "Full-time working specialists rarely found in Tanzania, including retina and corneal specialists delivering ultimate high-standard care.",
  },
  {
    icon: UserCheck,
    title: "Experienced Team",
    desc: "A strong team of experienced doctors and nurses dedicated to providing personalized, world-class eye care to every patient.",
  },
  {
    icon: Building2,
    title: "Modern Infrastructure",
    desc: "Very modern infrastructure with new and updated medical equipment serving a wide range of eye diseases and conditions.",
  },
  {
    icon: BadgeCheck,
    title: "Laser Specialists",
    desc: "We have laser specialists and modern laser equipment to give you freedom from glasses and treat complex conditions.",
  },
  {
    icon: ShieldCheck,
    title: "Insurance Partners",
    desc: "Agreements with major insurance companies to ease provision of health services and reduce out-of-pocket expenses.",
  },
  {
    icon: Plane,
    title: "Health Tourism",
    desc: "Our focus is to become the referred Eye Hospital in Tanzania, East Africa, and across the entire African continent.",
  },
];

export default function WhyUsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="About Us"
          title="Why International"
          highlight="Eye Hospital"
          description="What makes us different — from rare specialist expertise to modern laser technology and trusted partnerships."
          breadcrumbs={[
            { label: "About Us", href: "/about" },
            { label: "Why Choose Us", href: "/about/why-us" },
          ]}
          cta={{ label: "Book Appointment", href: "/appointment" }}
        />

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-14 items-start">
              <div>
                <div className="section-label">Your Best Choice</div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#111827] leading-tight mb-6"
                  style={{ fontFamily: "'Merriweather', serif" }}
                >
                  Tanzania's Trusted Eye Care Destination
                </h2>

                <div className="space-y-5">
                  <p
                    className="text-[#374151] leading-[1.8]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    International Eye Hospital is one of the few specialized eye hospitals in Tanzania. We have a strong team of experienced doctors and nurses, very modern infrastructure, and new, updated medical equipment serving a wide range of eye diseases.
                  </p>

                  <p
                    className="text-[#374151] leading-[1.8]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    We have full-time working specialists who are very rarely found in Tanzania, such as retina and corneal specialists, and other specialists to deliver ultimate high-standard service to the community. We also have laser specialists and modern laser equipment to give you freedom from glasses.
                  </p>

                  <p
                    className="text-[#374151] leading-[1.8]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    For the last two years of operation in Dar es Salaam, we have earned trust from both government and private institutions for our services. We have agreements with major insurance companies to ease the provision of health services to people.
                  </p>

                  <p
                    className="text-[#374151] leading-[1.8]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Our focus is to become the referred Eye Hospital in the country, East Africa, and all of Africa. When you choose us, you choose excellence, compassion, and a brighter future for your vision.
                  </p>
                </div>

                <div className="mt-8">
                  <Link
                    href="/appointment"
                    className="inline-flex items-center gap-2 bg-[#e62d26] hover:bg-[#c4201a] text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Book Appointment <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5]">
                  <Image
                    src="/images/lasik 1.jpg"
                    alt="Advanced laser eye treatment at International Eye Hospital"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-[#1a2a6c] text-white rounded-2xl p-5 shadow-xl">
                  <div
                    className="text-3xl font-bold"
                    style={{ fontFamily: "'Merriweather', serif" }}
                  >
                    20+
                  </div>
                  <div
                    className="text-xs text-white/70 uppercase tracking-widest mt-1"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Insurance Partners
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#f5f6fa]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="section-label mx-auto w-fit">What Sets Us Apart</div>
              <h2
                className="text-4xl font-bold text-[#111827] mt-2"
                style={{ fontFamily: "'Merriweather', serif" }}
              >
                Six Reasons to Choose Us
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reasons.map((r) => {
                const Icon = r.icon;
                return (
                  <div
                    key={r.title}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover-lift"
                  >
                    <div className="w-12 h-12 bg-[#e8edf7] rounded-xl flex items-center justify-center mb-4">
                      <Icon size={22} className="text-[#1a2a6c]" />
                    </div>
                    <h3
                      className="font-bold text-[#111827] mb-2 text-sm"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {r.title}
                    </h3>
                    <p
                      className="text-[#6b7280] text-xs leading-relaxed"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {r.desc}
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
              See the Difference Yourself
            </h2>
            <p
              className="text-white/70 mb-7"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Schedule your consultation today and experience why thousands trust International Eye Hospital with their vision.
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
