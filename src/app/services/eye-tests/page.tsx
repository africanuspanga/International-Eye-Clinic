import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { ArrowRight, Microscope } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eye Tests & Diagnostics | International Eye Hospital",
  description: "Comprehensive eye diagnostics including OCT, FFA, Corneal Topography, Tonometry, Visual Field, A-Scan and more.",
};

const tests = [
  { name: "OCT", desc: "Optical Coherence Tomography for detailed retinal imaging" },
  { name: "Fundus Fluorescein Angiography (FFA)", desc: "Eye angiography to examine blood flow in the retina" },
  { name: "Corneal Topography", desc: "Mapping the curvature of the cornea" },
  { name: "Keratometry", desc: "Measuring the curvature of the cornea" },
  { name: "Pachymetry", desc: "Measuring corneal thickness" },
  { name: "Tonometry", desc: "Measuring intraocular pressure for glaucoma screening" },
  { name: "Visual Field Test", desc: "Checking peripheral and central vision" },
  { name: "A-Scan Ultrasound", desc: "Measuring eye length for IOL calculation" },
  { name: "Automated Refraction", desc: "Determining lens prescription accurately" },
];

export default function EyeTestsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Diagnostics"
          title="Eye Tests"
          highlight="& Diagnostics"
          description="State-of-the-art diagnostic equipment to accurately assess your eye health and guide treatment decisions."
          breadcrumbs={[{ label: "Services", href: "/services" }, { label: "Eye Tests", href: "/services/eye-tests" }]}
          cta={{ label: "Book Appointment", href: "/appointment" }}
        />

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tests.map((test) => (
                <div key={test.name} className="bg-[#f8f9fc] rounded-2xl p-6 border border-gray-100 hover:border-[#1a2a6c]/20 hover:shadow-md transition-all">
                  <div className="w-11 h-11 rounded-xl bg-[#e8edf7] flex items-center justify-center text-[#1a2a6c] mb-4">
                    <Microscope size={20} />
                  </div>
                  <h3 className="font-bold text-[#111827] text-base mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {test.name}
                  </h3>
                  <p className="text-[#6b7280] text-sm leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {test.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link
                href="/appointment"
                className="inline-flex items-center gap-2 bg-[#e62d26] hover:bg-[#c4201a] text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Schedule Your Eye Test <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
