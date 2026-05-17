import DoctorDetailPage from "@/components/DoctorDetailPage";
import { getDoctorBySlug } from "@/lib/doctors-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dr. Zayd Mohamed Sangey | Ophthalmologist",
  description: "Dr. Zayd Mohamed Sangey — Ophthalmologist at International Eye Hospital, Dar es Salaam. Trained at Muhimbili, he provides preventive, corrective, medical, and surgical eye care, with special interests in cornea, refractive and external eye diseases, cataract, glaucoma, medical retina, uveitis, and pediatric ophthalmology.",
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
    canonical: "https://www.internationaleyehospital.com/doctors/zayd-sangey",
  },
};

export default function Page() {
  const doctor = getDoctorBySlug("zayd-sangey");
  if (!doctor) notFound();
  return <DoctorDetailPage doctor={doctor} />;
}
