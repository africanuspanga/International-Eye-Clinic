"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, CheckCircle2 } from "lucide-react";

const promos = [
  {
    image: "/smart lens.jpeg",
    alt: "Smart Lens for Cataract Surgery",
    badge: "Premium Technology",
    title: "Smart Lens for Cataract Surgery",
    subtitle: "Expert care for clear vision",
    description:
      "Experience the next generation of cataract treatment with our Smart Lens technology. Designed to deliver superior visual outcomes and greater independence from glasses after surgery.",
    benefits: [
      "Improved vision clarity",
      "Reduced glare and halos",
      "Enhanced vision at multiple distances",
      "High patient satisfaction",
      "Better visual outcomes",
    ],
    ctaLink: "/services/multifocal-cataract",
    ctaLabel: "Learn More",
  },
  {
    image: "/retina clinic.jpeg",
    alt: "Specialized Retina Clinic",
    badge: "Specialist Care",
    title: "Specialized Retina Clinic",
    subtitle: "Advanced care for retinal diseases",
    description:
      "Our dedicated retina clinic provides expert diagnosis and treatment for complex retinal conditions. Led by specialist ophthalmologists using state-of-the-art imaging and laser technology.",
    benefits: [
      "Diabetic Retinopathy treatment",
      "Age-Related Macular Degeneration care",
      "Retinal Detachment surgery",
      "Retinal Vein Occlusion management",
      "Macular Holes and more",
    ],
    ctaLink: "/services/retina",
    ctaLabel: "Learn More",
  },
];

export default function PromoSection() {
  return (
    <section className="py-20 bg-[#f5f6fa]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-label mx-auto w-fit">Featured Programs</div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-[#111827] leading-tight mb-3"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Advanced Care <span className="text-[#e62d26]">Highlights</span>
          </h2>
          <p
            className="text-[#6b7280] text-base max-w-xl mx-auto"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Discover our flagship treatment programs designed to deliver exceptional results with cutting-edge technology and specialist expertise.
          </p>
        </div>

        {/* Promo Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {promos.map((promo) => (
            <div
              key={promo.title}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-black/10 hover:border-[#e62d26]/20 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <Image
                  src={promo.image}
                  alt={promo.alt}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <span
                  className="absolute top-4 left-4 bg-[#e62d26] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {promo.badge}
                </span>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3
                    className="text-2xl font-bold text-white leading-tight mb-1"
                    style={{ fontFamily: "'Merriweather', serif" }}
                  >
                    {promo.title}
                  </h3>
                  <p
                    className="text-white/80 text-sm"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {promo.subtitle}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <p
                  className="text-[#6b7280] text-sm leading-relaxed mb-5"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {promo.description}
                </p>

                <ul className="space-y-2.5 mb-7">
                  {promo.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={16}
                        className="text-[#e62d26] mt-0.5 flex-shrink-0"
                      />
                      <span
                        className="text-[#374151] text-sm leading-snug"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/appointment"
                    className="inline-flex items-center gap-2 bg-[#e62d26] hover:bg-[#c4201a] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <Calendar size={15} />
                    Book Appointment
                  </Link>
                  <Link
                    href={promo.ctaLink}
                    className="inline-flex items-center gap-2 border-2 border-[#e62d26] text-[#e62d26] hover:bg-[#fdecea] font-semibold px-6 py-3 rounded-full text-sm transition-colors"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {promo.ctaLabel}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
