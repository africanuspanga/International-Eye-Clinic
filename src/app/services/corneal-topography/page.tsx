import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corneal Topography | International Eye Hospital",
  description: "Precise corneal curvature mapping for keratoconus diagnosis, LASIK planning, and contact lens fitting at International Eye Hospital.",
};

export default function CornealTopographyPage() {
  const service = getServiceBySlug("corneal-topography");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
