import Link from "next/link";
import { Calendar, Phone, MessageCircle, Clock } from "lucide-react";

export default function QuickBook() {
  return (
    <section className="bg-white shadow-lg shadow-black/5 relative z-10 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {/* Book Online */}
          <Link
            href="/appointment"
            className="flex items-center gap-4 px-6 py-6 hover:bg-[#e8edf7] transition-colors group"
          >
            <div className="w-11 h-11 bg-[#1a2a6c] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#243688] transition-colors">
              <Calendar size={20} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-[#111827] text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Book Online</p>
              <p className="text-[#6b7280] text-xs mt-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Schedule your appointment</p>
            </div>
          </Link>

          {/* Call us */}
          <a
            href="tel:+255784104300"
            className="flex items-center gap-4 px-6 py-6 hover:bg-[#e8edf7] transition-colors group"
          >
            <div className="w-11 h-11 bg-[#e62d26] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#c4201a] transition-colors">
              <Phone size={20} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-[#111827] text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Call Us Now</p>
              <p className="text-[#1a2a6c] text-xs mt-0.5 font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>+255 784 104 300</p>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/255784104300?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-6 py-6 hover:bg-[#e8edf7] transition-colors group"
          >
            <div className="w-11 h-11 bg-[#25D366] rounded-xl flex items-center justify-center flex-shrink-0">
              <MessageCircle size={20} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-[#111827] text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>WhatsApp Us</p>
              <p className="text-[#6b7280] text-xs mt-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Quick & easy response</p>
            </div>
          </a>

          {/* Hours */}
          <div className="flex items-center gap-4 px-6 py-6">
            <div className="w-11 h-11 bg-[#eaecf4] rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock size={20} className="text-[#1a2a6c]" />
            </div>
            <div>
              <p className="font-semibold text-[#111827] text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Working Hours</p>
              <p className="text-[#6b7280] text-xs mt-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Mon–Sat: 8:30 AM – 5:30 PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
