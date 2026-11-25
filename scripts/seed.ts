// Copies the website's built-in content into Supabase so the admin starts with
// everything that is on the site today. Safe to re-run: existing rows are never
// overwritten (matched by slug, or skipped if the table already has rows), so
// edits made in the admin are kept.
//
//   node --experimental-strip-types --no-warnings --env-file=.env.local scripts/seed.ts

import { createClient } from "@supabase/supabase-js";
import { blogPosts } from "../src/lib/blog-data.ts";
import { doctors } from "../src/lib/doctors-data.ts";
import { servicesDetail } from "../src/lib/services-data.ts";
import {
  DOCTOR_CARDS,
  GALLERY_IMAGES,
  HERO_SLIDES,
  HOME_DOCTOR_CARDS,
  HOME_GALLERY,
  SEO_OVERRIDES,
  SERVICE_CARDS,
  TESTIMONIALS,
} from "../src/lib/site-content.ts";
import { sectionsToMarkdown, toIsoDate } from "../src/lib/cms/legacy.ts";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (see .env.local)");

const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

async function upsertBySlug(table: string, rows: Record<string, unknown>[]) {
  const { error, data } = await db.from(table).upsert(rows, { onConflict: "slug", ignoreDuplicates: true }).select("id");
  if (error) throw new Error(`${table}: ${error.message}`);
  console.log(`${table}: ${data?.length ?? 0} new of ${rows.length}`);
}

async function insertIfEmpty(table: string, rows: Record<string, unknown>[]) {
  const { count, error } = await db.from(table).select("id", { count: "exact", head: true });
  if (error) throw new Error(`${table}: ${error.message}`);
  if (count) return console.log(`${table}: already has ${count} rows — skipped`);
  const { error: insertError } = await db.from(table).insert(rows);
  if (insertError) throw new Error(`${table}: ${insertError.message}`);
  console.log(`${table}: inserted ${rows.length}`);
}

// ---------- hero slides ----------
await insertIfEmpty(
  "hero_slides",
  HERO_SLIDES.map((slide, i) => ({ image_url: slide.src, alt: slide.alt, link_url: slide.href ?? "", sort_order: i + 1 }))
);

// ---------- blog ----------
await upsertBySlug(
  "blog_posts",
  blogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: sectionsToMarkdown(post.content),
    category: post.category,
    image_url: post.image,
    read_time: post.readTime,
    published_date: toIsoDate(post.date),
  }))
);

// ---------- doctors ----------
await upsertBySlug(
  "doctors",
  doctors.map((d) => {
    const home = HOME_DOCTOR_CARDS.find((c) => c.href === `/doctors/${d.slug}`);
    const card = DOCTOR_CARDS.find((c) => c.href === `/doctors/${d.slug}`) ?? home;
    const seo = SEO_OVERRIDES[`doctors/${d.slug}`];
    return {
      slug: d.slug,
      name: d.name,
      title: d.title,
      image_url: d.image,
      image_position: d.slug === "harley-mkini" ? "center" : "top",
      short_bio: home?.bio ?? "",
      bio: card?.bio ?? "",
      specialties: card?.specialty ?? [],
      experience: card?.experience ?? "",
      education: card?.education ?? "",
      membership: card?.membership ?? "",
      birth_place: d.birthPlace,
      training: d.training,
      specialization: d.specialization,
      profession: d.profession,
      languages: d.languages,
      associations: d.associations,
      additional_info: d.additionalInfo,
      seo_title: seo?.title ?? "",
      seo_description: seo?.description ?? "",
      sort_order: d.sortOrder,
    };
  })
);

// ---------- services ----------
// Cards on /services keep their current order; pages without a card follow.
const cardIndex = (href: string) => SERVICE_CARDS.findIndex((c) => c.href === href);
const servicePages = servicesDetail.map((svc, i) => {
  const idx = cardIndex(`/services/${svc.slug}`);
  const card = idx >= 0 ? SERVICE_CARDS[idx] : undefined;
  const seo = SEO_OVERRIDES[`services/${svc.slug}`];
  return {
    slug: svc.slug,
    title: svc.title,
    subtitle: svc.subtitle,
    image_url: svc.image,
    content: svc.content,
    phone: svc.phone,
    show_in_list: Boolean(card),
    card_image_url: card?.image ?? "",
    short_desc: card?.desc ?? "",
    category: card?.category ?? "Diagnostics",
    link_url: "",
    seo_title: seo?.title ?? "",
    seo_description: seo?.description ?? "",
    sort_order: idx >= 0 ? idx + 1 : 100 + i,
  };
});
// Cards that open a hand-built page (e.g. /services/eye-tests) instead of a CMS page.
const linkOnlyCards = SERVICE_CARDS.filter((c) => !servicesDetail.some((svc) => c.href === `/services/${svc.slug}`)).map((c) => ({
  slug: `${c.href.split("/").pop()}-card`,
  title: c.title,
  subtitle: "",
  image_url: c.image,
  content: "",
  phone: "+255 725 829 595",
  show_in_list: true,
  card_image_url: c.image,
  short_desc: c.desc,
  category: c.category,
  link_url: c.href,
  seo_title: "",
  seo_description: "",
  sort_order: cardIndex(c.href) + 1,
}));
await upsertBySlug("services", [...servicePages, ...linkOnlyCards]);

// ---------- gallery ----------
const SPANS: Record<string, string> = { "col-span-2 row-span-2": "large", "col-span-2": "wide", "row-span-2": "tall" };
const gallery = [
  ...HOME_GALLERY.map((img) => ({
    image_url: img.src,
    alt: img.alt,
    category: GALLERY_IMAGES.find((g) => g.src === img.src)?.category ?? "Clinical",
    show_on_home: true,
    home_span: img.span ? SPANS[img.span] ?? "" : "",
  })),
  ...GALLERY_IMAGES.filter((g) => !HOME_GALLERY.some((h) => h.src === g.src)).map((img) => ({
    image_url: img.src,
    alt: img.alt,
    category: img.category ?? "Clinical",
    show_on_home: false,
    home_span: "",
  })),
].map((row, i) => ({ ...row, sort_order: i + 1 }));
await insertIfEmpty("gallery_images", gallery);

// ---------- testimonials ----------
await insertIfEmpty(
  "testimonials",
  TESTIMONIALS.map((t, i) => ({
    name: t.name,
    location: t.location,
    procedure: t.procedure,
    rating: t.rating,
    text: t.text,
    color: t.color,
    sort_order: i + 1,
  }))
);

// ---------- settings (only adds keys that don't exist yet) ----------
const settings: Record<string, string> = {
  instagram_url: "https://www.instagram.com/ieh_tz?igsh=MTF3aHZya3Q0bnVoZA%3D%3D&utm_source=qr",
  facebook_url: "https://www.facebook.com/IEH.TZ/",
  x_url: "https://x.com/IEH_tz",
  gtm_container_id: "GTM-WM5XXLLL",
};
const { error } = await db
  .from("site_settings")
  .upsert(Object.entries(settings).map(([k, value]) => ({ key: k, value })), { onConflict: "key", ignoreDuplicates: true });
if (error) throw new Error(`site_settings: ${error.message}`);
console.log("site_settings: defaults ensured");
