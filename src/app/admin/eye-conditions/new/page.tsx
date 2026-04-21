import ConditionForm from "../ConditionForm";

export default function NewConditionPage() {
  return (
    <div>
      <h1
        className="text-3xl font-bold text-[#111827] mb-8"
        style={{ fontFamily: "'Merriweather', serif" }}
      >
        New Eye Condition
      </h1>
      <ConditionForm />
    </div>
  );
}
