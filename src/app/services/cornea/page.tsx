import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cornea Transplant | International Eye Hospital",
  description: "Cornea transplant surgery to replace damaged cornea with healthy donor tissue. Performed under general or local anesthetic.",
};

export default function CorneaPage() {
  const service = getServiceBySlug("cornea");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
