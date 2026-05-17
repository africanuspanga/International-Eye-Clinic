import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import { blogPosts, getBlogPost } from "@/lib/blog-data";
import { ArrowLeft, Clock, Tag, Calendar } from "lucide-react";
import { BreadcrumbJsonLd, BlogPostingJsonLd } from "@/components/StructuredData";
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
    alternates: {
      canonical: `https://www.internationaleyehospital.com/news/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} | International Eye Hospital`,
      description: post.excerpt,
      url: `https://www.internationaleyehospital.com/news/blog/${slug}`,
      type: "article",
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | International Eye Hospital`,
      description: post.excerpt,
      images: [post.image],
    },
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
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.internationaleyehospital.com/" },
          { name: "News", url: "https://www.internationaleyehospital.com/news" },
          { name: "Blog", url: "https://www.internationaleyehospital.com/news/blog" },
          { name: post.title, url: `https://www.internationaleyehospital.com/news/blog/${slug}` },
        ]}
      />
      <BlogPostingJsonLd
        title={post.title}
        description={post.excerpt}
        url={`/news/blog/${slug}`}
        image={post.image}
        datePublished={new Date(post.date).toISOString()}
        authorName="International Eye Hospital"
      />
      <Navbar />
      <main>
        {/* Article header */}
        <div className="bg-[#e62d26] pt-14 pb-0">
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
                className="inline-flex items-center gap-1.5 bg-[#1a2a6c] text-white text-xs font-semibold px-3 py-1 rounded-full"
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
              className="text-[#374151] text-base leading-relaxed mb-8 text-lg font-medium border-l-4 border-[#e62d26] pl-5"
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
                      className="text-xl font-bold text-[#e62d26] mt-8 mb-2"
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
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1a2a6c] mt-2 flex-shrink-0" />
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
                      className="bg-[#fdecea] border-l-4 border-[#e62d26] rounded-r-xl p-5 mt-8"
                    >
                      <p
                        className="text-[#e62d26] text-sm leading-relaxed font-medium"
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
            <div className="mt-12 bg-[#e62d26] rounded-2xl p-7 text-center">
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
                className="inline-block bg-[#1a2a6c] hover:bg-[#243688] text-white font-semibold px-7 py-3 rounded-full text-sm transition-colors"
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
                        className="text-[#1a2a6c] text-xs font-semibold"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {p.category}
                      </span>
                      <h3
                        className="font-bold text-[#111827] text-sm mt-1 leading-snug group-hover:text-[#e62d26] transition-colors"
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
