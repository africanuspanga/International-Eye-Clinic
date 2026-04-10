import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import PageHero from "@/components/PageHero";
import AppointmentForm from "@/components/AppointmentForm";
import { Phone, Mail, MapPin, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Appointment | International Eye Hospital",
  description: "Book an appointment with our specialist ophthalmologists at International Eye Hospital, Dar es Salaam.",
};

export default function AppointmentPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Online Appointment"
          title="Book Your"
          highlight="Appointment"
          description="Fill in the form below to request an appointment. Our team will contact you within 24 hours to confirm."
          breadcrumbs={[{ label: "Book Appointment", href: "/appointment" }]}
        />

        <section className="py-20 bg-[#f0f4fc]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-5 gap-12 items-start">
              {/* Left panel */}
              <div className="lg:col-span-2 space-y-5">
                <h2 className="text-2xl font-bold text-[#111827]" style={{ fontFamily: "'Merriweather', serif" }}>
                  Before Your Visit
                </h2>
                <p className="text-[#6b7280] text-sm leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Please bring any available medical records including X-rays, previous prescriptions, or eye reports to your appointment.
                </p>

                {[
                  { icon: Phone, title: "Call Us", value: "+255 784 104 300", href: "tel:+255784104300" },
                  { icon: Mail, title: "Email Us", value: "info@eye.co.tz", href: "mailto:info@eye.co.tz" },
                  { icon: MapPin, title: "Visit Us", value: "Tropical Center, New Bagamoyo Road, Dar es Salaam", href: null },
                ].map((c) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.title} className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <div className="w-10 h-10 bg-[#1a2a6c] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-[#6b7280] mb-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>{c.title}</p>
                        {c.href ? (
                          <a href={c.href} className="text-[#1a2a6c] font-semibold text-sm hover:underline" style={{ fontFamily: "'Poppins', sans-serif" }}>{c.value}</a>
                        ) : (
                          <p className="text-[#111827] font-medium text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>{c.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}

                <div className="flex items-start gap-3 bg-[#fdecea] border border-[#e62d26]/20 rounded-xl p-4">
                  <AlertCircle size={18} className="text-[#e62d26] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#e62d26] text-sm mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>Eye Emergency?</p>
                    <p className="text-[#374151] text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Call immediately: <a href="tel:+255784104300" className="font-bold text-[#e62d26]">+255 784 104 300</a>
                    </p>
                  </div>
                </div>

                {/* Insurance */}
                <div className="bg-[#e8edf7] rounded-xl p-5">
                  <p className="font-semibold text-[#1a2a6c] text-sm mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>Insurance Accepted</p>
                  <p className="text-[#6b7280] text-xs leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    We work with 20+ major insurance providers. Please bring your insurance card and confirm coverage before your appointment.
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                <AppointmentForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
