import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Optical Coherence Tomography (OCT) | International Eye Hospital",
  description: "Advanced OCT imaging for detailed retinal and optic nerve assessment. Non-invasive, quick, and safe diagnostic testing at International Eye Hospital.",
};

export default function OCTPage() {
  const service = getServiceBySlug("oct");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
