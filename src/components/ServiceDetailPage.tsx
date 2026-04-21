import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, BookOpen } from "lucide-react";
import type { ServiceDetail } from "@/lib/services-data";
import { servicesDetail } from "@/lib/services-data";

interface Props {
  service: ServiceDetail;
}

export default function ServiceDetailPage({ service }: Props) {
  const paragraphs = service.content.split("\n\n").filter((p) => p.trim());

  const otherServices = servicesDetail
    .filter((s) => s.slug !== service.slug)
    .slice(0, 4);

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Our Services"
          title={service.title}
          description={service.subtitle}
          breadcrumbs={[
            { label: "Services", href: "/services" },
            { label: service.title, href: `/services/${service.slug}` },
          ]}
          cta={{ label: "Book Appointment", href: "/appointment" }}
        />

        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Image */}
                <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden mb-10">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a6c]/60 to-transparent" />
                </div>

                {/* Text */}
                <div className="space-y-6">
                  {paragraphs.map((para, i) => (
                    <p
                      key={i}
                      className="text-[#374151] leading-[1.8] text-[15px]"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* CTA Box */}
                <div className="mt-10 bg-[#1a2a6c] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, white 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3
                        className="text-lg font-bold mb-1"
                        style={{ fontFamily: "'Merriweather', serif" }}
                      >
                        Have Any Questions?
                      </h3>
                      <p
                        className="text-white/70 text-sm"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        Our specialists are ready to help you.
                      </p>
                    </div>
                    <a
                      href={`tel:${service.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 bg-[#e62d26] hover:bg-[#c4201a] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors whitespace-nowrap"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      <Phone size={15} />
                      {service.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="lg:sticky lg:top-28 space-y-6">
                  {/* Book Appointment Card */}
                  <div className="bg-[#f8f9fc] rounded-2xl p-6 border border-gray-100">
                    <h4
                      className="font-bold text-[#111827] mb-3"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Book a Consultation
                    </h4>
                    <p
                      className="text-[#6b7280] text-sm mb-5 leading-relaxed"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Schedule an appointment with our specialists for a comprehensive evaluation.
                    </p>
                    <Link
                      href="/appointment"
                      className="inline-flex items-center gap-2 bg-[#e62d26] hover:bg-[#c4201a] text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors w-full justify-center"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Book Appointment <ArrowRight size={14} />
                    </Link>
                  </div>

                  {/* Other Services */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h4
                      className="font-bold text-[#111827] mb-4"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Other Services
                    </h4>
                    <div className="space-y-2">
                      {otherServices.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#6b7280] hover:text-[#1a2a6c] hover:bg-[#f5f6fa] transition-colors"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          <BookOpen size={14} className="text-[#e62d26] flex-shrink-0" />
                          <span className="line-clamp-1">{s.title}</span>
                        </Link>
                      ))}
                    </div>
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
