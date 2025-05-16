import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import logoSvg from "@/assets/logo.svg";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [, setLocation] = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollPosition(currentScrollY);
      
      // Esconder ao rolar para baixo, mostrar ao rolar para cima
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

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

  // Classes dinâmicas do header
  const headerClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-500 
                        ${scrollPosition > 50 ? 'py-2 glass-dark shadow-lg' : 'py-4 bg-transparent'} 
                        ${isVisible ? 'translate-y-0' : '-translate-y-full'}`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <a className="logo-container group">
              <div className="flex items-center">
                <img 
                  src={logoSvg} 
                  alt="Nzinga Logo" 
                  className="h-12 w-auto transition-all duration-300 group-hover:scale-105"
                />
              </div>
            </a>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            <button 
              onClick={() => handleNavigation("hero")} 
              className="text-white hover-underline font-medium transition-all duration-300 hover:text-[#FFC400]"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation("servicos")} 
              className="text-white hover-underline font-medium transition-all duration-300 hover:text-[#FFC400]"
            >
              Serviços
            </button>
            <button 
              onClick={() => handleNavigation("portfolio")} 
              className="text-white hover-underline font-medium transition-all duration-300 hover:text-[#FFC400]"
            >
              Portfólio
            </button>
            <button 
              onClick={() => handleNavigation("sobre")} 
              className="text-white hover-underline font-medium transition-all duration-300 hover:text-[#FFC400]"
            >
              Sobre
            </button>
            <Button 
              onClick={() => handleNavigation("contacto")} 
              className="bg-[#FFC400] text-black hover:bg-[#FFC400]/90 shadow-md hover:shadow-[#FFC400]/20 hover:shadow-lg font-medium rounded-md px-6 py-2.5 transition-all duration-300 hover:translate-y-[-2px]"
            >
              Contacto
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white text-2xl focus:outline-none z-50 relative"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <div className={`transition-all duration-300 ${mobileMenuOpen ? 'rotate-90 scale-110' : ''}`}>
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              )}
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation - usando glassmorphism */}
      <div className={`lg:hidden glass-dark fixed inset-0 pt-24 transition-all duration-500 transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-[-100%] opacity-0'}`}>
        <div className="container mx-auto px-4 flex flex-col space-y-8">
          <button 
            onClick={() => handleNavigation("hero")} 
            className="text-white text-xl py-4 font-medium border-b border-gray-700 hover:pl-2 transition-all duration-300 hover:text-[#FFC400]"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavigation("servicos")} 
            className="text-white text-xl py-4 font-medium border-b border-gray-700 hover:pl-2 transition-all duration-300 hover:text-[#FFC400]"
          >
            Serviços
          </button>
          <button 
            onClick={() => handleNavigation("portfolio")} 
            className="text-white text-xl py-4 font-medium border-b border-gray-700 hover:pl-2 transition-all duration-300 hover:text-[#FFC400]"
          >
            Portfólio
          </button>
          <button 
            onClick={() => handleNavigation("sobre")} 
            className="text-white text-xl py-4 font-medium border-b border-gray-700 hover:pl-2 transition-all duration-300 hover:text-[#FFC400]"
          >
            Sobre
          </button>
          <Button 
            onClick={() => handleNavigation("contacto")} 
            className="bg-[#FFC400] text-black hover:bg-[#FFC400]/90 py-6 mt-4 text-lg animate-pulse"
          >
            Contacto
          </Button>
        </div>
        
        {/* Elementos decorativos */}
        <div className="absolute bottom-10 right-10 w-20 h-20 border border-[#FFC400]/20 rounded-full animate-rotate opacity-30"></div>
        <div className="absolute bottom-40 left-10 w-32 h-32 border border-[#FFC400]/10 rounded-full animate-rotate opacity-20" style={{ animationDuration: '30s', animationDirection: 'reverse' }}></div>
      </div>
    </header>
  );
}
