import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";
import { blogPosts as STATIC_POSTS } from "@/lib/blog-data";
import { doctors as STATIC_DOCTORS, type Doctor } from "@/lib/doctors-data";
import { servicesDetail as STATIC_SERVICES, type ServiceDetail } from "@/lib/services-data";
import { eyeConditions as STATIC_CONDITIONS, type EyeCondition } from "@/lib/eye-conditions-data";
import {
  DOCTOR_CARDS,
  GALLERY_IMAGES,
  HERO_SLIDES,
  HOME_DOCTOR_CARDS,
  HOME_GALLERY,
  SEO_OVERRIDES,
  SERVICE_CARDS,
  TESTIMONIALS,
} from "@/lib/site-content";
import { formatPostDate, sectionsToMarkdown, toIsoDate } from "./legacy";

// ---------------------------------------------------------------
// Public content, read from Supabase (published rows only).
// The built-in data in src/lib is the fallback if the database
// can't be reached, so the site never goes blank.
// ---------------------------------------------------------------

type Row = Record<string, unknown>;
const s = (v: unknown) => (typeof v === "string" ? v : v == null ? "" : String(v));
const arr = (v: unknown) => (Array.isArray(v) ? v.map(String).filter(Boolean) : []);

async function readTable<T>(
  table: string,
  order: [string, boolean][],
  map: (row: Row) => T,
  fallback: () => T[]
): Promise<T[]> {
  try {
    let query = createPublicClient().from(table).select("*").eq("is_published", true);
    for (const [column, ascending] of order) query = query.order(column, { ascending });
    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []).map(map);
  } catch (error) {
    console.error(`[cms] could not load "${table}", using built-in content:`, (error as Error).message);
    return fallback();
  }
}

const initials = (name: string) =>
  name
    .replace(/^(dr|prof)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

// ---------- hero ----------
export type HeroSlide = { src: string; alt: string; href?: string };

export const getHeroSlides = cache(async () => {
  const slides = await readTable<HeroSlide>(
    "hero_slides",
    [["sort_order", true]],
    (r) => ({ src: s(r.image_url), alt: s(r.alt), href: s(r.link_url) || undefined }),
    () => HERO_SLIDES
  );
  const usable = slides.filter((slide) => slide.src);
  return usable.length ? usable : HERO_SLIDES;
});

// ---------- blog ----------
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  isoDate: string;
  image: string;
  content: string;
};

export const getPosts = cache(() =>
  readTable<Post>(
    "blog_posts",
    [["published_date", false], ["created_at", false]],
    (r) => ({
      slug: s(r.slug),
      title: s(r.title),
      excerpt: s(r.excerpt),
      category: s(r.category),
      readTime: s(r.read_time),
      date: formatPostDate(s(r.published_date)),
      isoDate: s(r.published_date),
      image: s(r.image_url),
      content: s(r.content),
    }),
    () =>
      STATIC_POSTS.map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        category: p.category,
        readTime: p.readTime,
        date: p.date,
        isoDate: toIsoDate(p.date),
        image: p.image,
        content: sectionsToMarkdown(p.content),
      }))
  )
);

export const getPost = cache(async (slug: string) => (await getPosts()).find((p) => p.slug === slug));

// ---------- eye conditions ----------
export const getConditions = cache(() =>
  readTable<EyeCondition>(
    "eye_conditions",
    [["sort_order", true], ["name", true]],
    (r) => ({
      slug: s(r.slug),
      name: s(r.name),
      shortDesc: s(r.short_desc),
      overview: s(r.overview),
      symptoms: arr(r.symptoms),
      causes: arr(r.causes),
      treatments: arr(r.treatments),
      whenToSeeDoctor: s(r.when_to_see_doctor),
      swahili: {
        overview: s(r.swahili_overview),
        symptoms: arr(r.swahili_symptoms),
        causes: arr(r.swahili_causes),
        treatments: arr(r.swahili_treatments),
        whenToSeeDoctor: s(r.swahili_when_to_see_doctor),
      },
    }),
    () => STATIC_CONDITIONS
  )
);

export const getCondition = cache(async (slug: string) => (await getConditions()).find((c) => c.slug === slug));

