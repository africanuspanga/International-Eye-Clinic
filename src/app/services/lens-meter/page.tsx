import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lens Meter | International Eye Hospital",
  description: "Accurate verification and measurement of eyeglass lenses to ensure your prescription is manufactured correctly.",
};

export default function LensMeterPage() {
  const service = getServiceBySlug("lens-meter");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
