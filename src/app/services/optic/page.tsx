import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Optic Department | International Eye Hospital",
  description: "Premium eyewear and precision optical solutions. Frames from Vague, Adidas, Polo and more. Same-day glasses delivery when lenses are in stock.",
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
    canonical: "https://www.internationaleyehospital.com/services/optic",
  },
};

export default function OpticPage() {
  const service = getServiceBySlug("optic");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
