import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cornea Transplant | International Eye Hospital",
  description: "Cornea transplant surgery to replace damaged cornea with healthy donor tissue. Performed under general or local anesthetic.",
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
    canonical: "https://www.internationaleyehospital.com/services/cornea",
  },
};

export default function CorneaPage() {
  const service = getServiceBySlug("cornea");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
