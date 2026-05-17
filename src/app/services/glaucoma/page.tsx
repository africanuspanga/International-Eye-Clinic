import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServiceBySlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glaucoma Treatment | International Eye Hospital",
  description: "Complete glaucoma testing and treatment including OCT, visual field machines, medicine drops, laser and surgical options.",
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
    canonical: "https://www.internationaleyehospital.com/services/glaucoma",
  },
};

export default function GlaucomaPage() {
  const service = getServiceBySlug("glaucoma");
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
