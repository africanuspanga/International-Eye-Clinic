import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import QuickBook from "@/components/QuickBook";
import TrustStrip from "@/components/TrustStrip";
import About from "@/components/About";
import Services from "@/components/Services";
import Doctors from "@/components/Doctors";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import BlogPreview from "@/components/BlogPreview";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import AppointmentSection from "@/components/AppointmentSection";
import { BreadcrumbJsonLd } from "@/components/StructuredData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "International Eye Hospital | World-Class Eye Care in Tanzania",
  description:
    "International Eye Hospital in Dar es Salaam offers advanced eye care — cataract surgery, retina treatment, glaucoma, and more. Internationally trained ophthalmologists since 2014.",
  alternates: {
    canonical: "https://www.internationaleyehospital.com",
  },
  openGraph: {
    title: "International Eye Hospital | World-Class Eye Care in Tanzania",
    description:
      "Advanced eye care with internationally trained specialists. Book your appointment today.",
    url: "https://www.internationaleyehospital.com",
    images: [
      {
        url: "/images/hero/slide-1.jpeg",
        width: 1200,
        height: 630,
        alt: "International Eye Hospital - Advanced eye care in Dar es Salaam, Tanzania",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Home", url: "https://www.internationaleyehospital.com/" }]}
      />
      <Navbar />
      <main>
        <Hero />
        <SearchBar />
        <QuickBook />
        <AppointmentSection />
        <TrustStrip />
        <About />
        <Services />
        <Doctors />
        <Gallery />
        <Testimonials />
        <BlogPreview />
        <CTA />
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
