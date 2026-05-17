import DoctorDetailPage from "@/components/DoctorDetailPage";
import { getDoctorBySlug } from "@/lib/doctors-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dr. Muammer Coskun | Consultant Ophthalmologist / Eye Surgeon",
  description: "Dr. Muammer Coskun — Consultant Ophthalmologist and Eye Surgeon at International Eye Hospital, Dar es Salaam. Extensive experience in cataract surgery, glaucoma care, laser eye procedures, and medical retina.",
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
    canonical: "https://www.internationaleyehospital.com/doctors/muammer-coskun",
  },
};

export default function Page() {
  const doctor = getDoctorBySlug("muammer-coskun");
  if (!doctor) notFound();
  return <DoctorDetailPage doctor={doctor} />;
}
