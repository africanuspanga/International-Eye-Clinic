"use client";

import { useState } from "react";
import { Calendar, User, Phone, Mail, ChevronRight, CheckCircle2 } from "lucide-react";

const doctors = ["Prof. Dr. A. Bulent Guler", "Dr. Eye Specialist", "Dr. Senior Consultant"];
const services = [
  "Cataract Surgery Consultation",
  "LASIK Evaluation",
  "Glaucoma Check",
  "Retina Examination",
  "Cornea Assessment",
  "General Eye Examination",
  "OCT Scan",
  "Other",
];

type Step = 1 | 2 | 3 | 4;

export default function Booking() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState({
    doctor: "",
    service: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  const steps = [
    { n: 1, label: "Doctor" },
    { n: 2, label: "Service" },
    { n: 3, label: "Date" },
    { n: 4, label: "Details" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="booking" className="relative py-28 bg-[#1a2a6c] overflow-hidden">
      {/* BG decoration */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 60% at 100% 0%, var(--gold) 0%, transparent 70%)",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c49a3c]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left info */}
          <div className="lg:pt-6">
            <div className="gold-line mb-4">
              <span className="text-[#c49a3c] text-xs font-[family-name:var(--font-dm-sans)] font-semibold tracking-widest uppercase">
                Book Appointment
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Schedule Your{" "}
              <span className="italic text-gradient-gold">Eye Exam</span> Today
            </h2>
            <p className="text-white/60 font-[family-name:var(--font-dm-sans)] text-lg leading-relaxed mb-10">
              Early diagnosis saves vision. Our specialists are ready to provide the comprehensive care you deserve.
            </p>

            {/* Contact options */}
            <div className="space-y-4">
              {[
                { icon: Phone, label: "Call us directly", value: "+255 XXX XXX XXX", href: "tel:+255XXXXXXX" },
                { icon: Mail, label: "Email us", value: "info@internationaleye.co.tz", href: "mailto:info@internationaleye.co.tz" },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <a
                    key={c.label}
                    href={c.href}
                    className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#c49a3c]/30 rounded-2xl p-5 transition-all duration-300 group"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#c49a3c]/10 border border-[#c49a3c]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#c49a3c]/20 transition-colors">
                      <Icon size={18} className="text-[#c49a3c]" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-[family-name:var(--font-dm-sans)] mb-0.5">{c.label}</p>
                      <p className="text-white font-[family-name:var(--font-dm-sans)] font-medium">{c.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Working hours */}
            <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-[#c49a3c] text-xs font-[family-name:var(--font-dm-sans)] font-semibold tracking-widest uppercase mb-4">
                Working Hours
              </p>
              {[
                ["Monday – Friday", "8:00 AM – 6:00 PM"],
                ["Saturday", "9:00 AM – 3:00 PM"],
                ["Sunday", "Emergencies Only"],
              ].map(([day, hours]) => (
                <div key={day} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-white/50 text-sm font-[family-name:var(--font-dm-sans)]">{day}</span>
                  <span className="text-white text-sm font-[family-name:var(--font-dm-sans)] font-medium">{hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-16">
                <div className="w-20 h-20 rounded-full bg-[#c49a3c]/10 border border-[#c49a3c]/30 flex items-center justify-center mb-6 animate-pulse-gold">
                  <CheckCircle2 size={40} className="text-[#c49a3c]" />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-white text-3xl font-bold mb-3">
                  Request Received!
                </h3>
                <p className="text-white/60 font-[family-name:var(--font-dm-sans)] mb-8">
                  We&apos;ll contact you within 2 hours to confirm your appointment.
                </p>
                <a
                  href="https://wa.me/255XXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white font-[family-name:var(--font-dm-sans)] font-semibold px-8 py-3 rounded-full hover:bg-[#1da851] transition-colors"
                >
                  Follow up on WhatsApp
                </a>
              </div>
            ) : (
              <>
                {/* Step indicators */}
                <div className="flex items-center gap-2 mb-8">
                  {steps.map((s, i) => (
                    <div key={s.n} className="flex items-center gap-2 flex-1">
                      <div className="flex flex-col items-center gap-1">
                        <button
                          onClick={() => step > s.n && setStep(s.n as Step)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-[family-name:var(--font-dm-sans)] transition-all duration-300 ${
                            step >= s.n
                              ? "bg-[#c49a3c] text-[#1a2a6c]"
                              : "bg-white/10 text-white/30"
                          }`}
                        >
                          {step > s.n ? <CheckCircle2 size={14} /> : s.n}
                        </button>
                        <span className={`text-[9px] tracking-wider uppercase font-[family-name:var(--font-dm-sans)] ${step >= s.n ? "text-[#c49a3c]" : "text-white/20"}`}>
                          {s.label}
                        </span>
                      </div>
                      {i < steps.length - 1 && (
                        <div className={`flex-1 h-px mb-5 transition-all duration-500 ${step > s.n ? "bg-[#c49a3c]" : "bg-white/10"}`} />
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {step === 1 && (
                    <div className="space-y-4">
                      <p className="text-white font-[family-name:var(--font-playfair)] text-lg font-semibold">
                        Choose a Doctor
                      </p>
                      {doctors.map((d) => (
                        <label
                          key={d}
                          className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                            form.doctor === d
                              ? "border-[#c49a3c] bg-[#c49a3c]/10"
                              : "border-white/10 hover:border-white/20"
                          }`}
                        >
                          <input
                            type="radio"
                            name="doctor"
                            value={d}
                            checked={form.doctor === d}
                            onChange={(e) => update("doctor", e.target.value)}
                            className="accent-[#c49a3c]"
                          />
                          <div className="w-8 h-8 rounded-full bg-[#c49a3c]/10 flex items-center justify-center flex-shrink-0">
                            <User size={14} className="text-[#c49a3c]" />
                          </div>
                          <span className="text-white text-sm font-[family-name:var(--font-dm-sans)]">{d}</span>
                        </label>
                      ))}
                      <button
                        type="button"
                        disabled={!form.doctor}
                        onClick={() => setStep(2)}
                        className="w-full flex items-center justify-center gap-2 bg-[#c49a3c] disabled:opacity-30 text-[#1a2a6c] font-semibold font-[family-name:var(--font-dm-sans)] py-3.5 rounded-xl transition-all duration-300 hover:bg-[#deb96a]"
                      >
                        Continue <ChevronRight size={16} />
                      </button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <p className="text-white font-[family-name:var(--font-playfair)] text-lg font-semibold">
                        Select Service
                      </p>
                      <select
                        value={form.service}
                        onChange={(e) => update("service", e.target.value)}
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-white font-[family-name:var(--font-dm-sans)] text-sm focus:outline-none focus:border-[#c49a3c] transition-colors"
                      >
                        <option value="" className="bg-[#1a2a6c] text-white">Select a service...</option>
                        {services.map((s) => (
                          <option key={s} value={s} className="bg-[#1a2a6c] text-white">{s}</option>
                        ))}
                      </select>
                      <div className="flex gap-3">
                        <button type="button" onClick={() => setStep(1)} className="flex-1 border border-white/20 text-white/60 font-[family-name:var(--font-dm-sans)] py-3.5 rounded-xl hover:bg-white/5 transition-colors">
                          Back
                        </button>
                        <button
                          type="button"
                          disabled={!form.service}
                          onClick={() => setStep(3)}
                          className="flex-1 flex items-center justify-center gap-2 bg-[#c49a3c] disabled:opacity-30 text-[#1a2a6c] font-semibold font-[family-name:var(--font-dm-sans)] py-3.5 rounded-xl hover:bg-[#deb96a] transition-colors"
                        >
                          Continue <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <p className="text-white font-[family-name:var(--font-playfair)] text-lg font-semibold">
                        Pick a Date & Time
                      </p>
                      <div>
                        <label className="text-white/50 text-xs font-[family-name:var(--font-dm-sans)] tracking-wide uppercase mb-2 block">Preferred Date</label>
                        <input
                          type="date"
                          value={form.date}
                          onChange={(e) => update("date", e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-white font-[family-name:var(--font-dm-sans)] text-sm focus:outline-none focus:border-[#c49a3c] transition-colors [color-scheme:dark]"
                        />
                      </div>
                      <div>
                        <label className="text-white/50 text-xs font-[family-name:var(--font-dm-sans)] tracking-wide uppercase mb-2 block">Preferred Time</label>
                        <div className="grid grid-cols-3 gap-2">
                          {["9:00 AM","10:00 AM","11:00 AM","2:00 PM","3:00 PM","4:00 PM"].map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => update("time", t)}
                              className={`py-2.5 rounded-lg text-xs font-[family-name:var(--font-dm-sans)] transition-all ${
                                form.time === t
                                  ? "bg-[#c49a3c] text-[#1a2a6c] font-semibold"
                                  : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button type="button" onClick={() => setStep(2)} className="flex-1 border border-white/20 text-white/60 font-[family-name:var(--font-dm-sans)] py-3.5 rounded-xl hover:bg-white/5 transition-colors">
                          Back
                        </button>
                        <button
                          type="button"
                          disabled={!form.date || !form.time}
                          onClick={() => setStep(4)}
                          className="flex-1 flex items-center justify-center gap-2 bg-[#c49a3c] disabled:opacity-30 text-[#1a2a6c] font-semibold font-[family-name:var(--font-dm-sans)] py-3.5 rounded-xl hover:bg-[#deb96a] transition-colors"
                        >
                          Continue <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-4">
                      <p className="text-white font-[family-name:var(--font-playfair)] text-lg font-semibold">
                        Your Details
                      </p>
                      {[
                        { label: "Full Name", key: "name", type: "text", icon: User, placeholder: "Your full name" },
                        { label: "Phone Number", key: "phone", type: "tel", icon: Phone, placeholder: "+255 XXX XXX XXX" },
                        { label: "Email Address", key: "email", type: "email", icon: Mail, placeholder: "your@email.com" },
                      ].map((f) => {
                        const Icon = f.icon;
                        return (
                          <div key={f.key} className="relative">
                            <label className="text-white/50 text-xs font-[family-name:var(--font-dm-sans)] tracking-wide uppercase mb-2 block">{f.label}</label>
                            <div className="relative">
                              <Icon size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c49a3c]/60" />
                              <input
                                type={f.type}
                                placeholder={f.placeholder}
                                value={form[f.key as keyof typeof form]}
                                onChange={(e) => update(f.key, e.target.value)}
                                className="w-full bg-white/5 border border-white/20 rounded-xl pl-10 pr-4 py-3.5 text-white font-[family-name:var(--font-dm-sans)] text-sm placeholder-white/20 focus:outline-none focus:border-[#c49a3c] transition-colors"
                              />
                            </div>
                          </div>
                        );
                      })}
                      <div>
                        <label className="text-white/50 text-xs font-[family-name:var(--font-dm-sans)] tracking-wide uppercase mb-2 block">Message (optional)</label>
                        <textarea
                          rows={3}
                          placeholder="Describe your symptoms or concerns..."
                          value={form.message}
                          onChange={(e) => update("message", e.target.value)}
                          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-white font-[family-name:var(--font-dm-sans)] text-sm placeholder-white/20 focus:outline-none focus:border-[#c49a3c] transition-colors resize-none"
                        />
                      </div>

                      {/* Summary */}
                      <div className="bg-[#c49a3c]/5 border border-[#c49a3c]/20 rounded-xl p-4 text-sm font-[family-name:var(--font-dm-sans)]">
                        <p className="text-[#c49a3c] font-semibold mb-2 text-xs tracking-widest uppercase">Appointment Summary</p>
                        <p className="text-white/70"><span className="text-white/40">Doctor:</span> {form.doctor}</p>
                        <p className="text-white/70"><span className="text-white/40">Service:</span> {form.service}</p>
                        <p className="text-white/70"><span className="text-white/40">Date/Time:</span> {form.date} at {form.time}</p>
                      </div>

                      <div className="flex gap-3">
                        <button type="button" onClick={() => setStep(3)} className="flex-1 border border-white/20 text-white/60 font-[family-name:var(--font-dm-sans)] py-3.5 rounded-xl hover:bg-white/5 transition-colors">
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={!form.name || !form.phone}
                          className="flex-1 flex items-center justify-center gap-2 bg-[#c49a3c] disabled:opacity-30 text-[#1a2a6c] font-bold font-[family-name:var(--font-dm-sans)] py-3.5 rounded-xl hover:bg-[#deb96a] transition-colors"
                        >
                          <Calendar size={16} />
                          Confirm Booking
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
