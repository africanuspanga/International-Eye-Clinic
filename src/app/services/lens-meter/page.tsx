import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lens Meter | International Eye Hospital",
  description: "Accurate verification and measurement of eyeglass lenses to ensure your prescription is manufactured correctly.",
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
    canonical: "https://www.internationaleyehospital.com/services/lens-meter",
  },
};

export default function LensMeterPage() {
  const service = getServiceBySlug("lens-meter");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
