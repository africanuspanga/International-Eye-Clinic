import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visual Field Test | International Eye Hospital",
  description: "Comprehensive peripheral and central vision mapping for glaucoma monitoring, retinal disease detection, and neurological assessment.",
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
    canonical: "https://www.internationaleyehospital.com/services/visual-field",
  },
};

export default function VisualFieldPage() {
  const service = getServiceBySlug("visual-field");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
