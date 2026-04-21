import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keratometry | International Eye Hospital",
  description: "Accurate corneal curvature measurement for astigmatism assessment, contact lens fitting, and cataract surgery planning.",
};

export default function KeratometryPage() {
  const service = getServiceBySlug("keratometry");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
