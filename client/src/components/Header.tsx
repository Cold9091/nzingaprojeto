import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigation = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    } else {
      setLocation("/");
      setTimeout(() => {
        const newElement = document.getElementById(sectionId);
        if (newElement) {
          const headerOffset = 80;
          const elementPosition = newElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full bg-black bg-opacity-95 z-50 py-4 transition-all duration-300 ${scrollPosition > 50 ? 'py-3 shadow-lg' : 'py-4'}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <a className="logo-underline">
              <h1 className="text-white text-2xl font-bold tracking-wider">NZINGA</h1>
            </a>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button onClick={() => handleNavigation("hero")} className="text-white hover-underline font-medium">Home</button>
            <button onClick={() => handleNavigation("servicos")} className="text-white hover-underline font-medium">Serviços</button>
            <button onClick={() => handleNavigation("portfolio")} className="text-white hover-underline font-medium">Portfólio</button>
            <button onClick={() => handleNavigation("sobre")} className="text-white hover-underline font-medium">Sobre</button>
            <Button 
              onClick={() => handleNavigation("contacto")} 
              className="bg-[#FFC400] text-black hover:bg-[#FFC400]/90"
            >
              Contacto
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white text-2xl focus:outline-none"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}>
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              )}
            </i>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`lg:hidden bg-black bg-opacity-95 absolute w-full py-6 transition-all duration-300 transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <button onClick={() => handleNavigation("hero")} className="text-white py-2 font-medium border-b border-gray-800">Home</button>
          <button onClick={() => handleNavigation("servicos")} className="text-white py-2 font-medium border-b border-gray-800">Serviços</button>
          <button onClick={() => handleNavigation("portfolio")} className="text-white py-2 font-medium border-b border-gray-800">Portfólio</button>
          <button onClick={() => handleNavigation("sobre")} className="text-white py-2 font-medium border-b border-gray-800">Sobre</button>
          <Button 
            onClick={() => handleNavigation("contacto")} 
            className="bg-[#FFC400] text-black hover:bg-[#FFC400]/90 py-3 mt-4"
          >
            Contacto
          </Button>
        </div>
      </div>
    </header>
  );
}
