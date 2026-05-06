import DoctorDetailPage from "@/components/DoctorDetailPage";
import { getDoctorBySlug } from "@/lib/doctors-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dr. Vangilisasi Msola | Ophthalmologist, Epidemiologist & Data Scientist",
  description: "Dr. Vangilisasi Msola — Ophthalmologist, Epidemiologist, and Data Scientist at International Eye Hospital, Dar es Salaam. Expertise in clinical eye care, research, teaching, and public health.",
};

export default function Page() {
  const doctor = getDoctorBySlug("vangilisasi-msola");
  if (!doctor) notFound();
  return <DoctorDetailPage doctor={doctor} />;
}
