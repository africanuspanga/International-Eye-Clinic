import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LASIK – Refractive Surgery | International Eye Hospital",
  description: "Advanced LASIK laser vision correction for myopia, hyperopia, and astigmatism. Free yourself from glasses at International Eye Hospital.",
};

export default function LasikPage() {
  const service = getServiceBySlug("lasik");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