// ---------- doctors ----------
export type DoctorProfile = Doctor & {
  shortBio: string;
  bio: string;
  specialties: string[];
  experience: string;
  education: string;
  membership: string;
  imagePosition: "top" | "center";
  seoTitle: string;
  seoDescription: string;
};

function staticDoctors(): DoctorProfile[] {
  return STATIC_DOCTORS.map((d) => {
    const home = HOME_DOCTOR_CARDS.find((c) => c.href === `/doctors/${d.slug}`);
    const card = DOCTOR_CARDS.find((c) => c.href === `/doctors/${d.slug}`) ?? home;
    return {
      ...d,
      shortBio: home?.bio ?? "",
      bio: card?.bio ?? "",
      specialties: card?.specialty ?? [],
      experience: card?.experience ?? "",
      education: card?.education ?? "",
      membership: card?.membership ?? "",
      imagePosition: d.slug === "harley-mkini" ? "center" : "top",
      seoTitle: SEO_OVERRIDES[`doctors/${d.slug}`]?.title ?? "",
      seoDescription: SEO_OVERRIDES[`doctors/${d.slug}`]?.description ?? "",
    };
  });
}

export const getDoctors = cache(() =>
  readTable<DoctorProfile>(
    "doctors",
    [["sort_order", true], ["name", true]],
    (r) => ({
      slug: s(r.slug),
      name: s(r.name),
      title: s(r.title),
      image: s(r.image_url),
      birthPlace: s(r.birth_place),
      training: s(r.training),
      specialization: s(r.specialization),
      profession: s(r.profession),
      languages: s(r.languages),
      associations: arr(r.associations),
      additionalInfo: s(r.additional_info),
      sortOrder: Number(r.sort_order) || 0,
      shortBio: s(r.short_bio),
      bio: s(r.bio),
      specialties: arr(r.specialties),
      experience: s(r.experience),
      education: s(r.education),
      membership: s(r.membership),
      imagePosition: s(r.image_position) === "center" ? "center" : "top",
      seoTitle: s(r.seo_title),
      seoDescription: s(r.seo_description),
    }),
    staticDoctors
  )
);

export const getDoctor = cache(async (slug: string) => (await getDoctors()).find((d) => d.slug === slug));

// ---------- services ----------
export type Service = ServiceDetail & {
  showInList: boolean;
  cardImage: string;
  shortDesc: string;
  category: string;
  linkUrl: string;
  seoTitle: string;
  seoDescription: string;
};

function staticServices(): Service[] {
  const pages: Service[] = STATIC_SERVICES.map((svc) => {
    const card = SERVICE_CARDS.find((c) => c.href === `/services/${svc.slug}`);
    return {
      ...svc,
      showInList: Boolean(card),
      cardImage: card?.image ?? "",
      shortDesc: card?.desc ?? "",
      category: card?.category ?? "Diagnostics",
      linkUrl: "",
      seoTitle: SEO_OVERRIDES[`services/${svc.slug}`]?.title ?? "",
      seoDescription: SEO_OVERRIDES[`services/${svc.slug}`]?.description ?? "",
    };
  });
  const linkOnly: Service[] = SERVICE_CARDS.filter(
    (c) => !STATIC_SERVICES.some((svc) => c.href === `/services/${svc.slug}`)
  ).map((c) => ({
    slug: c.href.split("/").pop() + "-card",
    title: c.title,
    subtitle: "",
    image: c.image,
    content: "",
    phone: "",
    showInList: true,
    cardImage: c.image,
    shortDesc: c.desc,
    category: c.category,
    linkUrl: c.href,
    seoTitle: "",
    seoDescription: "",
  }));
  return [...pages, ...linkOnly];
}

export const getServices = cache(() =>
  readTable<Service>(
    "services",
    [["sort_order", true], ["title", true]],
    (r) => ({
      slug: s(r.slug),
      title: s(r.title),
      subtitle: s(r.subtitle),
      image: s(r.image_url),
      content: s(r.content),
      phone: s(r.phone) || "+255 725 829 595",
      showInList: r.show_in_list !== false,
      cardImage: s(r.card_image_url),
      shortDesc: s(r.short_desc),
      category: s(r.category),
      linkUrl: s(r.link_url),
      seoTitle: s(r.seo_title),
      seoDescription: s(r.seo_description),
    }),
    staticServices
  )
);

