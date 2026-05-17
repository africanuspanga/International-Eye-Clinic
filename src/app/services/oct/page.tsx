import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Optical Coherence Tomography (OCT) | International Eye Hospital",
  description: "Advanced OCT imaging for detailed retinal and optic nerve assessment. Non-invasive, quick, and safe diagnostic testing at International Eye Hospital.",
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
    canonical: "https://www.internationaleyehospital.com/services/oct",
  },
};

export default function OCTPage() {
  const service = getServiceBySlug("oct");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
