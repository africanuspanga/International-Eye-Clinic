import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YAG Laser | International Eye Hospital",
  description: "Quick, painless YAG laser capsulotomy to restore clear vision after cataract surgery. Treat posterior capsule opacification safely.",
};

export default function YagLaserPage() {
  const service = getServiceBySlug("yag-laser");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
