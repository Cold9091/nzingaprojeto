import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  slug: string;
  index: number;
  isHovered: boolean;
  onHover: (index: number) => void;
  onLeave: () => void;
}

function ServiceCard({ icon, title, description, slug, index, isHovered, onHover, onLeave }: ServiceCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, index * 200); // Escalonar a entrada
        }
      },
      { threshold: 0.2 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  const handleCardClick = () => {
    navigate(`/servico/${slug}`);
  };

  return (
    <div 
      ref={cardRef} 
      className={`transform transition-all duration-700 ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-20 opacity-0'
      }`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
    >
      <Card 
        className={`h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl rounded-xl overflow-hidden glass-card cursor-pointer border ${
          isHovered 
            ? 'scale-105 shadow-2xl border-[#FFC400]' 
            : 'scale-100 border-gray-100 dark:border-gray-700'
        } transition-all duration-500`}
        onClick={handleCardClick}
      >
        <CardContent className="p-8 relative h-full">
          {/* Círculo decorativo com animação de pulso */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#FFC400] opacity-5 rounded-full"></div>
          
          {/* Ícone com efeito de destaque */}
          <div className={`relative z-10 w-16 h-16 bg-[#FFC400] bg-opacity-10 rounded-full flex items-center justify-center mb-6 ${
            isHovered ? 'animate-pulse shadow-md shadow-[#FFC400]/30' : ''
          }`}>
            <div className={`transition-transform duration-500 ${
              isHovered ? 'scale-125 rotate-12' : 'scale-100 rotate-0'
            }`}>
              {icon}
            </div>
          </div>
          
          {/* Título com efeito de destaque */}
          <h3 className={`font-bold text-2xl mb-4 transition-colors duration-300 ${
            isHovered ? 'text-[#FFC400]' : 'text-black dark:text-white'
          }`}>
            {title}
          </h3>
          
          {/* Descrição */}
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 transition-colors duration-300">
            {description}
          </p>
          
          {/* Link "Saiba mais" que aparece ao passar o mouse */}
          <div className={`transition-all duration-300 flex items-center mt-auto ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <span className="text-[#FFC400] font-semibold flex items-center">
              Ver detalhes
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
                className="ml-2 transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Para detectar quando a seção está visível na tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const handleHover = (index: number) => {
    setHoveredIndex(index);
  };
  
  const handleLeave = () => {
    setHoveredIndex(null);
  };
  
  const services = [
    {
      slug: "estrategia-de-marca",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#FFC400" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="m3 11 18-5v12L3 14v-3z"></path>
          <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
        </svg>
      ),
      title: "Estratégia de Marca",
      description: "Desenvolvemos identidades de marca autênticas e poderosas que conectam sua empresa ao seu público-alvo e diferenciam você da concorrência. Analisamos seu mercado, concorrentes e valores para criar posicionamentos estratégicos."
    },
    {
      slug: "design-grafico",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#FFC400" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="13.5" cy="6.5" r="2.5"></circle>
          <circle cx="17.5" cy="10.5" r="2.5"></circle>
          <circle cx="8.5" cy="7.5" r="2.5"></circle>
          <circle cx="6.5" cy="12.5" r="2.5"></circle>
          <path d="M12 22v-6"></path>
          <path d="M14.5 18h-5"></path>
          <path d="M13.75 6.5 17 10"></path>
          <path d="M8.75 7.5 7 11"></path>
          <path d="M11.5 6.5l-3 1"></path>
          <path d="M16.5 10.5l-1 2"></path>
        </svg>
      ),
      title: "Design Gráfico",
      description: "Nossa equipe de designers criativos desenvolve materiais visuais que comunicam a essência da sua marca com impacto e elegância. Desde logotipos até materiais impressos e digitais completos que garantem consistência em todos os pontos de contato."
    },
    {
      slug: "marketing-digital",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#FFC400" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
          <path d="M2 12h20"></path>
        </svg>
      ),
      title: "Marketing Digital",
      description: "Transformamos sua presença online com estratégias digitais que geram resultados mensuráveis e conversões efetivas. Utilizamos análise de dados para otimizar campanhas em redes sociais, SEO, email marketing e publicidade paga para atingir seus objetivos."
    },
    {
      slug: "web-design",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#FFC400" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2"></rect>
          <path d="M7 7h.01"></path>
          <path d="M11 7h.01"></path>
          <path d="M15 7h.01"></path>
          <path d="M7 11h.01"></path>
          <path d="M11 11h.01"></path>
          <path d="M15 11h.01"></path>
          <path d="M7 15h.01"></path>
          <path d="M11 15h.01"></path>
          <path d="M15 15h.01"></path>
        </svg>
      ),
      title: "Web Design",
      description: "Criamos websites e aplicações web que combinam design excepcional com funcionalidade intuitiva. Nossos sites são responsivos, otimizados para SEO e focados em conversão, proporcionando uma experiência de usuário premium para seu público."
    },
    {
      slug: "gestao-de-conteudo",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#FFC400" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M8 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-2"></path>
          <path d="M9 2h6v4H9z"></path>
          <path d="M7 8h10"></path>
          <path d="M7 12h10"></path>
          <path d="M7 16h10"></path>
        </svg>
      ),
      title: "Gestão de Conteúdo",
      description: "Produzimos conteúdo estratégico que comunica sua mensagem, aumenta seu alcance e estabelece sua autoridade no setor. Nossa abordagem combina pesquisa de palavras-chave, storytelling poderoso e análise de dados para criar conteúdo que engaja e converte."
    },
    {
      slug: "consultoria-estrategica",
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#FFC400" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 16v-4"></path>
          <path d="M12 8h.01"></path>
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      ),
      title: "Consultoria Estratégica",
      description: "Oferecemos consultoria especializada para ajudar sua empresa a identificar oportunidades de crescimento, superar desafios e implementar estratégias eficazes. Analisamos profundamente seu negócio, mercado e concorrência para desenvolver soluções personalizadas."
    }
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById("contacto");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="servicos" 
      ref={sectionRef}
      className="py-28 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black relative overflow-hidden transition-colors duration-300"
    >
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC400] opacity-[0.03] rounded-full transform -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFC400] opacity-[0.03] rounded-full transform translate-y-1/3 -translate-x-1/3"></div>
      
      <div className="container mx-auto px-4 lg:px-8">
        <div className={`text-center mb-20 transition-all duration-1000 transform ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-block">
            <span className="text-[#FFC400] font-semibold uppercase tracking-wider text-sm">O que fazemos</span>
          </div>
          <h2 className="text-black dark:text-white font-bold text-4xl md:text-5xl mt-4 mb-6 transition-colors duration-300">Nossos Serviços</h2>
          <div className="w-24 h-1 bg-[#FFC400] mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-6 text-lg transition-colors duration-300">
            Oferecemos soluções estratégicas e criativas que impulsionam marcas a se destacarem no mercado competitivo atual.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              index={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              slug={service.slug}
              isHovered={hoveredIndex === index}
              onHover={handleHover}
              onLeave={handleLeave}
            />
          ))}
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Button 
            onClick={scrollToContact}
            className="bg-black dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 text-white py-6 px-8 rounded-lg font-medium group shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <span>Entre em contato para saber mais</span>
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
              className="ml-2 transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}
