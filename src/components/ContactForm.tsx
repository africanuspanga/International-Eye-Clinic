"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const setField = (k: string, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setSendError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
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
      `Hello, I have sent a message through your website.\nName: ${form.firstName} ${form.lastName}\nPhone: ${form.phone}\nEmail: ${form.email}\nSubject: ${form.subject}\nMessage: ${form.message}`
    );
    setTimeout(() => {
      window.open(`https://wa.me/255695586632?text=${msg}`, "_blank");
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center py-14">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-5">
          <CheckCircle2 size={32} className="text-green-600" />
        </div>
        <h4 className="font-bold text-xl text-[#111827] mb-2" style={{ fontFamily: "'Merriweather', serif" }}>
          Message Sent!
        </h4>
        <p className="text-[#6b7280] text-sm leading-relaxed mb-2">
          Your message has been received. Our team will contact you shortly.
        </p>
        <p className="text-[#6b7280] text-xs">
          We will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>First Name</label>
          <input
            type="text"
            placeholder="First Name"
            required
            value={form.firstName}
            onChange={(e) => setField("firstName", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#e62d26] focus:border-transparent transition-all"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            required
            value={form.lastName}
            onChange={(e) => setField("lastName", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#e62d26] focus:border-transparent transition-all"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Phone</label>
          <input
            type="tel"
            placeholder="+255 7XX XXX XXX"
            required
            value={form.phone}
            onChange={(e) => setField("phone", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#e62d26] transition-all"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            required
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#e62d26] transition-all"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Subject</label>
        <input
          type="text"
          placeholder="How can we help?"
          required
          value={form.subject}
          onChange={(e) => setField("subject", e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#e62d26] transition-all"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Message</label>
        <textarea
          rows={5}
          placeholder="Tell us more..."
          required
          value={form.message}
          onChange={(e) => setField("message", e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#e62d26] transition-all resize-none"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        />
      </div>

      {sendError && (
        <p className="text-center text-xs text-red-600 bg-red-50 rounded-lg py-2 px-3 flex items-center justify-center gap-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
          <AlertCircle size={11} /> {sendError}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="bg-[#e62d26] hover:bg-[#c4201a] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-colors inline-flex items-center gap-2"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {sending ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
