import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glaucoma Treatment | International Eye Hospital",
  description: "Complete glaucoma testing and treatment including OCT, visual field machines, medicine drops, laser and surgical options.",
};

export default function GlaucomaPage() {
  const service = getServiceBySlug("glaucoma");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
