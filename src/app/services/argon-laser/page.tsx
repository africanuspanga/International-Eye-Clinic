import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Argon Laser Trabeculoplasty (ALT) | International Eye Hospital",
  description: "Laser treatment to lower eye pressure in open-angle glaucoma. Outpatient procedure at International Eye Hospital.",
};

export default function ArgonLaserPage() {
  const service = getServiceBySlug("argon-laser");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
