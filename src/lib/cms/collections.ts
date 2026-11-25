import type { Collection, Field, SettingGroup } from "./types";

// ---------------------------------------------------------------
// International Eye Hospital — what the admin can manage.
// Each collection maps to a Supabase table (see supabase/migrations).
// ---------------------------------------------------------------

export const SITE_ADMIN = {
  name: "International Eye Hospital",
  short: "Eye Hospital",
  logo: "/Eye Favicon.png",
  accent: "#e62d26",
  accentDark: "#c4201a",
  sidebar: "#1a2a6c",
};

const publish: Field = {
  name: "is_published",
  label: "Published",
  type: "boolean",
  help: "Unpublished items are hidden from the website.",
  defaultValue: true,
  half: true,
};

const order: Field = {
  name: "sort_order",
  label: "Display order",
  type: "number",
  help: "Lower numbers appear first.",
  defaultValue: 0,
  half: true,
};

const seo: Field[] = [
  { name: "seo_title", label: "SEO title", type: "text", help: "Browser tab / Google title. Leave empty to use the name.", half: true },
  { name: "seo_description", label: "SEO description", type: "textarea", rows: 2, help: "Shown in Google search results (about 150 characters)." },
];

export const COLLECTIONS: Collection[] = [
  {
    key: "hero-slides",
    table: "hero_slides",
    label: "Hero Slider",
    singular: "Slide",
    icon: "Clapperboard",
    description: "Posters and adverts in the large slider at the top of the home page.",
    titleField: "alt",
    imageField: "image_url",
    columns: [
      { name: "link_url", label: "Links to" },
      { name: "sort_order", label: "Order" },
    ],
    orderBy: [{ column: "sort_order", ascending: true }],
    searchFields: ["alt", "link_url"],
    fields: [
      { name: "image_url", label: "Slide image", type: "image", required: true, help: "Wide landscape poster (about 1920 × 1080). The whole image is shown full-width." },
      { name: "alt", label: "Description", type: "text", required: true, help: "Describe the poster’s text for Google and screen readers, e.g. “Glaucoma awareness — call 0784 104 300”." },
      { name: "link_url", label: "Link (optional)", type: "url", help: "Where a click on the slide goes, e.g. /services/glaucoma or https://…" },
      order,
      publish,
    ],
  },
  {
    key: "blog-posts",
    table: "blog_posts",
    label: "Blog Posts",
    singular: "Blog post",
    icon: "Newspaper",
    description: "Articles on /news/blog, the News page and the home page.",
    titleField: "title",
    subtitleField: "excerpt",
    imageField: "image_url",
    columns: [
      { name: "category", label: "Category" },
      { name: "published_date", label: "Date", kind: "date" },
    ],
    orderBy: [{ column: "published_date", ascending: false }],
    viewPath: "/news/blog/{slug}",
    searchFields: ["title", "category", "excerpt"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "URL slug", type: "slug", from: "title", required: true, help: "Used in the address: /news/blog/your-slug" },
      { name: "category", label: "Category", type: "select", allowCustom: true, half: true, options: ["Eye Health Tips", "Eye Conditions", "Hospital News", "Careers", "Events"] },
      { name: "published_date", label: "Publish date", type: "date", half: true, help: "Newest posts are shown first." },
      { name: "read_time", label: "Read time", type: "text", half: true, placeholder: "3 min read" },
      { name: "image_url", label: "Cover image", type: "image", required: true },
      { name: "excerpt", label: "Summary", type: "textarea", rows: 3, required: true, help: "Shown on cards and at the top of the article." },
      { name: "content", label: "Article body", type: "markdown", rows: 18 },
      publish,
    ],
  },
  {
    key: "eye-conditions",
    table: "eye_conditions",
    label: "Eye Conditions",
    singular: "Eye condition",
    icon: "Eye",
    description: "The Knowledge Center at /news/eye-conditions (English + Swahili).",
    titleField: "name",
    subtitleField: "short_desc",
    columns: [{ name: "sort_order", label: "Order" }],
    orderBy: [{ column: "sort_order", ascending: true }],
    viewPath: "/news/eye-conditions/{slug}",
    searchFields: ["name", "short_desc", "slug"],
    fields: [
      { name: "name", label: "Condition name", type: "text", required: true },
      { name: "slug", label: "URL slug", type: "slug", from: "name", required: true },
      { name: "short_desc", label: "Short description", type: "textarea", rows: 2, required: true },
      { name: "overview", label: "Overview (English)", type: "textarea", rows: 5, required: true },
      { name: "symptoms", label: "Symptoms (English)", type: "list", half: true },
      { name: "causes", label: "Causes (English)", type: "list", half: true },
      { name: "treatments", label: "Treatments (English)", type: "list" },
      { name: "when_to_see_doctor", label: "When to see a doctor (English)", type: "textarea", rows: 3, required: true },
      { name: "swahili_overview", label: "Muhtasari — Overview (Swahili)", type: "textarea", rows: 5 },
      { name: "swahili_symptoms", label: "Dalili — Symptoms (Swahili)", type: "list", half: true },
      { name: "swahili_causes", label: "Visababishi — Causes (Swahili)", type: "list", half: true },
      { name: "swahili_treatments", label: "Matibabu — Treatments (Swahili)", type: "list" },
      { name: "swahili_when_to_see_doctor", label: "Wakati wa kuona daktari (Swahili)", type: "textarea", rows: 3 },
      order,
      publish,
    ],
  },
  {
    key: "doctors",
    table: "doctors",
    label: "Doctors",
    singular: "Doctor",
    icon: "Stethoscope",
    description: "Profiles on /doctors, each doctor’s page and the home page.",
    titleField: "name",
    subtitleField: "title",
    imageField: "image_url",
    columns: [
      { name: "experience", label: "Experience" },
      { name: "sort_order", label: "Order" },
    ],
    orderBy: [{ column: "sort_order", ascending: true }],
    viewPath: "/doctors/{slug}",
    searchFields: ["name", "title", "specialization"],
    fields: [
      { name: "name", label: "Full name", type: "text", required: true },
      { name: "slug", label: "URL slug", type: "slug", from: "name", required: true, help: "Profile address: /doctors/your-slug" },
      { name: "title", label: "Title", type: "text", required: true, placeholder: "Consultant Ophthalmologist / Eye Surgeon" },
      { name: "image_url", label: "Photo", type: "image", required: true },
      { name: "image_position", label: "Photo crop", type: "select", options: ["top", "center"], required: true, half: true, defaultValue: "top", help: "Which part of the photo stays visible on cards." },
      { name: "experience", label: "Years of experience", type: "text", half: true, placeholder: "10+" },
      { name: "short_bio", label: "Short bio (home page)", type: "textarea", rows: 3 },
      { name: "bio", label: "Bio (doctors page)", type: "textarea", rows: 4 },
      { name: "specialties", label: "Specialty tags", type: "list", help: "Shown as tags on the doctor cards." },
      { name: "education", label: "Education (card)", type: "text", half: true },
      { name: "membership", label: "Memberships (card)", type: "text", half: true },
      { name: "birth_place", label: "Place of birth", type: "text", half: true },
      { name: "languages", label: "Languages", type: "text", half: true, placeholder: "English, Swahili" },
      { name: "training", label: "Training", type: "textarea", rows: 3 },
      { name: "specialization", label: "Specialization", type: "text" },
      { name: "profession", label: "Areas of practice", type: "textarea", rows: 2 },
      { name: "associations", label: "Professional associations", type: "list" },
      { name: "additional_info", label: "Additional information", type: "textarea", rows: 4 },
      ...seo,
      order,
      publish,
    ],
  },
  {
    key: "services",
    table: "services",
    label: "Services",
    singular: "Service",
    icon: "HeartPulse",
    description: "Service pages (/services/…) and the cards on the Services page.",
    titleField: "title",
    subtitleField: "subtitle",
    imageField: "image_url",
    columns: [
      { name: "category", label: "Category" },
      { name: "sort_order", label: "Order" },
    ],
    orderBy: [{ column: "sort_order", ascending: true }],
    viewPath: "/services/{slug}",
    searchFields: ["title", "subtitle", "category", "slug"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "URL slug", type: "slug", from: "title", required: true, help: "Page address: /services/your-slug" },
      { name: "subtitle", label: "Subtitle", type: "text", help: "One line under the page title." },
      { name: "image_url", label: "Page image", type: "image" },
      { name: "content", label: "Page text", type: "markdown", rows: 14, help: "Separate paragraphs with a blank line. Start a line with * or - for bullet points." },
      { name: "phone", label: "Contact phone on this page", type: "text", half: true, defaultValue: "+255 725 829 595" },
      { name: "show_in_list", label: "Show a card on the Services page", type: "boolean", defaultValue: true },
      { name: "category", label: "Card category", type: "select", options: ["Surgery", "Medical", "Specialist", "Diagnostics", "General"], allowCustom: true, half: true },
      { name: "card_image_url", label: "Card image", type: "image", help: "Leave empty to use the page image." },
      { name: "short_desc", label: "Card description", type: "textarea", rows: 2 },
      { name: "link_url", label: "Card links to (optional)", type: "url", help: "Only for cards that should open a different page (e.g. /services/eye-tests). Such entries have no page of their own." },
      ...seo,
      order,
      publish,
    ],
  },
  {
    key: "gallery",
    table: "gallery_images",
    label: "Gallery",
    singular: "Photo",
    icon: "Images",
    description: "Photos on /news/gallery and the home page gallery.",
    titleField: "alt",
    subtitleField: "category",
    imageField: "image_url",
    columns: [
      { name: "show_on_home", label: "On home page" },
      { name: "sort_order", label: "Order" },
    ],
    orderBy: [{ column: "sort_order", ascending: true }],
    searchFields: ["alt", "category"],
    fields: [
      { name: "image_url", label: "Photo", type: "image", required: true },
      { name: "alt", label: "Caption", type: "text", required: true },
      { name: "category", label: "Category", type: "select", options: ["Examination", "Eye Tests", "Surgery", "Clinical", "Diagnostics", "Our Team", "Events"], allowCustom: true, half: true },
      { name: "show_on_home", label: "Show on the home page", type: "boolean" },
      { name: "home_span", label: "Home page tile size", type: "select", options: ["wide", "tall", "large"], half: true, help: "Empty = normal square tile." },
      order,
      publish,
    ],
  },
  {
    key: "testimonials",
    table: "testimonials",
    label: "Testimonials",
    singular: "Testimonial",
    icon: "Quote",
    description: "“What Our Patients Say” on the home page.",
    titleField: "name",
    subtitleField: "text",
    columns: [
      { name: "procedure", label: "Procedure" },
      { name: "rating", label: "Rating" },
    ],
    orderBy: [{ column: "sort_order", ascending: true }],
    searchFields: ["name", "location", "procedure", "text"],
    fields: [
      { name: "name", label: "Patient name", type: "text", required: true, half: true },
      { name: "location", label: "Location", type: "text", half: true, placeholder: "Dar es Salaam" },
      { name: "procedure", label: "Treatment / procedure", type: "text", half: true },
      { name: "rating", label: "Rating", type: "rating", half: true, defaultValue: 5 },
      { name: "text", label: "Testimonial", type: "textarea", rows: 5, required: true },
      { name: "color", label: "Avatar colour", type: "select", options: ["#e62d26", "#1a2a6c", "#1a6c3a", "#1a5a6c", "#6c1a5a", "#6c3a1a"], half: true, defaultValue: "#e62d26" },
      order,
      publish,
    ],
  },
];

