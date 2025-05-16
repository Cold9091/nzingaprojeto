import logoSvg from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

interface FooterLinkProps {
  href: string;
  label: string;
  external?: boolean;
}

function FooterLink({ href, label, external = false }: FooterLinkProps) {
  if (external) {
    return (
      <li className="group">
        <a 
          href={href} 
          className="text-gray-400 hover:text-[#FFC400] transition-all duration-300 inline-flex items-center group-hover:translate-x-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </a>
      </li>
    );
  }

  // Para manipular a rolagem para seções
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const sectionId = href.replace('#', '');
    const section = document.getElementById(sectionId);
    
    if (section) {
      const headerOffset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <li className="group">
      <a 
        href={href} 
        onClick={handleClick}
        className="text-gray-400 hover:text-[#FFC400] transition-all duration-300 inline-block group-hover:translate-x-1"
      >
        {label}
      </a>
    </li>
  );
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <a 
      href={href} 
      className="group w-11 h-11 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:text-[#FFC400] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#FFC400]/5"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <div className="transform transition-transform duration-300 group-hover:rotate-12">
        {icon}
      </div>
    </a>
  );
}

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  
  // Detectar quando o footer está visível
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    
    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);
  
  // Voltar para o topo da página
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer 
      ref={footerRef}
      className="relative bg-gradient-to-b from-gray-900 to-black pt-20 pb-8 overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -bottom-48 -right-48 w-96 h-96 border border-[#FFC400]/5 rounded-full"></div>
        <div className="absolute top-60 left-20 w-20 h-20 bg-[#FFC400]/5 rounded-full animate-float" style={{animationDuration: '7s'}}></div>
      </div>
      
      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Coluna da logo e info */}
          <div className={`lg:col-span-1 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="mb-6">
              <img 
                src={logoSvg} 
                alt="Nzinga Logo" 
                className="h-12 w-auto mb-4"
              />
              <p className="text-gray-400 mt-4 leading-relaxed">
                Elevamos marcas através de estratégias inovadoras de comunicação, criatividade e soluções digitais impactantes para o mercado global.
              </p>
            </div>
            
            <div className="mt-8">
              <div className="flex space-x-3">
                <SocialLink 
                  href="https://facebook.com" 
                  label="Facebook"
                  icon={
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  } 
                />
                <SocialLink 
                  href="https://instagram.com" 
                  label="Instagram"
                  icon={
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                  } 
                />
                <SocialLink 
                  href="https://linkedin.com" 
                  label="LinkedIn"
                  icon={
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  } 
                />
                <SocialLink 
                  href="https://twitter.com" 
                  label="Twitter"
                  icon={
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  } 
                />
              </div>
            </div>
          </div>
          
          {/* Colunas de links */}
          <div className={`transition-all duration-700 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h4 className="text-white font-semibold text-lg mb-6 relative">
              <span className="relative z-10">Links Rápidos</span>
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#FFC400]"></span>
            </h4>
            <ul className="space-y-3">
              <FooterLink href="#hero" label="Home" />
              <FooterLink href="#servicos" label="Serviços" />
              <FooterLink href="#portfolio" label="Portfólio" />
              <FooterLink href="#sobre" label="Sobre" />
              <FooterLink href="#depoimentos" label="Depoimentos" />
              <FooterLink href="#contacto" label="Contacto" />
            </ul>
          </div>
          
          <div className={`transition-all duration-700 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h4 className="text-white font-semibold text-lg mb-6 relative">
              <span className="relative z-10">Nossos Serviços</span>
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#FFC400]"></span>
            </h4>
            <ul className="space-y-3">
              <FooterLink href="#" label="Estratégia de Marca" />
              <FooterLink href="#" label="Marketing Digital" />
              <FooterLink href="#" label="Web Design" />
              <FooterLink href="#" label="Design Gráfico" />
              <FooterLink href="#" label="Gestão de Conteúdo" />
              <FooterLink href="#" label="Consultoria Estratégica" />
            </ul>
          </div>
          
          <div className={`transition-all duration-700 delay-400 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h4 className="text-white font-semibold text-lg mb-6 relative">
              <span className="relative z-10">Nosso Contacto</span>
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#FFC400]"></span>
            </h4>
            <ul className="space-y-5 text-gray-400">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#FFC400] mt-1 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>
                  Avenida Agostinho Neto, 245<br />
                  Luanda, Angola
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#FFC400] mt-1 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>
                  +244 923 456 789<br />
                  +244 912 345 678
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#FFC400] mt-1 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span>
                  info@nzinga.ao<br />
                  contacto@nzinga.ao
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className={`border-t border-gray-800 py-8 mb-8 transition-all duration-700 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-white font-semibold text-lg mb-2">Inscreva-se na nossa newsletter</h4>
              <p className="text-gray-400">Receba dicas de marketing e atualizações sobre nossos serviços</p>
            </div>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="py-3 px-4 bg-white/5 border border-white/10 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FFC400] focus:border-transparent w-full"
              />
              <Button className="bg-[#FFC400] text-black hover:bg-[#FFC400]/90 rounded-l-none">
                Inscrever
              </Button>
            </div>
          </div>
        </div>
        
        {/* Copyright e links legais */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Nzinga - Comunicação, Imagem e Estratégia. Todos os direitos reservados.
            </p>
            <div className="flex space-x-8 mt-4 md:mt-0 text-sm">
              <a href="#" className="text-gray-400 hover:text-[#FFC400] transition-colors duration-300">Política de Privacidade</a>
              <a href="#" className="text-gray-400 hover:text-[#FFC400] transition-colors duration-300">Termos de Serviço</a>
              <a href="#" className="text-gray-400 hover:text-[#FFC400] transition-colors duration-300">Cookies</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Botão para voltar ao topo */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:text-[#FFC400] hover:border-[#FFC400]/50 transition-all duration-300 z-50 shadow-lg group"
        aria-label="Voltar ao topo"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="transform group-hover:-translate-y-1 transition-transform duration-300"
        >
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </button>
    </footer>
  );
}
