import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visual Field Test | International Eye Hospital",
  description: "Comprehensive peripheral and central vision mapping for glaucoma monitoring, retinal disease detection, and neurological assessment.",
};

export default function VisualFieldPage() {
  const service = getServiceBySlug("visual-field");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
