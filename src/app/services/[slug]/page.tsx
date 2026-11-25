import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getService, getServicePages } from "@/lib/cms/content";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getServicePages()).map((svc) => ({ slug: svc.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: "Service not found" };
  return {
    // The root layout appends " | International Eye Hospital"; titles that
    // already contain the name are used as-is so it isn't repeated.
    title: service.seoTitle.includes("International Eye Hospital")
      ? { absolute: service.seoTitle }
      : service.seoTitle || service.title,
    description: service.seoDescription || service.subtitle,
    openGraph: {
      images: [{ url: "/images/hero/slide-1.jpeg", width: 1200, height: 630, alt: "International Eye Hospital" }],
    },
    alternates: { canonical: `https://www.internationaleyehospital.com/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const [service, services] = await Promise.all([getService(slug), getServicePages()]);
  if (!service) notFound();
  return <ServiceDetailPage service={service} allServices={services} />;
}
