import { NextResponse } from "next/server";

const baseUrl = "https://www.internationaleyehospital.com";

const staticRoutes = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/about", priority: 0.8, changefreq: "monthly" },
  { path: "/services", priority: 0.9, changefreq: "weekly" },
  { path: "/services/cataract", priority: 0.8, changefreq: "monthly" },
  { path: "/services/glaucoma", priority: 0.8, changefreq: "monthly" },
  { path: "/services/lasik", priority: 0.8, changefreq: "monthly" },
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
  { path: "/doctors/bulent-guler", priority: 0.7, changefreq: "monthly" },
  { path: "/doctors/aydin-yildirim", priority: 0.7, changefreq: "monthly" },
  { path: "/doctors/ugurcan-keskin", priority: 0.7, changefreq: "monthly" },
  { path: "/news", priority: 0.7, changefreq: "weekly" },
  { path: "/news/eye-conditions", priority: 0.8, changefreq: "weekly" },
  { path: "/news/eye-conditions/strabismus", priority: 0.6, changefreq: "monthly" },
  { path: "/news/eye-conditions/cataract", priority: 0.6, changefreq: "monthly" },
  { path: "/news/eye-conditions/conjunctivitis", priority: 0.6, changefreq: "monthly" },
  { path: "/news/eye-conditions/diabetic-retinopathy", priority: 0.6, changefreq: "monthly" },
  { path: "/news/eye-conditions/dry-eye", priority: 0.6, changefreq: "monthly" },
  { path: "/news/eye-conditions/glaucoma", priority: 0.6, changefreq: "monthly" },
  { path: "/news/eye-conditions/keratoconus", priority: 0.6, changefreq: "monthly" },
  { path: "/news/eye-conditions/low-vision", priority: 0.6, changefreq: "monthly" },
  { path: "/news/eye-conditions/retina-detachment", priority: 0.6, changefreq: "monthly" },
  { path: "/news/eye-conditions/retinal-vein-occlusion", priority: 0.6, changefreq: "monthly" },
  { path: "/news/eye-conditions/tear-duct-obstruction", priority: 0.6, changefreq: "monthly" },
  { path: "/news/eye-conditions/uveitis", priority: 0.6, changefreq: "monthly" },
  { path: "/news/gallery", priority: 0.5, changefreq: "monthly" },
  { path: "/contact", priority: 0.8, changefreq: "monthly" },
  { path: "/appointment", priority: 0.9, changefreq: "weekly" },
];

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
