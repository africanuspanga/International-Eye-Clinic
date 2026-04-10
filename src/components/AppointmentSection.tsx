import AppointmentForm from "@/components/AppointmentForm";
import { Phone, Mail, MapPin, AlertCircle } from "lucide-react";

export default function AppointmentSection() {
  return (
    <section id="booking" className="py-20 bg-[#f0f4fc]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left info panel */}
          <div className="lg:pt-4">
            <div className="section-label">Online Appointment</div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#111827] leading-tight mb-5" style={{ fontFamily: "'Merriweather', serif" }}>
              Book Your Eye<br />
              <span className="text-[#1a2a6c]">Examination</span> Today
            </h2>
            <p className="text-[#6b7280] text-base leading-relaxed mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Early diagnosis saves vision. Our internationally trained specialists are ready to provide the comprehensive care you deserve.
            </p>

            {/* Contact Cards */}
            <div className="space-y-3 mb-8">
              <a href="tel:+255784104300"
                className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md border border-gray-100 hover:border-[#1a2a6c]/20 transition-all group">
                <div className="w-11 h-11 bg-[#1a2a6c] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] mb-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Call us directly</p>
                  <p className="font-semibold text-[#1a2a6c] text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>+255 784 104 300</p>
                </div>
              </a>
              <a href="mailto:info@eye.co.tz"
                className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md border border-gray-100 hover:border-[#1a2a6c]/20 transition-all group">
                <div className="w-11 h-11 bg-[#1a2a6c] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] mb-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Email us</p>
                  <p className="font-semibold text-[#1a2a6c] text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>info@eye.co.tz</p>
                </div>
              </a>
              <div className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="w-11 h-11 bg-[#eaecf4] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-[#1a2a6c]" />
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] mb-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Visit us</p>
                  <p className="font-medium text-[#111827] text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Tropical Center, New Bagamoyo Road<br />Dar es Salaam, Tanzania
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency note */}
            <div className="flex items-start gap-3 bg-[#fdecea] border border-[#e62d26]/20 rounded-xl p-4">
              <AlertCircle size={18} className="text-[#e62d26] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#e62d26] text-sm mb-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Eye Emergency?</p>
                <p className="text-[#374151] text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Call us immediately: <a href="tel:+255784104300" className="font-bold text-[#e62d26]">+255 784 104 300</a>
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <AppointmentForm />
          </div>
        </div>
      </div>
    </section>
  );
}
