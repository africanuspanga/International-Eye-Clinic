import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | International Eye Hospital",
  description:
    "Photos from International Eye Hospital — our facilities, equipment, medical staff, and community outreach in Dar es Salaam, Tanzania.",
};

const galleryImages = [
  { src: "/images/eye.jpg", alt: "Close-up eye detail", category: "Clinical" },
  { src: "/images/eye examination 1.jpg", alt: "Patient eye examination", category: "Examination" },
  { src: "/images/eye examination 6.jpg", alt: "Slit-lamp examination", category: "Examination" },
  { src: "/images/eye examination 8.jpg", alt: "Advanced diagnostic exam", category: "Examination" },
  { src: "/images/eye examination 9.jpg", alt: "Ophthalmology consultation", category: "Examination" },
  { src: "/images/eye test 1.jpg", alt: "Visual acuity test", category: "Eye Tests" },
  { src: "/images/eye test 2.jpg", alt: "Automated refraction", category: "Eye Tests" },
  { src: "/images/eye 2.jpg", alt: "Anterior segment detail", category: "Clinical" },
  { src: "/images/eye 3.jpg", alt: "Retinal imaging", category: "Clinical" },
  { src: "/images/lasik 1.jpg", alt: "LASIK laser surgery suite", category: "Surgery" },
  { src: "/images/lasik 2.jpg", alt: "LASIK procedure", category: "Surgery" },
  { src: "/images/optic 4.jpg", alt: "Optic nerve evaluation", category: "Diagnostics" },
  { src: "/images/staff 3.jpg", alt: "Medical team", category: "Our Team" },
  { src: "/images/staff-3.jpg", alt: "Clinical staff", category: "Our Team" },
];

const categories = ["All", "Examination", "Eye Tests", "Surgery", "Clinical", "Diagnostics", "Our Team"];

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Gallery"
          title="Inside"
          highlight="Our Hospital"
          description="A look inside International Eye Hospital — our world-class facilities, advanced diagnostic equipment, dedicated medical staff, and the care we provide every day."
          breadcrumbs={[
            { label: "News", href: "/news" },
            { label: "Gallery", href: "/news/gallery" },
          ]}
        />

        {/* Stats bar */}
        <div className="bg-[#e8edf7] py-6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-8 text-center">
              {[
                { label: "Photos", value: `${galleryImages.length}+` },
                { label: "Departments", value: "7" },
                { label: "Years of Care", value: "12+" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-[#1a2a6c]" style={{ fontFamily: "'Merriweather', serif" }}>{s.value}</div>
                  <div className="text-[#6b7280] text-xs uppercase tracking-widest mt-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-default ${
                    cat === "All"
                      ? "bg-[#1a2a6c] text-white"
                      : "bg-[#e8edf7] text-[#1a2a6c]"
                  }`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Masonry-style grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {galleryImages.map((img, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl break-inside-avoid shadow-sm hover:shadow-xl hover:shadow-black/10 transition-all duration-300">
                  <div className="relative w-full" style={{ minHeight: i % 3 === 0 ? "260px" : i % 3 === 1 ? "200px" : "230px" }}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-[#1a2a6c]/0 group-hover:bg-[#1a2a6c]/50 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    <span
                      className="inline-block bg-[#e62d26] text-white text-xs font-semibold px-2.5 py-1 rounded-full mb-1"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {img.category}
                    </span>
                    <p
                      className="text-white text-sm font-medium"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {img.alt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#1a2a6c]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Come Visit Us in Person
            </h2>
            <p className="text-white/70 mb-7" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Tropical Center, New Bagamoyo Road, Dar es Salaam — Mon–Sat, 8:30 AM to 5:30 PM.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/appointment"
                className="inline-block bg-[#e62d26] hover:bg-[#c4201a] text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Book an Appointment
              </Link>
              <Link
                href="/contact"
                className="inline-block border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Get Directions
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