/** Services that have their own /services/[slug] page. */
export const getServicePages = cache(async () => (await getServices()).filter((svc) => !svc.linkUrl));

export const getService = cache(async (slug: string) => (await getServicePages()).find((svc) => svc.slug === slug));

/** Cards for the /services page, in display order. */
export const getServiceCards = cache(async () =>
  (await getServices())
    .filter((svc) => svc.showInList)
    .map((svc) => ({
      title: svc.title,
      href: svc.linkUrl || `/services/${svc.slug}`,
      image: svc.cardImage || svc.image,
      desc: svc.shortDesc || svc.subtitle,
      category: svc.category,
    }))
);

// ---------- gallery ----------
export type GalleryPhoto = { src: string; alt: string; category: string; showOnHome: boolean; span: string };

const SPAN_CLASS: Record<string, string> = {
  large: "col-span-2 row-span-2",
  wide: "col-span-2",
  tall: "row-span-2",
};

export const spanClass = (span: string) => SPAN_CLASS[span] ?? "";

function staticGallery(): GalleryPhoto[] {
  const spanName = (cls?: string) =>
    Object.entries(SPAN_CLASS).find(([, c]) => c === cls)?.[0] ?? "";
  const home = HOME_GALLERY.map((img) => ({
    src: img.src,
    alt: img.alt,
    category: GALLERY_IMAGES.find((g) => g.src === img.src)?.category ?? "Clinical",
    showOnHome: true,
    span: spanName(img.span),
  }));
  const rest = GALLERY_IMAGES.filter((g) => !HOME_GALLERY.some((h) => h.src === g.src)).map((img) => ({
    src: img.src,
    alt: img.alt,
    category: img.category ?? "Clinical",
    showOnHome: false,
    span: "",
  }));
  return [...home, ...rest];
}

export const getGallery = cache(() =>
  readTable<GalleryPhoto>(
    "gallery_images",
    [["sort_order", true]],
    (r) => ({
      src: s(r.image_url),
      alt: s(r.alt),
      category: s(r.category) || "Clinical",
      showOnHome: r.show_on_home === true,
      span: s(r.home_span),
    }),
    staticGallery
  )
);

// ---------- testimonials ----------
export type PatientTestimonial = {
  name: string;
  location: string;
  procedure: string;
  rating: number;
  initials: string;
  color: string;
  text: string;
};

export const getTestimonials = cache(() =>
  readTable<PatientTestimonial>(
    "testimonials",
    [["sort_order", true]],
    (r) => ({
      name: s(r.name),
      location: s(r.location),
      procedure: s(r.procedure),
      rating: Math.min(5, Math.max(1, Number(r.rating) || 5)),
      initials: initials(s(r.name)),
      color: /^#[0-9a-f]{6}$/i.test(s(r.color)) ? s(r.color) : "#e62d26",
      text: s(r.text),
    }),
    () => TESTIMONIALS
  )
);

// ---------- settings ----------
export const getSettings = cache(async (): Promise<Record<string, string>> => {
  try {
    const { data, error } = await createPublicClient().from("site_settings").select("key, value");
    if (error) throw error;
    return Object.fromEntries((data ?? []).map((r) => [r.key, r.value ?? ""]));
  } catch (error) {
    console.error("[cms] could not load settings:", (error as Error).message);
    return {};
  }
});

export const getContact = cache(async () => {
  const settings = await getSettings();
  const pick = (key: string, fallback: string) => settings[key]?.trim() || fallback;
  return {
    name: pick("site_name", "International Eye Hospital"),
    phone: pick("site_phone", "+255 725 829 595"),
    email: pick("site_email", "info@eye.co.tz"),
    address: pick("site_address", "Tropical Center, New Bagamoyo Road,\nP.O. Box 2083, Dar es Salaam, Tanzania"),
    hoursWeekday: pick("working_hours_weekday", "8:30 AM – 5:30 PM"),
    hoursSaturday: pick("working_hours_saturday", "8:30 AM – 2:00 PM"),
    hoursSunday: pick("working_hours_sunday", "Closed"),
    // undefined = never set (use the built-in link); "" = removed in the admin.
    instagram: settings.instagram_url?.trim(),
    facebook: settings.facebook_url?.trim(),
    x: settings.x_url?.trim(),
    youtube: settings.youtube_url?.trim(),
  };
});
