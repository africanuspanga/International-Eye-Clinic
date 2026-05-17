import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fundus Fluorescein Angiography (FFA) | International Eye Hospital",
  description: "Detailed retinal blood flow imaging using fluorescein dye. Expert FFA diagnostics for diabetic retinopathy, macular degeneration, and retinal vascular diseases.",
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
    canonical: "https://www.internationaleyehospital.com/services/ffa",
  },
};

export default function FFAPage() {
  const service = getServiceBySlug("ffa");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
