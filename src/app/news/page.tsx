import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Image as ImageIcon, Video, FileText, Star, Download, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Resources | International Eye Hospital",
  description: "Eye health news, publications, gallery, videos, testimonials, and patient brochures from International Eye Hospital.",
};

const categories = [
  { icon: BookOpen, label: "Eye Health Blog", href: "/news/blog", desc: "Evidence-based articles and tips from our ophthalmologists — simple 3-minute reads.", color: "bg-[#e8edf7] text-[#1a2a6c]" },
  { icon: ImageIcon, label: "Gallery", href: "/news/gallery", desc: "Photos of our facilities, equipment, staff, and community outreach programs.", color: "bg-purple-50 text-purple-600" },
  { icon: FileText, label: "Publications", href: "/news/publications", desc: "Medical publications, research, and updates from our specialist doctors.", color: "bg-green-50 text-green-600" },
  { icon: Video, label: "Videos", href: "/news/videos", desc: "Educational videos about eye care, surgical procedures, and patient stories.", color: "bg-red-50 text-red-600" },
  { icon: Star, label: "Testimonies", href: "/news/testimonies", desc: "Real stories from patients who have experienced life-changing care at our hospital.", color: "bg-amber-50 text-amber-600" },
  { icon: Download, label: "Brochures", href: "/news/brochures", desc: "Download patient guides, service brochures, and health information booklets.", color: "bg-teal-50 text-teal-600" },
];

export default function NewsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="News & Resources"
          title="Stay Informed About"
          highlight="Eye Health"
          description="Access educational resources, patient stories, and updates from our team of eye care specialists."
          breadcrumbs={[{ label: "News", href: "/news" }]}
        />

        {/* Blog posts featured */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <div className="section-label w-fit">Latest Articles</div>
                <h2 className="text-4xl font-bold text-[#111827] mt-2" style={{ fontFamily: "'Merriweather', serif" }}>
                  Eye Health Blog
                </h2>
              </div>
              <Link href="/news/blog"
                className="inline-flex items-center gap-2 text-[#1a2a6c] font-semibold text-sm hover:gap-3 transition-all"
                style={{ fontFamily: "'Poppins', sans-serif" }}>
                View All Articles <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-7">
              {blogPosts.map((post) => (
                <Link key={post.slug} href={`/news/blog/${post.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-black/8 hover:border-[#1a2a6c]/20 transition-all overflow-hidden hover-lift">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#e62d26] text-white text-xs font-semibold px-3 py-1 rounded-full" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-[#6b7280] text-xs mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      <Clock size={11} /> {post.readTime} · {post.date}
                    </div>
                    <h3 className="font-bold text-[#111827] text-sm leading-snug mb-3 group-hover:text-[#1a2a6c] transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[#1a2a6c] text-sm font-semibold group-hover:gap-2.5 transition-all" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Read Article <ArrowRight size={13} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Resource categories */}
        <section className="py-16 bg-[#f5f6fa]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="section-label mx-auto w-fit">Resources</div>
              <h2 className="text-4xl font-bold text-[#111827] mt-2" style={{ fontFamily: "'Merriweather', serif" }}>
                Browse Our Content
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((c) => {
                const Icon = c.icon;
                return (
                  <Link key={c.label} href={c.href}
                    className="group bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-xl hover:shadow-black/8 hover:border-[#1a2a6c]/20 transition-all hover-lift">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${c.color}`}>
                      <Icon size={22} />
                    </div>
                    <h3 className="font-bold text-[#111827] text-lg mb-2 group-hover:text-[#1a2a6c] transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {c.label}
                    </h3>
                    <p className="text-[#6b7280] text-sm leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {c.desc}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#1a2a6c]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Have an Eye Health Question?
            </h2>
            <p className="text-white/70 mb-7" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Our specialists are happy to answer your questions — book a consultation today.
            </p>
            <Link href="/appointment"
              className="inline-block bg-[#e62d26] hover:bg-[#c4201a] text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              Book Consultation
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
