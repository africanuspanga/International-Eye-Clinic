import DoctorDetailPage from "@/components/DoctorDetailPage";
import { getDoctorBySlug } from "@/lib/doctors-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dr. Harley H. Mkini | Optometrist",
  description: "Dr. Harley H. Mkini — Optometrist at International Eye Hospital, Dar es Salaam. Experience in refraction, contact lenses, low vision care, pediatric optometry, glaucoma clinic support, and diabetic eye clinic support.",
};

export default function Page() {
  const doctor = getDoctorBySlug("harley-mkini");
  if (!doctor) notFound();
  return <DoctorDetailPage doctor={doctor} />;
}
