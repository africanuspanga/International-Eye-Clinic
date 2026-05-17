import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pachymetry | International Eye Hospital",
  description: "Corneal thickness measurement for glaucoma risk assessment and refractive surgery candidacy at International Eye Hospital.",
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
    canonical: "https://www.internationaleyehospital.com/services/pachymetry",
  },
};

export default function PachymetryPage() {
  const service = getServiceBySlug("pachymetry");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
