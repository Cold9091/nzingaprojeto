import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialSection from "@/components/TestimonialSection";
import LogoCarouselWithFallback from "@/components/LogoCarouselWithFallback";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

export default function Home() {
  // Add a scroll position restoration on page load
  useEffect(() => {
    window.scrollTo(0, 0);

    // Add smooth scrolling for anchor links manually
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        
        const targetElement = document.getElementById(href.substring(1));
        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Nzinga - Comunicação, Imagem e Estratégia</title>
        <meta name="description" content="Transformamos sua marca em uma experiência memorável. Agência de comunicação, imagem e estratégia para marcas que desejam se destacar no mercado." />
      </Helmet>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <LogoCarouselWithFallback />
        <AboutSection />
        <TestimonialSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
