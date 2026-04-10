import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import { Clock, ArrowRight } from "lucide-react";

export default function BlogPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="section-label">Eye Health Blog</div>
            <h2
              className="text-4xl sm:text-5xl font-bold text-[#111827] leading-tight mt-3"
              style={{ fontFamily: "'Merriweather', serif" }}
            >
              Tips & Insights from<br />
              <span className="text-[#1a2a6c]">Our Specialists</span>
            </h2>
          </div>
          <Link
            href="/news/blog"
            className="inline-flex items-center gap-2 border-2 border-[#1a2a6c] text-[#1a2a6c] hover:bg-[#1a2a6c] hover:text-white font-semibold px-7 py-3 rounded-full text-sm transition-all self-start lg:self-auto flex-shrink-0"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            View All Articles <ArrowRight size={14} />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-7">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/news/blog/${post.slug}`}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm shadow-black/5 hover:shadow-xl hover:shadow-black/10 hover:border-[#1a2a6c]/20 transition-all duration-300 overflow-hidden hover-lift"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span
                    className="bg-[#e62d26] text-white text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div
                  className="flex items-center gap-2 text-[#6b7280] text-xs mb-3"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  <Clock size={11} />
                  {post.readTime}
                  <span className="text-gray-300">·</span>
                  {post.date}
                </div>

                <h3
                  className="font-bold text-[#111827] text-base leading-snug mb-3 group-hover:text-[#1a2a6c] transition-colors"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {post.title}
                </h3>

                <p
                  className="text-[#6b7280] text-sm leading-relaxed line-clamp-2 mb-4"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {post.excerpt}
                </p>

                <div
                  className="flex items-center gap-1.5 text-[#1a2a6c] text-sm font-semibold group-hover:gap-2.5 transition-all"
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
  );
}
