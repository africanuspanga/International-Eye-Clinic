import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "General Eye Examination | International Eye Hospital",
  description: "Comprehensive eye health assessments using the latest technology. Detect diabetes, brain tumors, hypertension and more through regular eye exams.",
};

export default function GeneralExamPage() {
  const service = getServiceBySlug("general-exam");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
