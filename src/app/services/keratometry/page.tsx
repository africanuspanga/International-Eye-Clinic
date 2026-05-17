import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keratometry | International Eye Hospital",
  description: "Accurate corneal curvature measurement for astigmatism assessment, contact lens fitting, and cataract surgery planning.",
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
    canonical: "https://www.internationaleyehospital.com/services/keratometry",
  },
};

export default function KeratometryPage() {
  const service = getServiceBySlug("keratometry");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
