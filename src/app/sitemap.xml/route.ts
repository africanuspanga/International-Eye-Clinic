import { NextResponse } from "next/server";
import { getConditions, getDoctors, getPosts, getServicePages } from "@/lib/cms/content";

export const revalidate = 3600;

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
  { path: "/services/eye-tests", priority: 0.7, changefreq: "monthly" },
  { path: "/doctors", priority: 0.8, changefreq: "monthly" },
  { path: "/news", priority: 0.7, changefreq: "weekly" },
  { path: "/news/blog", priority: 0.7, changefreq: "weekly" },
  { path: "/news/eye-conditions", priority: 0.8, changefreq: "weekly" },
  { path: "/news/gallery", priority: 0.5, changefreq: "monthly" },
  { path: "/contact", priority: 0.8, changefreq: "monthly" },
  { path: "/appointment", priority: 0.9, changefreq: "weekly" },
];

export async function GET() {
  const today = new Date().toISOString().split("T")[0];
  const [posts, conditions, doctors, services] = await Promise.all([
    getPosts(),
    getConditions(),
    getDoctors(),
    getServicePages(),
  ]);

  const entry = (path: string, lastmod: string, changefreq: string, priority: number) => `  <url>
    <loc>${baseUrl}${encodeURI(path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

  const dynamicUrls: string[] = [
    ...services.map((svc) => entry(`/services/${svc.slug}`, today, "monthly", svc.showInList ? 0.8 : 0.7)),
    ...doctors.map((d) => entry(`/doctors/${d.slug}`, today, "monthly", 0.7)),
    ...posts.map((p) => entry(`/news/blog/${p.slug}`, p.isoDate || today, "monthly", 0.6)),
    ...conditions.map((c) => entry(`/news/eye-conditions/${c.slug}`, today, "monthly", 0.6)),
  ];

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
