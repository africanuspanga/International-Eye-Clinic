import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keratoconus Crosslinking | International Eye Hospital",
  description: "Specialized keratoconus treatment including glasses, contact lenses, Intacs, cross-linking therapy, and cornea transplant when needed.",
};

export default function KeratoconusPage() {
  const service = getServiceBySlug("keratoconus");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
