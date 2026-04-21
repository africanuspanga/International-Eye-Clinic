import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tonometry | International Eye Hospital",
  description: "Intraocular pressure measurement for glaucoma detection and monitoring using Goldmann, air puff, and iCare tonometry.",
};

export default function TonometryPage() {
  const service = getServiceBySlug("tonometry");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
