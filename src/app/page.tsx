import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
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
