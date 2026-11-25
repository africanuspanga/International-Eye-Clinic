import Image from "next/image";
import Link from "next/link";
import { getGallery, spanClass } from "@/lib/cms/content";


export default async function Gallery() {
  const images = (await getGallery()).filter((img) => img.showOnHome);
  if (images.length === 0) return null;
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
            <div key={i} className={`relative overflow-hidden rounded-xl group ${spanClass(img.span)}`}>
              <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="25vw" />
              <div className="absolute inset-0 bg-[#e62d26]/0 group-hover:bg-[#e62d26]/40 transition-all duration-300" />
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
            className="inline-flex items-center gap-2 bg-[#e62d26] hover:bg-[#c4201a] text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
