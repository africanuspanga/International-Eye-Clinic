import DoctorDetailPage from "@/components/DoctorDetailPage";
import { getDoctorBySlug } from "@/lib/doctors-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assoc. Prof. Aydin Yildirim | LASIK & Cataract Surgeon | International Eye Hospital",
  description: "Assoc. Prof. Aydin Yildirim — LASIK surgery, Cataract, Glaucoma, Corneal disorders & Pediatric eye care specialist with over 25 years of experience.",
  openGraph: {
    title: "Assoc. Prof. Aydin Yildirim | International Eye Hospital",
    description: "LASIK surgery, Cataract, Glaucoma & Corneal disorders specialist with over 25 years of experience.",
  },
};

export default function AydinYildirimPage() {
  const doctor = getDoctorBySlug("aydin-yildirim");
  if (!doctor) notFound();
  return <DoctorDetailPage doctor={doctor} />;
}
