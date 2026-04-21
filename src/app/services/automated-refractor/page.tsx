import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automated Refractor | International Eye Hospital",
  description: "Objective, computerized measurement of your eye's focusing power for precise eyeglass and contact lens prescriptions.",
};

export default function AutomatedRefractorPage() {
  const service = getServiceBySlug("automated-refractor");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
