"use client";

import { useState } from "react";
import { Calendar, User, Phone, Mail, ChevronRight, CheckCircle2, Upload, AlertCircle } from "lucide-react";

type Step = 1 | 2 | 3 | 4;

const doctorOptions = [
  "Any Available Doctor",
  "Dr. Muammer Coskun",
  "Dr. Vangilisasi Msola",
  "Dr. Zayd Mohamed Sangey",
  "Dr. Harley H. Mkini",
  "Dr. Michael Machimu",
];

const serviceOptions = [
  "General Eye Examination",
  "Cataract Surgery",
  "Glaucoma",
  "Retina Treatment",
  "Keratoconus Crosslinking",
  "Cornea Transplant",
  "Eye Test",
];

const timeSlots = ["08:30", "10:00", "12:00", "14:00", "16:00"];

function isSunday(dateStr: string) {
  if (!dateStr) return false;
  return new Date(dateStr).getDay() === 0;
}

export default function AppointmentForm({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const [form, setForm] = useState({
    doctor: "",
    service: "",
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    existingPatient: "",
    reason: "",
  });

  const set = (k: string, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: "" }));
  };

  const validateStep4 = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.email.trim()) e.email = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep4()) return;
    setSending(true);
    setSendError("");

    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send appointment request");
      }
    } catch (err: any) {
      setSendError(err.message || "Something went wrong. Please try again.");
      setSending(false);
      return;
    }

    setSubmitted(true);
    setSending(false);

    // WhatsApp trigger
    const msg = encodeURIComponent(
      `Hello, I have booked an appointment.\nName: ${form.firstName} ${form.lastName}\nDoctor: ${form.doctor}\nService: ${form.service}\nDate: ${form.date} at ${form.time}\nPhone: ${form.phone}`
    );
    setTimeout(() => {
      window.open(`https://wa.me/255784104300?text=${msg}`, "_blank");
    }, 1500);
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  const inputClass = (field: string) =>
    `w-full border rounded-lg px-4 py-3 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#e62d26] transition-all ${
      errors[field] ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-white focus:border-[#e62d26]"
    }`;

  return (
    <div className={`bg-white rounded-2xl shadow-xl shadow-black/8 border border-gray-100 overflow-hidden ${compact ? "" : "max-w-2xl mx-auto"}`}>
      {/* Header */}
      <div className="bg-[#e62d26] px-7 py-5">
        <h3 className="text-white font-bold text-xl" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
          Request an Appointment
        </h3>
        <p className="text-white/70 text-sm mt-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Please bring any available medical records including X-rays or previous reports.
        </p>
      </div>

      {submitted ? (
        <div className="px-7 py-14 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-5">
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
          <h4 className="font-bold text-xl text-[#111827] mb-2" style={{ fontFamily: "'Merriweather', serif" }}>
            Request Received!
          </h4>
          <p className="text-[#6b7280] text-sm leading-relaxed mb-2">
            Your appointment request has been received. Our team will contact you shortly to confirm.
          </p>
          <p className="text-[#6b7280] text-xs">
            We will contact you within 24 hours to confirm your booking.
          </p>
        </div>
      ) : (
        <div className="px-7 py-6">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-7">
            {([1, 2, 3, 4] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 flex-shrink-0 transition-all ${
                  step > s
                    ? "bg-green-500 border-green-500 text-white"
                    : step === s
                    ? "bg-[#e62d26] border-[#e62d26] text-white"
                    : "bg-white border-gray-200 text-gray-400"
                }`} style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {step > s ? <CheckCircle2 size={14} /> : s}
                </div>
                {i < 3 && <div className={`flex-1 h-px ${step > s ? "bg-green-400" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Doctor */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="font-semibold text-[#111827] mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>Select a Doctor</p>
                {doctorOptions.map((d) => (
                  <label key={d} className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    form.doctor === d ? "border-[#e62d26] bg-[#fdecea]" : "border-gray-200 hover:border-gray-300"
                  }`}>
                    <input type="radio" name="doctor" value={d} checked={form.doctor === d} onChange={(e) => set("doctor", e.target.value)} className="accent-[#e62d26]" />
                    <div className="w-7 h-7 bg-[#fdecea] rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={13} className="text-[#e62d26]" />
                    </div>
                    <span className="text-sm text-[#111827] font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>{d}</span>
                  </label>
                ))}
                <button type="button" disabled={!form.doctor} onClick={() => setStep(2)}
                  className="w-full flex items-center justify-center gap-2 bg-[#e62d26] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl mt-2 hover:bg-[#c4201a] transition-colors"
                  style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Continue <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Step 2: Service */}
            {step === 2 && (
              <div className="space-y-4">
                <p className="font-semibold text-[#111827] mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>Select Service</p>
                <select value={form.service} onChange={(e) => set("service", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#e62d26] bg-white"
                  style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <option value="">Choose a service...</option>
                  {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 border border-gray-200 text-[#6b7280] py-3 rounded-xl hover:bg-gray-50 text-sm font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>Back</button>
                  <button type="button" disabled={!form.service} onClick={() => setStep(3)}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#e62d26] disabled:opacity-40 text-white font-semibold py-3 rounded-xl hover:bg-[#c4201a] transition-colors text-sm"
                    style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Continue <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Date & Time */}
            {step === 3 && (
              <div className="space-y-5">
                <p className="font-semibold text-[#111827] mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>Select Date & Time</p>
                <div>
                  <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-2 block" style={{ fontFamily: "'Poppins', sans-serif" }}>Date</label>
                  <input type="date" value={form.date} min={minDateStr}
                    onChange={(e) => {
                      if (isSunday(e.target.value)) {
                        setErrors((p) => ({ ...p, date: "We are closed on Sundays." }));
                      } else {
                        set("date", e.target.value);
                      }
                    }}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#e62d26] [color-scheme:light]"
                    style={{ fontFamily: "'Poppins', sans-serif" }} />
                  {errors.date && (
                    <p className="text-blue-500 text-xs mt-1 flex items-center gap-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      <AlertCircle size={11} /> {errors.date}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-2 block" style={{ fontFamily: "'Poppins', sans-serif" }}>Time Slot</label>
                  <div className="grid grid-cols-5 gap-2">
                    {timeSlots.map((t) => (
                      <button key={t} type="button" onClick={() => set("time", t)}
                        className={`py-2.5 rounded-lg text-xs font-semibold border transition-all ${
                          form.time === t ? "bg-[#e62d26] text-white border-[#e62d26]" : "bg-white border-gray-200 text-[#374151] hover:border-[#e62d26] hover:text-[#e62d26]"
                        }`} style={{ fontFamily: "'Poppins', sans-serif" }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(2)} className="flex-1 border border-gray-200 text-[#6b7280] py-3 rounded-xl hover:bg-gray-50 text-sm font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>Back</button>
                  <button type="button" disabled={!form.date || !form.time || !!errors.date} onClick={() => setStep(4)}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#e62d26] disabled:opacity-40 text-white font-semibold py-3 rounded-xl hover:bg-[#c4201a] transition-colors text-sm"
                    style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Continue <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Patient Details */}
            {step === 4 && (
              <div className="space-y-4">
                <p className="font-semibold text-[#111827] mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>Your Details</p>

                {/* Required fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1.5 block" style={{ fontFamily: "'Poppins', sans-serif" }}>First Name *</label>
                    <input type="text" placeholder="First name" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} className={inputClass("firstName")} style={{ fontFamily: "'Poppins', sans-serif" }} />
                    {errors.firstName && <p className="text-blue-500 text-[10px] mt-1" style={{ fontFamily: "'Poppins', sans-serif" }}>{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1.5 block" style={{ fontFamily: "'Poppins', sans-serif" }}>Last Name *</label>
                    <input type="text" placeholder="Last name" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} className={inputClass("lastName")} style={{ fontFamily: "'Poppins', sans-serif" }} />
                    {errors.lastName && <p className="text-blue-500 text-[10px] mt-1" style={{ fontFamily: "'Poppins', sans-serif" }}>{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1.5 block" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <span className="flex items-center gap-1.5"><Phone size={11} /> Phone Number *</span>
                  </label>
                  <input type="tel" placeholder="+255 7XX XXX XXX" value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputClass("phone")} style={{ fontFamily: "'Poppins', sans-serif" }} />
                  {errors.phone && <p className="text-blue-500 text-[10px] mt-1" style={{ fontFamily: "'Poppins', sans-serif" }}>{errors.phone}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1.5 block" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <span className="flex items-center gap-1.5"><Mail size={11} /> Email *</span>
                  </label>
                  <input type="email" placeholder="your@email.com" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputClass("email")} style={{ fontFamily: "'Poppins', sans-serif" }} />
                  {errors.email && <p className="text-blue-500 text-[10px] mt-1" style={{ fontFamily: "'Poppins', sans-serif" }}>{errors.email}</p>}
                </div>

                {/* Optional fields */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1.5 block" style={{ fontFamily: "'Poppins', sans-serif" }}>Age</label>
                    <input type="number" placeholder="Age" value={form.age} onChange={(e) => set("age", e.target.value)} className={inputClass("age")} style={{ fontFamily: "'Poppins', sans-serif" }} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1.5 block" style={{ fontFamily: "'Poppins', sans-serif" }}>Gender</label>
                    <select value={form.gender} onChange={(e) => set("gender", e.target.value)} className={inputClass("gender")} style={{ fontFamily: "'Poppins', sans-serif" }}>
                      <option value="">-</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1.5 block" style={{ fontFamily: "'Poppins', sans-serif" }}>Existing Patient?</label>
                    <select value={form.existingPatient} onChange={(e) => set("existingPatient", e.target.value)} className={inputClass("existingPatient")} style={{ fontFamily: "'Poppins', sans-serif" }}>
                      <option value="">-</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1.5 block" style={{ fontFamily: "'Poppins', sans-serif" }}>Reason for Visit</label>
                  <textarea rows={2} placeholder="Describe your symptoms or reason for visit..." value={form.reason} onChange={(e) => set("reason", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#e62d26] resize-none"
                    style={{ fontFamily: "'Poppins', sans-serif" }} />
                </div>

                {/* File upload placeholder */}
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex items-center gap-3 hover:border-[#e62d26]/40 transition-colors cursor-pointer">
                  <Upload size={18} className="text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-[#374151]" style={{ fontFamily: "'Poppins', sans-serif" }}>Upload Medical Files</p>
                    <p className="text-xs text-[#6b7280]" style={{ fontFamily: "'Poppins', sans-serif" }}>X-ray, reports, previous records (optional)</p>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-[#fdecea] rounded-xl p-4 text-xs space-y-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <p className="text-[#e62d26] font-semibold uppercase tracking-wide mb-2">Appointment Summary</p>
                  <p className="text-[#374151]"><span className="text-[#6b7280]">Doctor: </span>{form.doctor}</p>
                  <p className="text-[#374151]"><span className="text-[#6b7280]">Service: </span>{form.service}</p>
                  <p className="text-[#374151]"><span className="text-[#6b7280]">Date & Time: </span>{form.date} at {form.time}</p>
                </div>

                {sendError && (
                  <p className="text-center text-xs text-red-600 bg-red-50 rounded-lg py-2 px-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {sendError}
                  </p>
                )}
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(3)} disabled={sending} className="flex-1 border border-gray-200 text-[#6b7280] py-3 rounded-xl hover:bg-gray-50 text-sm font-medium disabled:opacity-50" style={{ fontFamily: "'Poppins', sans-serif" }}>Back</button>
                  <button type="submit" disabled={sending}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#1a2a6c] hover:bg-[#243688] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors text-sm"
                    style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {sending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Calendar size={15} />
                        Request Appointment
                      </>
                    )}
                  </button>
                </div>
                <p className="text-center text-xs text-[#6b7280]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  We will contact you within 24 hours to confirm your booking.
                </p>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
