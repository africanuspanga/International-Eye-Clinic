// Central SEO configuration for International Eye Hospital
export const siteConfig = {
  name: "International Eye Hospital",
  shortName: "IEH",
  url: "https://www.internationaleyehospital.com",
  locale: "en_TZ",
  language: "en",
  country: "TZ",
  phone: "+255 784 104 300",
  email: "info@eye.co.tz",
  address: {
    street: "Tropical Center, New Bagamoyo Road",
    city: "Dar es Salaam",
    region: "Dar es Salaam",
    postalCode: "2083",
    country: "Tanzania",
  },
  geo: {
    latitude: "-6.7630",
    longitude: "39.2695",
  },
  social: {
    facebook: "https://www.facebook.com/IEH.TZ",
    instagram: "https://www.instagram.com/internationaleyehospital/",
    twitter: "https://twitter.com/IEH_tz",
  },
  founded: "2014",
  defaultOgImage: "/images/hero/slide-1.jpeg",
  ogImageAlt: "International Eye Hospital - Advanced eye care in Dar es Salaam, Tanzania",
} as const;

export type PageMetadata = {
  title: string;
  description: string;
  ogImage?: string;
  ogImageAlt?: string;
  canonical: string;
  noindex?: boolean;
};

export function buildMetadata(page: PageMetadata) {
  return {
    title: page.title,
    description: page.description,
    ...(page.noindex
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {}),
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteConfig.url}${page.canonical}`,
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      images: page.ogImage
        ? [
            {
              url: page.ogImage,
              alt: page.ogImageAlt || siteConfig.ogImageAlt,
              width: 1200,
              height: 630,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: page.title,
      description: page.description,
      images: page.ogImage
        ? [
            {
              url: page.ogImage,
              alt: page.ogImageAlt || siteConfig.ogImageAlt,
            },
          ]
        : undefined,
    },
    alternates: {
      canonical: `${siteConfig.url}${page.canonical}`,
    },
  };
}
