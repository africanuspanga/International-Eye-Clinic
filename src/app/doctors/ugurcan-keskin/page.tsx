import DoctorDetailPage from "@/components/DoctorDetailPage";
import { getDoctorBySlug } from "@/lib/doctors-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assoc. Prof. Ugurcan Keskin | Glaucoma & Cataract Surgeon | International Eye Hospital",
  description: "Assoc. Prof. Ugurcan Keskin — Glaucoma, Cataract & Anterior segment surgeries specialist. Hacettepe University trained ophthalmologist in Dar es Salaam, Tanzania.",
  openGraph: {
    title: "Assoc. Prof. Ugurcan Keskin | International Eye Hospital",
    description: "Glaucoma, Cataract & Anterior segment surgeries specialist.",
  },
};

export default function UgurcanKeskinPage() {
  const doctor = getDoctorBySlug("ugurcan-keskin");
  if (!doctor) notFound();
  return <DoctorDetailPage doctor={doctor} />;
}
