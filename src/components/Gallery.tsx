import Image from "next/image";
import Link from "next/link";

const images = [
  { src: "/images/eye.jpg", alt: "Eye close-up", span: "col-span-2 row-span-2" },
  { src: "/images/eye examination 1.jpg", alt: "Eye examination" },
  { src: "/images/lasik 1.jpg", alt: "LASIK surgery" },
  { src: "/images/eye 2.jpg", alt: "Eye detail", span: "col-span-2" },
  { src: "/images/eye test 1.jpg", alt: "Eye test" },
  { src: "/images/optic 4.jpg", alt: "Optic examination" },
  { src: "/images/lasik 2.jpg", alt: "LASIK procedure" },
  { src: "/images/eye examination 6.jpg", alt: "Patient examination" },
  { src: "/images/staff-3.jpg", alt: "Medical staff", span: "row-span-2" },
  { src: "/images/eye examination 8.jpg", alt: "Advanced eye exam" },
  { src: "/images/eye test 2.jpg", alt: "Vision testing" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-[#f5f6fa]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="section-label mx-auto w-fit">Our Facility</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#111827] leading-tight mb-3" style={{ fontFamily: "'Merriweather', serif" }}>
            Inside Our World
          </h2>
          <p className="text-[#6b7280] text-base max-w-lg mx-auto" style={{ fontFamily: "'Poppins', sans-serif" }}>
            State-of-the-art facilities designed for your comfort, safety, and best possible outcomes.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] gap-3">
          {images.map((img, i) => (
            <div key={i} className={`relative overflow-hidden rounded-xl group ${img.span ?? ""}`}>
              <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="25vw" />
              <div className="absolute inset-0 bg-[#1a2a6c]/0 group-hover:bg-[#1a2a6c]/40 transition-all duration-300" />
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-xs font-medium bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {img.alt}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/news/gallery"
            className="inline-flex items-center gap-2 bg-[#1a2a6c] hover:bg-[#243688] text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
