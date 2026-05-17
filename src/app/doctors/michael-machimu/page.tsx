import DoctorDetailPage from "@/components/DoctorDetailPage";
import { getDoctorBySlug } from "@/lib/doctors-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dr. Michael Machimu | Optometrist",
  description: "Dr. Michael Machimu — Optometrist at International Eye Hospital, Dar es Salaam. He provides professional eye care services including vision assessment, corrective lens support, and patient-focused optometry care. He holds a Bachelor of Science in Optometry from Kilimanjaro Christian Medical University College and is currently pursuing a Master of Science in Applied Epidemiology and Biostatistics.",
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
    canonical: "https://www.internationaleyehospital.com/doctors/michael-machimu",
  },
};

export default function Page() {
  const doctor = getDoctorBySlug("michael-machimu");
  if (!doctor) notFound();
  return <DoctorDetailPage doctor={doctor} />;
}
