import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A-Scan Ultrasound Biometry | International Eye Hospital",
  description: "Precision eye length measurement for intraocular lens power calculation before cataract surgery.",
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
    canonical: "https://www.internationaleyehospital.com/services/a-scan",
  },
};

export default function AScanPage() {
  const service = getServiceBySlug("a-scan");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
