import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ConditionForm from "../ConditionForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditConditionPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: condition, error } = await supabase
    .from("eye_conditions")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !condition) {
    notFound();
  }

  return (
    <div>
      <h1
        className="text-3xl font-bold text-[#111827] mb-8"
        style={{ fontFamily: "'Merriweather', serif" }}
      >
        Edit: {condition.name}
      </h1>
      <ConditionForm initialData={condition} isEdit />
    </div>
  );
}