export function getCollection(key: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.key === key);
}

/**
 * Built-in Google tag IDs (from the clinic's "IEH- Google Tag" document).
 * A value saved in Admin → Settings wins — saving it empty switches the tag off.
 */
export const GOOGLE_TAG_DEFAULTS = { gtm_container_id: "GTM-WM5XXLLL", ga4_measurement_id: "", google_ads_id: "" };

// ---------------------------------------------------------------
// Site settings (key/value). Google tag IDs are validated so nothing
// but a real ID can ever be injected into the page <head>.
// ---------------------------------------------------------------
export const SETTING_GROUPS: SettingGroup[] = [
  {
    title: "Contact details",
    description: "Shown in the website footer.",
    fields: [
      { key: "site_name", label: "Hospital name", placeholder: "International Eye Hospital" },
      { key: "site_phone", label: "Phone", placeholder: "+255 725 829 595" },
      { key: "site_email", label: "Email", placeholder: "info@eye.co.tz" },
      { key: "site_address", label: "Address", type: "textarea" },
      { key: "working_hours_weekday", label: "Hours — Monday to Friday", placeholder: "8:30 AM – 5:30 PM" },
      { key: "working_hours_saturday", label: "Hours — Saturday", placeholder: "8:30 AM – 2:00 PM" },
      { key: "working_hours_sunday", label: "Hours — Sunday", placeholder: "Closed" },
    ],
  },
  {
    title: "Google tags",
    description:
      "Paste your IDs and save — the tags load on every public page. Leave a field empty to switch that tag off.",
    fields: [
      {
        key: "ga4_measurement_id",
        label: "Google Analytics 4 — Measurement ID",
        placeholder: "G-XXXXXXXXXX",
        pattern: "^G-[A-Z0-9]{4,20}$",
        patternHint: "Starts with G- (find it in GA4 → Admin → Data streams).",
      },
      {
        key: "gtm_container_id",
        label: "Google Tag Manager — Container ID",
        placeholder: "GTM-XXXXXXX",
        pattern: "^GTM-[A-Z0-9]{4,12}$",
        patternHint: "Starts with GTM- (shown at the top of Tag Manager).",
      },
      {
        key: "google_ads_id",
        label: "Google Ads — Conversion ID",
        placeholder: "AW-XXXXXXXXXX",
        pattern: "^AW-[0-9]{6,15}$",
        patternHint: "Starts with AW- (Google Ads → Tools → Google tag).",
      },
      {
        key: "google_site_verification",
        label: "Google Search Console — verification code",
        placeholder: "abc123…",
        pattern: "^[A-Za-z0-9_-]{10,100}$",
        patternHint: "Only the content value of the HTML-tag verification method.",
      },
    ],
  },
  {
    title: "Social links",
    description: "Icons in the website footer. Leave empty to hide one.",
    fields: [
      { key: "instagram_url", label: "Instagram", type: "url", placeholder: "https://instagram.com/…" },
      { key: "facebook_url", label: "Facebook", type: "url", placeholder: "https://facebook.com/…" },
      { key: "x_url", label: "X (Twitter)", type: "url", placeholder: "https://x.com/…" },
      { key: "youtube_url", label: "YouTube", type: "url", placeholder: "https://youtube.com/@…" },
    ],
  },
];

export const ALL_SETTING_FIELDS = SETTING_GROUPS.flatMap((g) => g.fields);
