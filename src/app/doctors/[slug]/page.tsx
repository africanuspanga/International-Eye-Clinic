import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DoctorDetailPage from "@/components/DoctorDetailPage";
import { getDoctor, getDoctors } from "@/lib/cms/content";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getDoctors()).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doctor = await getDoctor(slug);
  if (!doctor) return { title: "Doctor not found" };
  return {
    title: doctor.seoTitle.includes("International Eye Hospital")
      ? { absolute: doctor.seoTitle }
      : doctor.seoTitle || `${doctor.name} | ${doctor.title}`,
    description: doctor.seoDescription || `${doctor.name} — ${doctor.title} at International Eye Hospital, Dar es Salaam.`,
    openGraph: {
      images: [{ url: "/images/hero/slide-1.jpeg", width: 1200, height: 630, alt: "International Eye Hospital" }],
    },
    alternates: { canonical: `https://www.internationaleyehospital.com/doctors/${doctor.slug}` },
  };
}

export default async function DoctorPage({ params }: Props) {
  const { slug } = await params;
  const [doctor, doctors] = await Promise.all([getDoctor(slug), getDoctors()]);
  if (!doctor) notFound();
  return <DoctorDetailPage doctor={doctor} allDoctors={doctors} />;
}
