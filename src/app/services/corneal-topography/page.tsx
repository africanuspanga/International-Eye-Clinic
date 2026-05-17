import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corneal Topography | International Eye Hospital",
  description: "Precise corneal curvature mapping for keratoconus diagnosis, cataract surgical planning, and contact lens fitting at International Eye Hospital.",
  openGraph: {
    images: [
      {
        url: "/images/hero/slide-1.jpeg",
        width: 1200,
        height: 630,
        alt: "International Eye Hospital",
      },
    ],
  },
  alternates: {
    canonical: "https://www.internationaleyehospital.com/services/corneal-topography",
  },
};

export default function CornealTopographyPage() {
  const service = getServiceBySlug("corneal-topography");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
