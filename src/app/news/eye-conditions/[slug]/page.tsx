import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import PageHero from "@/components/PageHero";
import { createClient } from "@/lib/supabase/server";
import { getConditionBySlug, eyeConditions as fallbackConditions } from "@/lib/eye-conditions-data";
import { TranslationProvider } from "@/lib/translation-context";
import ConditionDetailClient from "./ConditionDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: dbCondition } = await supabase
    .from("eye_conditions")
    .select("name, short_desc")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  const fallback = getConditionBySlug(slug);
  const condition = dbCondition || fallback;

  if (!condition) {
    return {
      title: "Condition Not Found | International Eye Hospital",
    };
  }
  return {
    title: `${condition.name} | Eye Conditions | International Eye Hospital`,
    description: dbCondition ? dbCondition.short_desc : fallback?.shortDesc || "",
  };
}

export default async function EyeConditionDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: dbCondition } = await supabase
    .from("eye_conditions")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  let condition: any;

  if (dbCondition) {
    condition = {
      slug: dbCondition.slug,
      name: dbCondition.name,
      shortDesc: dbCondition.short_desc,
      overview: dbCondition.overview,
      symptoms: dbCondition.symptoms,
      causes: dbCondition.causes,
      treatments: dbCondition.treatments,
      whenToSeeDoctor: dbCondition.when_to_see_doctor,
      swahili: {
        overview: dbCondition.swahili_overview,
        symptoms: dbCondition.swahili_symptoms,
        causes: dbCondition.swahili_causes,
        treatments: dbCondition.swahili_treatments,
        whenToSeeDoctor: dbCondition.swahili_when_to_see_doctor,
      },
    };
  } else {
    const fallback = getConditionBySlug(slug);
    if (!fallback) {
      notFound();
    }
    condition = fallback;
  }

  // Get all conditions for related links
  const { data: allDbConditions } = await supabase
    .from("eye_conditions")
    .select("slug, name, short_desc")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  const allConditions = allDbConditions && allDbConditions.length > 0
    ? allDbConditions.map((c) => ({ slug: c.slug, name: c.name, shortDesc: c.short_desc }))
    : fallbackConditions;

  return (
    <TranslationProvider>
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
        <ConditionDetailClient condition={condition} allConditions={allConditions} />
      </main>
      <Footer />
      <WhatsApp />
    </TranslationProvider>
  );
}
