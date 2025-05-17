import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Componente Header totalmente refeito
export default function Header() {
  // Estados básicos para controle do menu e efeitos de scroll
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [, setLocation] = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Impedir scroll quando o menu mobile está aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);
  
  // Controle de scroll para mostrar/esconder o header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollPosition(currentScrollY);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Função para navegação entre seções
  const handleNavigation = (sectionId: string) => {
    // Fechar o menu mobile se estiver aberto
    setMobileMenuOpen(false);
    
    // Navegar para a seção
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
      // Se a seção não for encontrada, navegar para a página inicial
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

  // Classes condicionais para o header
  const headerClasses = `fixed top-0 left-0 w-full z-40 transition-all duration-500 
                       ${scrollPosition > 50 
                         ? 'py-2 shadow-lg dark:bg-black/80 bg-white/80 backdrop-blur-md' 
                         : 'py-4 bg-transparent'} 
                       ${isVisible ? 'translate-y-0' : '-translate-y-full'}`;

  return (
    <>
      {/* Header principal */}
      <header className={headerClasses}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="group flex items-center">
              <img 
                src="/images/nzinga-logo.png" 
                alt="Nzinga Logo" 
                className="h-10 md:h-12 w-auto transition-all duration-300 group-hover:scale-105"
              />
            </Link>
            
            {/* Desktop Navigation - visível apenas em telas grandes */}
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
              <button 
                onClick={() => handleNavigation("faq")} 
                className="text-black dark:text-white hover-underline font-medium transition-all duration-300 hover:text-[#FFC400]"
              >
                FAQ
              </button>
              <ThemeToggle />
              <Button 
                onClick={() => handleNavigation("contacto")} 
                className="bg-[#FFC400] text-black hover:bg-[#FFC400]/90 shadow-md hover:shadow-[#FFC400]/20 hover:shadow-lg font-medium rounded-md px-6 py-2.5 transition-all duration-300 hover:translate-y-[-2px]"
              >
                Contacto
              </Button>
            </nav>
            
            {/* Mobile Menu Controls - visível apenas em telas pequenas */}
            <div className="lg:hidden flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-black dark:text-white w-10 h-10 flex items-center justify-center focus:outline-none"
                aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              >
                {mobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Menu Mobile - Completamente separado do header */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Fundo escurecido que cobre toda a tela */}
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setMobileMenuOpen(false)} />
          
          {/* Menu de navegação com fundo sólido */}
          <div className="fixed inset-0 flex flex-col bg-white dark:bg-gray-900 overflow-y-auto">
            {/* Cabeçalho do menu com logo e botão fechar */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                <img 
                  src="/images/nzinga-logo.png" 
                  alt="Nzinga Logo" 
                  className="h-10 w-auto"
                />
              </Link>
              
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-800 dark:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>
            </div>
            
            {/* Itens de navegação */}
            <div className="flex-1 flex flex-col px-6 py-8 space-y-6">
              <button 
                onClick={() => handleNavigation("hero")} 
                className="text-left text-black dark:text-white text-xl py-4 font-medium border-b border-gray-200 dark:border-gray-800 hover:pl-2 transition-all duration-300 hover:text-[#FFC400]"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation("servicos")} 
                className="text-left text-black dark:text-white text-xl py-4 font-medium border-b border-gray-200 dark:border-gray-800 hover:pl-2 transition-all duration-300 hover:text-[#FFC400]"
              >
                Serviços
              </button>
              <button 
                onClick={() => handleNavigation("portfolio")} 
                className="text-left text-black dark:text-white text-xl py-4 font-medium border-b border-gray-200 dark:border-gray-800 hover:pl-2 transition-all duration-300 hover:text-[#FFC400]"
              >
                Portfólio
              </button>
              <button 
                onClick={() => handleNavigation("sobre")} 
                className="text-left text-black dark:text-white text-xl py-4 font-medium border-b border-gray-200 dark:border-gray-800 hover:pl-2 transition-all duration-300 hover:text-[#FFC400]"
              >
                Sobre
              </button>
              <button 
                onClick={() => handleNavigation("faq")} 
                className="text-left text-black dark:text-white text-xl py-4 font-medium border-b border-gray-200 dark:border-gray-800 hover:pl-2 transition-all duration-300 hover:text-[#FFC400]"
              >
                FAQ
              </button>
              <Button 
                onClick={() => handleNavigation("contacto")} 
                className="bg-[#FFC400] text-black hover:bg-[#FFC400]/90 py-5 mt-4 text-lg"
              >
                Contacto
              </Button>
            </div>
            
            {/* Elementos decorativos */}
            <div className="absolute bottom-8 right-8 w-16 h-16 border border-[#FFC400]/20 rounded-full animate-spin-slow"></div>
            <div className="absolute bottom-32 left-8 w-24 h-24 border border-[#FFC400]/10 rounded-full animate-spin-slow-reverse"></div>
          </div>
        </div>
      )}
    </>
  );
}
