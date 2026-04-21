import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { eyeConditions as fallbackConditions } from "@/lib/eye-conditions-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eye Conditions | International Eye Hospital",
  description:
    "Learn about common eye conditions including cataract, glaucoma, diabetic retinopathy, strabismus, dry eye, uveitis, and more. Expert care at International Eye Hospital.",
};

export const dynamic = "force-dynamic";

export default async function EyeConditionsPage() {
  const supabase = await createClient();
  const { data: dbConditions } = await supabase
    .from("eye_conditions")
    .select("slug, name, short_desc")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  const conditions = dbConditions && dbConditions.length > 0
    ? dbConditions
    : fallbackConditions.map((c) => ({ slug: c.slug, name: c.name, short_desc: c.shortDesc }));

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Eye Health"
          title="Eye"
          highlight="Conditions"
          description="Comprehensive information about common eye conditions, their symptoms, causes, and treatment options — guided by our team of specialists."
          breadcrumbs={[
            { label: "News", href: "/news" },
            { label: "Eye Conditions", href: "/news/eye-conditions" },
          ]}
          cta={{ label: "Book Consultation", href: "/appointment" }}
        />

        {/* Conditions Grid */}
        <section className="py-20 bg-[#f5f6fa]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <div className="section-label mx-auto w-fit">Knowledge Center</div>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#111827] mt-3"
                style={{ fontFamily: "'Merriweather', serif" }}
              >
                Common Eye Conditions
              </h2>
              <p
                className="text-[#6b7280] mt-3 max-w-2xl mx-auto leading-relaxed"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Click on any condition below to learn about its symptoms, causes, and the advanced treatment options available at International Eye Hospital.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {conditions.map((condition) => (
                <Link
                  key={condition.slug}
                  href={`/news/eye-conditions/${condition.slug}`}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-black/8 hover:border-[#1a2a6c]/20 transition-all hover-lift flex flex-col"
                >
                  {/* Top accent */}
                  <div className="h-1 bg-[#1a2a6c] w-0 group-hover:w-full transition-all duration-500" />
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-[#e8edf7] flex items-center justify-center text-[#1a2a6c] group-hover:bg-[#1a2a6c] group-hover:text-white transition-colors">
                        <Eye size={20} />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#f5f6fa] flex items-center justify-center text-[#1a2a6c] group-hover:bg-[#e62d26] group-hover:text-white transition-colors">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                    <h3
                      className="font-bold text-[#111827] text-lg mb-2 group-hover:text-[#1a2a6c] transition-colors"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {condition.name}
                    </h3>
                    <p
                      className="text-[#6b7280] text-sm leading-relaxed flex-1"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {condition.short_desc}
                    </p>
                  </div>
                  {/* Bottom bar */}
                  <div className="h-10 bg-[#f8f9fc] flex items-center px-6 group-hover:bg-[#1a2a6c] transition-colors">
                    <span
                      className="text-xs font-semibold text-[#1a2a6c] group-hover:text-white transition-colors"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Learn more
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div>
                <div className="section-label w-fit">Expert Diagnosis</div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#111827] mt-3 mb-5"
                  style={{ fontFamily: "'Merriweather', serif" }}
                >
                  World-Class Eye Care for Every Condition
                </h2>
                <p
                  className="text-[#6b7280] leading-relaxed mb-6"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  At International Eye Hospital, our team of internationally trained ophthalmologists uses the latest diagnostic technology to accurately identify and treat a wide range of eye conditions. From routine check-ups to complex surgical procedures, we are committed to preserving and restoring your vision.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Advanced diagnostic equipment (OCT, FFA, Topography)",
                    "Internationally trained specialists",
                    "Personalized treatment plans",
                    "State-of-the-art surgical facilities",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-[#374151] text-sm"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e62d26] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/appointment"
                  className="inline-flex items-center gap-2 bg-[#e62d26] hover:bg-[#c4201a] text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-colors"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Book an Appointment <ArrowRight size={14} />
                </Link>
              </div>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#e8edf7] rounded-2xl -z-10" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#fdecea] rounded-2xl -z-10" />
                <div className="bg-[#1a2a6c] rounded-2xl p-8 sm:p-10 text-white relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, white 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <div className="relative z-10">
                    <div className="text-5xl font-bold mb-2" style={{ fontFamily: "'Merriweather', serif" }}>
                      12+
                    </div>
                    <p
                      className="text-white/70 text-sm mb-8"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Eye conditions treated by our specialists
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Success Rate", value: "98%" },
                        { label: "Patients Treated", value: "50K+" },
                        { label: "Specialists", value: "10+" },
                        { label: "Years Experience", value: "25+" },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="bg-white/10 rounded-xl p-4"
                        >
                          <div
                            className="text-xl font-bold"
                            style={{ fontFamily: "'Merriweather', serif" }}
                          >
                            {stat.value}
                          </div>
                          <div
                            className="text-white/50 text-xs mt-1"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                          >
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#1a2a6c]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Merriweather', serif" }}
            >
              Experiencing Eye Problems?
            </h2>
            <p
              className="text-white/70 mb-7"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Early diagnosis is key to preserving your vision. Schedule a comprehensive eye examination with our specialists today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/appointment"
                className="bg-[#e62d26] hover:bg-[#c4201a] text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Book Appointment
              </Link>
              <a
                href="tel:+255784104300"
                className="border-2 border-white/40 hover:border-white text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Call +255 784 104 300
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
