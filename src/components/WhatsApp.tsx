"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function WhatsApp() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup */}
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 p-5 w-72 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image src="/International eye clinic logo.png" alt="International Eye Hospital" fill className="object-contain p-1 bg-[#e8edf7]" />
              </div>
              <div>
                <p className="font-semibold text-[#111827] text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  International Eye Hospital
                </p>
                <p className="text-green-500 text-xs" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  ● Usually replies in minutes
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 p-0.5">
              <X size={16} />
            </button>
          </div>
          <div className="bg-[#f5f6fa] rounded-xl p-3 mb-4">
            <p className="text-[#374151] text-sm leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Hello! 👋 How can we help you today? Ask about our services or book an appointment.
            </p>
          </div>
          <a
            href="https://wa.me/255784104300?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20eye%20care%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#25D366] hover:bg-[#1da851] text-white text-center text-sm font-semibold py-2.5 rounded-xl transition-colors"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Start Chat on WhatsApp
          </a>
        </div>
      )}

      {/* WhatsApp icon button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative w-16 h-16 rounded-full overflow-hidden shadow-2xl shadow-green-500/40 hover:scale-110 transition-transform animate-pulse-red"
        aria-label="Chat on WhatsApp"
        style={{ animation: "pulseRed 2.5s ease-in-out infinite" }}
      >
        {open ? (
          <div className="w-full h-full bg-[#25D366] flex items-center justify-center">
            <X size={24} className="text-white" />
          </div>
        ) : (
          <Image
            src="/whatsapp.png"
            alt="WhatsApp"
            fill
            className="object-contain"
          />
        )}
      </button>
    </div>
  );
}
