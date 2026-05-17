import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automated Refractor | International Eye Hospital",
  description: "Objective, computerized measurement of your eye's focusing power for precise eyeglass and contact lens prescriptions.",
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
    canonical: "https://www.internationaleyehospital.com/services/automated-refractor",
  },
};

export default function AutomatedRefractorPage() {
  const service = getServiceBySlug("automated-refractor");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
