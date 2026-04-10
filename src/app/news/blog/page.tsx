import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import PageHero from "@/components/PageHero";
import { blogPosts } from "@/lib/blog-data";
import { Clock, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eye Health Blog | International Eye Hospital",
  description:
    "Expert eye health articles, tips, and insights from the specialists at International Eye Hospital in Dar es Salaam.",
};

export default function BlogListPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Eye Health Blog"
          title="Insights from Our"
          highlight="Specialists"
          description="Evidence-based articles on eye health, treatments, and how to protect your vision — written by our team of ophthalmologists."
          breadcrumbs={[
            { label: "News", href: "/news" },
            { label: "Blog", href: "/news/blog" },
          ]}
        />

        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/news/blog/${post.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-black/8 hover:border-[#1a2a6c]/20 transition-all overflow-hidden hover-lift"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className="bg-[#e62d26] text-white text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div
                      className="flex items-center gap-3 text-[#6b7280] text-xs mb-3"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {post.readTime}
                      </span>
                      <span>·</span>
                      <span>{post.date}</span>
                    </div>
                    <h2
                      className="font-bold text-[#111827] text-base leading-snug mb-2 group-hover:text-[#1a2a6c] transition-colors"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {post.title}
                    </h2>
                    <p
                      className="text-[#6b7280] text-sm leading-relaxed line-clamp-3"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {post.excerpt}
                    </p>
                    <div
                      className="mt-4 flex items-center gap-1.5 text-[#1a2a6c] text-sm font-semibold group-hover:gap-2.5 transition-all"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Read Article <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#1a2a6c]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2
              className="text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Merriweather', serif" }}
            >
              Have an Eye Health Question?
            </h2>
            <p
              className="text-white/70 mb-7"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Our specialists are happy to answer your questions — book a consultation today.
            </p>
            <Link
              href="/appointment"
              className="inline-block bg-[#e62d26] hover:bg-[#c4201a] text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
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
