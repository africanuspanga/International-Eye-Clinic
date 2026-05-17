import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const baseUrl = "https://www.internationaleyehospital.com";

const staticRoutes = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/about", priority: 0.8, changefreq: "monthly" },
  { path: "/about/chairman", priority: 0.6, changefreq: "monthly" },
  { path: "/about/csr", priority: 0.6, changefreq: "monthly" },
  { path: "/about/mission", priority: 0.6, changefreq: "monthly" },
  { path: "/about/quality", priority: 0.6, changefreq: "monthly" },
  { path: "/about/why-us", priority: 0.6, changefreq: "monthly" },
  { path: "/services", priority: 0.9, changefreq: "weekly" },
  { path: "/services/cataract", priority: 0.8, changefreq: "monthly" },
  { path: "/services/glaucoma", priority: 0.8, changefreq: "monthly" },
  { path: "/services/retina", priority: 0.8, changefreq: "monthly" },
  { path: "/services/keratoconus", priority: 0.8, changefreq: "monthly" },
  { path: "/services/cornea", priority: 0.8, changefreq: "monthly" },
  { path: "/services/optic", priority: 0.7, changefreq: "monthly" },
  { path: "/services/general-exam", priority: 0.8, changefreq: "monthly" },
  { path: "/services/eye-tests", priority: 0.7, changefreq: "monthly" },
  { path: "/services/oct", priority: 0.7, changefreq: "monthly" },
  { path: "/services/ffa", priority: 0.7, changefreq: "monthly" },
  { path: "/services/corneal-topography", priority: 0.7, changefreq: "monthly" },
  { path: "/services/keratometry", priority: 0.7, changefreq: "monthly" },
  { path: "/services/pachymetry", priority: 0.7, changefreq: "monthly" },
  { path: "/services/tonometry", priority: 0.7, changefreq: "monthly" },
  { path: "/services/visual-field", priority: 0.7, changefreq: "monthly" },
  { path: "/services/a-scan", priority: 0.7, changefreq: "monthly" },
  { path: "/services/automated-refractor", priority: 0.7, changefreq: "monthly" },
  { path: "/services/lens-meter", priority: 0.7, changefreq: "monthly" },
  { path: "/services/argon-laser", priority: 0.7, changefreq: "monthly" },
  { path: "/services/yag-laser", priority: 0.7, changefreq: "monthly" },
  { path: "/doctors", priority: 0.8, changefreq: "monthly" },
  { path: "/doctors/muammer-coskun", priority: 0.7, changefreq: "monthly" },
  { path: "/doctors/vangilisasi-msola", priority: 0.7, changefreq: "monthly" },
  { path: "/doctors/zayd-sangey", priority: 0.7, changefreq: "monthly" },
  { path: "/doctors/harley-mkini", priority: 0.7, changefreq: "monthly" },
  { path: "/doctors/michael-machimu", priority: 0.7, changefreq: "monthly" },
  { path: "/news", priority: 0.7, changefreq: "weekly" },
  { path: "/news/blog", priority: 0.7, changefreq: "weekly" },
  { path: "/news/eye-conditions", priority: 0.8, changefreq: "weekly" },
  { path: "/news/gallery", priority: 0.5, changefreq: "monthly" },
  { path: "/contact", priority: 0.8, changefreq: "monthly" },
  { path: "/appointment", priority: 0.9, changefreq: "weekly" },
];

export async function GET() {
  const supabase = await createClient();

  const today = new Date().toISOString().split("T")[0];

  // Fetch dynamic content from Supabase
  const [
    { data: blogPosts },
    { data: eyeConditions },
    { data: doctors },
  ] = await Promise.all([
    supabase
      .from("blog_posts")
      .select("slug, updated_at")
      .eq("is_published", true)
      .order("published_date", { ascending: false }),
    supabase
      .from("eye_conditions")
      .select("slug, updated_at")
      .eq("is_published", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("doctors")
      .select("slug, updated_at")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
  ]);

  const dynamicUrls: string[] = [];

  // Blog posts
  if (blogPosts) {
    for (const post of blogPosts) {
      const lastmod = post.updated_at
        ? post.updated_at.split("T")[0]
        : today;
      dynamicUrls.push(`  <url>
    <loc>${baseUrl}/news/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
    }
  }

  // Eye conditions
  if (eyeConditions) {
    for (const condition of eyeConditions) {
      const lastmod = condition.updated_at
        ? condition.updated_at.split("T")[0]
        : today;
      dynamicUrls.push(`  <url>
    <loc>${baseUrl}/news/eye-conditions/${condition.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
    }
  }

  // Doctors
  if (doctors) {
    for (const doctor of doctors) {
      const lastmod = doctor.updated_at
        ? doctor.updated_at.split("T")[0]
        : today;
      dynamicUrls.push(`  <url>
    <loc>${baseUrl}/doctors/${doctor.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
    }
  }

  const staticUrls = staticRoutes.map(
    (route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...dynamicUrls].join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
