import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Argon Laser Trabeculoplasty (ALT) | International Eye Hospital",
  description: "Laser treatment to lower eye pressure in open-angle glaucoma. Outpatient procedure at International Eye Hospital.",
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
    canonical: "https://www.internationaleyehospital.com/services/argon-laser",
  },
};

export default function ArgonLaserPage() {
  const service = getServiceBySlug("argon-laser");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
