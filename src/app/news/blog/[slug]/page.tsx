import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import { blogPosts, getBlogPost } from "@/lib/blog-data";
import { ArrowLeft, Clock, Tag, Calendar } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | International Eye Hospital`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const otherPosts = blogPosts.filter((p) => p.slug !== slug);

  return (
    <>
      <Navbar />
      <main>
        {/* Article header */}
        <div className="bg-[#1a2a6c] pt-14 pb-0">
          <div className="max-w-3xl mx-auto px-6">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <ArrowLeft size={14} />
              Back to News
            </Link>

            <div className="flex flex-wrap gap-3 mb-5">
              <span
                className="inline-flex items-center gap-1.5 bg-[#e62d26] text-white text-xs font-semibold px-3 py-1 rounded-full"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <Tag size={10} />
                {post.category}
              </span>
              <span
                className="inline-flex items-center gap-1.5 text-white/60 text-xs"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <Clock size={11} />
                {post.readTime}
              </span>
              <span
                className="inline-flex items-center gap-1.5 text-white/60 text-xs"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <Calendar size={11} />
                {post.date}
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-8"
              style={{ fontFamily: "'Merriweather', serif" }}
            >
              {post.title}
            </h1>
          </div>

          {/* Hero image */}
          <div className="max-w-3xl mx-auto px-6">
            <div className="relative h-72 sm:h-96 rounded-t-2xl overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="bg-white">
          <div className="max-w-3xl mx-auto px-6 py-12">
            <p
              className="text-[#374151] text-base leading-relaxed mb-8 text-lg font-medium border-l-4 border-[#1a2a6c] pl-5"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {post.excerpt}
            </p>

            <div className="space-y-6">
              {post.content.map((section, i) => {
                if (section.type === "heading") {
                  return (
                    <h2
                      key={i}
                      className="text-xl font-bold text-[#1a2a6c] mt-8 mb-2"
                      style={{ fontFamily: "'Merriweather', serif" }}
                    >
                      {section.text}
                    </h2>
                  );
                }
                if (section.type === "paragraph") {
                  return (
                    <p
                      key={i}
                      className="text-[#374151] text-base leading-relaxed"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {section.text}
                    </p>
                  );
                }
                if (section.type === "list") {
                  return (
                    <ul key={i} className="space-y-2 pl-2">
                      {section.items?.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-[#374151] text-sm leading-relaxed"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#e62d26] mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (section.type === "tip") {
                  return (
                    <div
                      key={i}
                      className="bg-[#e8edf7] border-l-4 border-[#1a2a6c] rounded-r-xl p-5 mt-8"
                    >
                      <p
                        className="text-[#1a2a6c] text-sm leading-relaxed font-medium"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        💡 {section.text}
                      </p>
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {/* CTA */}
            <div className="mt-12 bg-[#1a2a6c] rounded-2xl p-7 text-center">
              <h3
                className="text-xl font-bold text-white mb-3"
                style={{ fontFamily: "'Merriweather', serif" }}
              >
                Ready to take care of your eyes?
              </h3>
              <p
                className="text-white/70 text-sm mb-5"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Book a comprehensive eye examination with our specialist doctors today.
              </p>
              <Link
                href="/appointment"
                className="inline-block bg-[#e62d26] hover:bg-[#c4201a] text-white font-semibold px-7 py-3 rounded-full text-sm transition-colors"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Book an Appointment
              </Link>
            </div>
          </div>
        </div>

        {/* Related posts */}
        {otherPosts.length > 0 && (
          <section className="bg-[#f5f6fa] py-16">
            <div className="max-w-3xl mx-auto px-6">
              <h2
                className="text-2xl font-bold text-[#111827] mb-8"
                style={{ fontFamily: "'Merriweather', serif" }}
              >
                More from our Blog
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {otherPosts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/news/blog/${p.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:shadow-black/8 transition-all"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <span
                        className="text-[#e62d26] text-xs font-semibold"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {p.category}
                      </span>
                      <h3
                        className="font-bold text-[#111827] text-sm mt-1 leading-snug group-hover:text-[#1a2a6c] transition-colors"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {p.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
