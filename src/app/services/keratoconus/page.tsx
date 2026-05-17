import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keratoconus Crosslinking | International Eye Hospital",
  description: "Specialized keratoconus treatment including glasses, contact lenses, Intacs, cross-linking therapy, and cornea transplant when needed.",
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
    canonical: "https://www.internationaleyehospital.com/services/keratoconus",
  },
};

export default function KeratoconusPage() {
  const service = getServiceBySlug("keratoconus");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
