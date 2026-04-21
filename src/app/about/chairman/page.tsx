import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chairman of Board of Directors | International Eye Hospital",
  description: "A message from the Chairman of International Eye Hospital on our vision for world-class eye care in Tanzania since 2014.",
};

export default function ChairmanPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="About Us"
          title="Chairman of"
          highlight="Board of Directors"
          description="A message from our founder on the vision, journey, and future of International Eye Hospital."
          breadcrumbs={[
            { label: "About Us", href: "/about" },
            { label: "Chairman", href: "/about/chairman" },
          ]}
          cta={{ label: "Book Appointment", href: "/appointment" }}
        />

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-14 items-start">
              <div>
                <div className="section-label">Leadership</div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#111827] leading-tight mb-6"
                  style={{ fontFamily: "'Merriweather', serif" }}
                >
                  A Vision for World-Class Eye Care in Tanzania
                </h2>

                <div className="space-y-5">
                  <p
                    className="text-[#374151] leading-[1.8]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Established in 2014, International Eye Hospital is one of the few specialized eye hospitals in Tanzania with state-of-the-art facilities offering unique comprehensive eye treatment services. We are determined to provide the best of patient care and services ranging across the entire spectrum of ophthalmic needs.
                  </p>

                  <p
                    className="text-[#374151] leading-[1.8]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Our services include Keratoconus laser treatment, Corneal disorders, Retinal disorders, Cataract Surgery, Glaucoma management, and all eye-related problems. We believe that every patient deserves access to international-standard eye care without having to leave the country.
                  </p>

                  <p
                    className="text-[#374151] leading-[1.8]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    We always strive to keep our staff active, updated, and open to changes and developments. Our doctors attend many seminars and conferences in and out of Tanzania to follow new techniques and continuously improve our services.
                  </p>
                </div>

                <div className="mt-8 bg-[#f5f6fa] rounded-2xl p-6 border-l-4 border-[#e62d26]">
                  <Quote size={24} className="text-[#e62d26] mb-3" />
                  <p
                    className="text-[#1a2a6c] font-semibold text-lg italic leading-relaxed"
                    style={{ fontFamily: "'Merriweather', serif" }}
                  >
                    We Keep an Eye on Your Eyes
                  </p>
                  <p
                    className="text-[#6b7280] text-sm mt-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    — Our motto and daily promise to every patient who walks through our doors.
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
                    src="/images/staff 3.jpg"
                    alt="International Eye Hospital Chairman and medical team"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-[#1a2a6c] text-white rounded-2xl p-5 shadow-xl">
                  <div
                    className="text-3xl font-bold"
                    style={{ fontFamily: "'Merriweather', serif" }}
                  >
                    Since 2014
                  </div>
                  <div
                    className="text-xs text-white/70 uppercase tracking-widest mt-1"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Serving Tanzania
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
