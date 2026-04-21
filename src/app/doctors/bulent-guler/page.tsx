import DoctorDetailPage from "@/components/DoctorDetailPage";
import { getDoctorBySlug } from "@/lib/doctors-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prof. Dr. A. Bulent Guler | Ophthalmologist | International Eye Hospital",
  description: "Prof. Dr. A. Bulent Guler — Retina, Cataract, Glaucoma & Keratoconus specialist with over 25 years of experience. Istanbul University trained ophthalmologist in Dar es Salaam, Tanzania.",
  openGraph: {
    title: "Prof. Dr. A. Bulent Guler | International Eye Hospital",
    description: "Retina, Cataract, Glaucoma & Keratoconus specialist with over 25 years of experience.",
  },
};

export default function BulentGulerPage() {
  const doctor = getDoctorBySlug("bulent-guler");
  if (!doctor) notFound();
  return <DoctorDetailPage doctor={doctor} />;
}
