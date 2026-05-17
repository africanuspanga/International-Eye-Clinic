import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YAG Laser | International Eye Hospital",
  description: "Quick, painless YAG laser capsulotomy to restore clear vision after cataract surgery. Treat posterior capsule opacification safely.",
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
    canonical: "https://www.internationaleyehospital.com/services/yag-laser",
  },
};

export default function YagLaserPage() {
  const service = getServiceBySlug("yag-laser");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
