import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Services from "../components/sections/Services";
import Projects from "../components/sections/Projects";
import FeaturedProduct from "../components/sections/FeaturedProduct";
import Process from "../components/sections/Process";
import Contact from "../components/sections/Contact";
import WhatsAppButton from "../components/common/WhatsAppButton";

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <Navbar />

      <main className="bg-white">
        <Hero />
        <About />
        <Services />
        <Projects />
        <FeaturedProduct />
        <Process />
        <Contact />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}