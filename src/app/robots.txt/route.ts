import { NextResponse } from "next/server";

export async function GET() {
  const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /login
Disallow: /api/
Disallow: /*?*

Sitemap: https://www.internationaleyehospital.com/sitemap.xml

# Crawl-delay: 10
`;

  return new NextResponse(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
