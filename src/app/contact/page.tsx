import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import PageHero from "@/components/PageHero";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | International Eye Hospital",
  description: "Contact International Eye Hospital in Dar es Salaam. Call +255 784 104 300 or email info@eye.co.tz.",
};

const hours = [
  { day: "Monday – Friday", time: "8:30 AM – 5:30 PM" },
  { day: "Saturday", time: "8:30 AM – 5:30 PM" },
  { day: "Sunday", time: "Closed" },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Contact Us"
          title="We're Here"
          highlight="to Help"
          description="Reach out to us by phone, email, or visit our hospital in Dar es Salaam. Our team is ready to assist you."
          breadcrumbs={[{ label: "Contact", href: "/contact" }]}
        />

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Contact info */}
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-[#111827] mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Contact Information
                </h2>

                {[
                  {
                    icon: MapPin,
                    title: "Our Location",
                    lines: ["Tropical Center, New Bagamoyo Road", "P.O. Box 2083", "Dar es Salaam, Tanzania"],
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    lines: ["+255 784 104 300"],
                    href: "tel:+255784104300",
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    lines: ["info@eye.co.tz"],
                    href: "mailto:info@eye.co.tz",
                  },
                ].map((c) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.title} className="flex gap-4">
                      <div className="w-11 h-11 bg-[#1a2a6c] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#111827] text-sm mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>{c.title}</p>
                        {c.lines.map((line) => (
                          c.href ? (
                            <a key={line} href={c.href} className="block text-[#1a2a6c] text-sm hover:underline" style={{ fontFamily: "'Poppins', sans-serif" }}>{line}</a>
                          ) : (
                            <p key={line} className="text-[#6b7280] text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>{line}</p>
                          )
                        ))}
                      </div>
                    </div>
                  );
                })}

                {/* Hours */}
                <div className="flex gap-4 mt-2">
                  <div className="w-11 h-11 bg-[#1a2a6c] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#111827] text-sm mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>Working Hours</p>
                    {hours.map((h) => (
                      <div key={h.day} className="flex justify-between gap-6 text-sm mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        <span className="text-[#6b7280]">{h.day}</span>
                        <span className={h.day === "Sunday" ? "text-[#e62d26] font-medium" : "text-[#111827] font-medium"}>{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact form */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-[#111827] mb-6" style={{ fontFamily: "'Merriweather', serif" }}>
                  Send Us a Message
                </h2>
                <form className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {["First Name", "Last Name"].map((f) => (
                      <div key={f}>
                        <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>{f}</label>
                        <input type="text" placeholder={f}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2a6c] focus:border-transparent transition-all"
                          style={{ fontFamily: "'Poppins', sans-serif" }} />
                      </div>
                    ))}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Phone</label>
                      <input type="tel" placeholder="+255 7XX XXX XXX"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2a6c] transition-all"
                        style={{ fontFamily: "'Poppins', sans-serif" }} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Email</label>
                      <input type="email" placeholder="your@email.com"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2a6c] transition-all"
                        style={{ fontFamily: "'Poppins', sans-serif" }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Subject</label>
                    <input type="text" placeholder="How can we help?"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2a6c] transition-all"
                      style={{ fontFamily: "'Poppins', sans-serif" }} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wide mb-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Message</label>
                    <textarea rows={5} placeholder="Tell us more..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2a6c] transition-all resize-none"
                      style={{ fontFamily: "'Poppins', sans-serif" }} />
                  </div>
                  <button type="submit"
                    className="bg-[#1a2a6c] hover:bg-[#243688] text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
                    style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Google Map */}
        <section className="bg-[#f5f6fa]">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h2 className="text-xl font-bold text-[#111827] mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
              Find Us on the Map
            </h2>
          </div>
          <div className="w-full h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.6!2d39.2695!3d-6.7630!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sInternational+Eye+Hospital+Dar+es+Salaam!5e0!3m2!1sen!2stz!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="International Eye Hospital Location"
            />
          </div>
        </section>
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
