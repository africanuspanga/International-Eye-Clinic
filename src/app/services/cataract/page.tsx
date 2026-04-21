import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cataract Surgery | International Eye Hospital",
  description: "Advanced cataract surgery using phacoemulsification technique. Restore clarity to your vision at International Eye Hospital.",
};

export default function CataractPage() {
  const service = getServiceBySlug("cataract");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
