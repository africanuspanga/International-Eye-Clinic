import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import PageHero from "@/components/PageHero";
import { getCondition, getConditions } from "@/lib/cms/content";
import { TranslationProvider } from "@/lib/translation-context";
import ConditionDetailClient from "./ConditionDetailClient";
import { BreadcrumbJsonLd, MedicalWebPageJsonLd } from "@/components/StructuredData";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getConditions()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const condition = await getCondition(slug);

  if (!condition) {
    return {
      title: "Condition Not Found | International Eye Hospital",
    };
  }
  return {
    title: `${condition.name} | Eye Conditions | International Eye Hospital`,
    description: condition.shortDesc,
    alternates: {
      canonical: `https://www.internationaleyehospital.com/news/eye-conditions/${slug}`,
    },
    openGraph: {
      title: `${condition.name} | Eye Conditions | International Eye Hospital`,
      description: condition.shortDesc,
      url: `https://www.internationaleyehospital.com/news/eye-conditions/${slug}`,
      type: "article",
      images: [
        {
          url: "/images/hero/slide-1.jpeg",
          width: 1200,
          height: 630,
          alt: `${condition.name} - International Eye Hospital`,
        },
      ],
    },
  };
}

export default async function EyeConditionDetailPage({ params }: Props) {
  const { slug } = await params;
  const [condition, allConditions] = await Promise.all([getCondition(slug), getConditions()]);
  if (!condition) notFound();

  return (
    <TranslationProvider>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.internationaleyehospital.com/" },
          { name: "News", url: "https://www.internationaleyehospital.com/news" },
          { name: "Eye Conditions", url: "https://www.internationaleyehospital.com/news/eye-conditions" },
          { name: condition.name, url: `https://www.internationaleyehospital.com/news/eye-conditions/${condition.slug}` },
        ]}
      />
      <MedicalWebPageJsonLd
        title={condition.name}
        description={condition.shortDesc}
        url={`/news/eye-conditions/${condition.slug}`}
      />
      <Navbar />
      <main>
        <PageHero
          label="Eye Conditions"
          title={condition.name}
          highlight="Details"
          description={condition.shortDesc}
          breadcrumbs={[
            { label: "News", href: "/news" },
            { label: "Eye Conditions", href: "/news/eye-conditions" },
            { label: condition.name, href: `/news/eye-conditions/${condition.slug}` },
          ]}
          cta={{ label: "Book Consultation", href: "/appointment" }}
        />
        <ConditionDetailClient
          condition={condition}
          allConditions={allConditions.map((c) => ({ slug: c.slug, name: c.name, shortDesc: c.shortDesc }))}
        />
      </main>
      <Footer />
      <WhatsApp />
    </TranslationProvider>
  );
}
