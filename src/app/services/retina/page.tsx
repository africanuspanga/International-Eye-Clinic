import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retina – Diabetic Retinopathy | International Eye Hospital",
  description: "Expert retina care including OCT, FFA, visual field, and biometry. Early detection and treatment of diabetic retinopathy and other retina diseases.",
};

export default function RetinaPage() {
  const service = getServiceBySlug("retina");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
