import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A-Scan Ultrasound Biometry | International Eye Hospital",
  description: "Precision eye length measurement for intraocular lens power calculation before cataract surgery.",
};

export default function AScanPage() {
  const service = getServiceBySlug("a-scan");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
