import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Header() {
  // States for controlling menu and scroll behaviors
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [, setLocation] = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Ref para o container do menu mobile
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  // Handler para fechar o menu ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && 
          mobileMenuRef.current && 
          !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    // Previnir scroll quando o menu mobile está aberto
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  // Handler para controlar efeitos de scroll
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

  // Função para navegação suave entre seções
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

  // Alternar o menu mobile
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  // Classes dinâmicas do header
  const headerClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-500 
                        ${scrollPosition > 50 
                          ? 'py-2 shadow-lg dark:bg-black/80 bg-white/80 backdrop-blur-md' 
                          : 'py-4 bg-transparent'} 
                        ${isVisible ? 'translate-y-0' : '-translate-y-full'}`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="logo-container group flex items-center relative z-50">
            <img 
              src="/images/nzinga-logo.png" 
              alt="Nzinga Logo" 
              className="h-10 md:h-12 w-auto transition-all duration-300 group-hover:scale-105"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation("hero")} 
              className="text-black dark:text-white hover-underline font-medium transition-all duration-300 hover:text-[#FFC400]"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation("servicos")} 
              className="text-black dark:text-white hover-underline font-medium transition-all duration-300 hover:text-[#FFC400]"
            >
              Serviços
            </button>
            <button 
              onClick={() => handleNavigation("portfolio")} 
              className="text-black dark:text-white hover-underline font-medium transition-all duration-300 hover:text-[#FFC400]"
            >
              Portfólio
            </button>
            <button 
              onClick={() => handleNavigation("sobre")} 
              className="text-black dark:text-white hover-underline font-medium transition-all duration-300 hover:text-[#FFC400]"
            >
              Sobre
            </button>
            <ThemeToggle />
            <Button 
              onClick={() => handleNavigation("contacto")} 
              className="bg-[#FFC400] text-black hover:bg-[#FFC400]/90 shadow-md hover:shadow-[#FFC400]/20 hover:shadow-lg font-medium rounded-md px-6 py-2.5 transition-all duration-300 hover:translate-y-[-2px]"
            >
              Contacto
            </Button>
          </nav>
          
          {/* Mobile Menu Controls */}
          <div className="lg:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className="text-black dark:text-white w-10 h-10 flex items-center justify-center focus:outline-none relative z-[100]"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <div className={`transition-all duration-300 ${mobileMenuOpen ? 'rotate-90 scale-110' : ''}`}>
                {mobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation - Nova implementação para resolver o problema do fundo transparente */}
      {mobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="lg:hidden fixed inset-0 z-40 overflow-hidden"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} // Overlay escuro para bloquear a visibilidade do conteúdo por trás
        >
          {/* Menu principal com fundo totalmente sólido */}
          <div className="fixed inset-0 pt-24 flex flex-col bg-white dark:bg-black">
            {/* Conteúdo do menu */}
            <div className="container mx-auto px-4 flex flex-col space-y-8 relative z-30">
              <button 
                onClick={() => handleNavigation("hero")} 
                className="text-black dark:text-white text-xl py-4 font-medium border-b border-gray-200 dark:border-gray-800 hover:pl-2 transition-all duration-300 hover:text-[#FFC400]"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation("servicos")} 
                className="text-black dark:text-white text-xl py-4 font-medium border-b border-gray-200 dark:border-gray-800 hover:pl-2 transition-all duration-300 hover:text-[#FFC400]"
              >
                Serviços
              </button>
              <button 
                onClick={() => handleNavigation("portfolio")} 
                className="text-black dark:text-white text-xl py-4 font-medium border-b border-gray-200 dark:border-gray-800 hover:pl-2 transition-all duration-300 hover:text-[#FFC400]"
              >
                Portfólio
              </button>
              <button 
                onClick={() => handleNavigation("sobre")} 
                className="text-black dark:text-white text-xl py-4 font-medium border-b border-gray-200 dark:border-gray-800 hover:pl-2 transition-all duration-300 hover:text-[#FFC400]"
              >
                Sobre
              </button>
              <Button 
                onClick={() => handleNavigation("contacto")} 
                className="bg-[#FFC400] text-black hover:bg-[#FFC400]/90 py-6 mt-4 text-lg"
              >
                Contacto
              </Button>
            </div>
            
            {/* Elementos decorativos sobrepostos ao menu sólido */}
            <div className="absolute bottom-10 right-10 w-20 h-20 border border-[#FFC400]/20 rounded-full opacity-30 z-20 animate-spin-slow"></div>
            <div className="absolute bottom-40 left-10 w-32 h-32 border border-[#FFC400]/10 rounded-full opacity-20 z-20 animate-spin-slow-reverse"></div>
          </div>
        </div>
      )}
    </header>
  );
}
