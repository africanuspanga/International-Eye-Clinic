import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "General Eye Examination | International Eye Hospital",
  description: "Comprehensive eye health assessments using the latest technology. Detect diabetes, brain tumors, hypertension and more through regular eye exams.",
  openGraph: {
    images: [
      {
        url: "/images/hero/slide-1.jpeg",
        width: 1200,
        height: 630,
        alt: "International Eye Hospital",
      },
    ],
  },
  alternates: {
    canonical: "https://www.internationaleyehospital.com/services/general-exam",
  },
};

export default function GeneralExamPage() {
  const service = getServiceBySlug("general-exam");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
