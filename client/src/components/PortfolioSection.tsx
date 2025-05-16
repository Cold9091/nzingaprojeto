import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

interface PortfolioItemProps {
  image: string;
  title: string;
  category: string;
  alt: string;
  client: string;
  description: string;
  index: number;
  setSelected: (index: number | null) => void;
  isSelected: boolean;
}

function PortfolioItem({ 
  image, 
  title, 
  category, 
  alt, 
  client, 
  description,
  index,
  setSelected,
  isSelected 
}: PortfolioItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, index * 150); // Escalonar a entrada
        }
      },
      { threshold: 0.1 }
    );
    
    if (itemRef.current) {
      observer.observe(itemRef.current);
    }
    
    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, [index]);

  const handleClick = () => {
    setSelected(isSelected ? null : index);
  };

  return (
    <div 
      ref={itemRef}
      className={`transform transition-all duration-700 ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-20 opacity-0'
      }`}
    >
      <div 
        onClick={handleClick}
        className={`group cursor-pointer overflow-hidden rounded-xl shadow-2xl relative transition-all duration-500 ${
          isSelected 
            ? 'scale-100 z-30' 
            : 'hover:scale-105 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]'
        }`}
      >
        <div className="aspect-w-16 aspect-h-10 overflow-hidden">
          <img 
            src={image}
            alt={alt}
            className={`w-full h-full object-cover transition-transform duration-700 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}
          />
        </div>
        
        {/* Overlay */}
        <div 
          className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-all duration-500 ${
            isSelected 
              ? 'opacity-100' 
              : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          {/* Conteúdo do overlay */}
          <div className={`p-6 transition-all duration-500 ${
            isSelected 
              ? 'translate-y-0' 
              : 'translate-y-4 group-hover:translate-y-0'
          }`}>
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-block bg-[#FFC400]/80 backdrop-blur-sm text-black text-xs font-bold uppercase tracking-wider px-2 py-1 rounded mb-2">
                  {category}
                </span>
                <h3 className="text-white font-bold text-xl md:text-2xl">{title}</h3>
                <p className="text-gray-300 mt-1">Cliente: {client}</p>
              </div>
              
              {/* Botão para expandir/recolher */}
              <button 
                className={`w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-transform duration-300 ${
                  isSelected ? 'rotate-45' : ''
                }`}
              >
                {isSelected ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14"></path>
                    <path d="M5 12h14"></path>
                  </svg>
                )}
              </button>
            </div>
            
            {/* Detalhes extras visíveis quando expandido */}
            <div className={`overflow-hidden transition-all duration-500 ${
              isSelected ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
            }`}>
              <p className="text-white/90 text-sm leading-relaxed">
                {description}
              </p>
              <div className="flex mt-4 space-x-3">
                <Button 
                  size="sm" 
                  className="bg-[#FFC400] text-black hover:bg-[#FFC400]/80 shadow-lg text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  Ver estudo de caso
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  Ver website
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState('todos');
  
  // Para detectar quando a seção está visível na tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
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

  const portfolioItems = [
    {
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Rebranding Corporativo Banco Nacional",
      category: "Identidade Visual",
      client: "Banco Nacional de Angola",
      description: "Renovamos completamente a identidade visual do Banco Nacional, trazendo um visual mais contemporâneo e alinhado com os valores da instituição, mantendo sua história e reconhecimento no mercado financeiro angolano.",
      alt: "Projeto de identidade visual corporativa com elementos modernos"
    },
    {
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Campanha Lançamento Smartphone X10",
      category: "Marketing Digital",
      client: "Telecom Angola",
      description: "Desenvolvemos a estratégia completa para o lançamento do novo smartphone premium da Telecom Angola, incluindo materiais digitais, vídeos promocionais e gerenciamento de redes sociais, resultando em um aumento de 85% nas vendas de pré-lançamento.",
      alt: "Campanha publicitária moderna para lançamento de produto"
    },
    {
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Website Turismo Luanda",
      category: "Web Design",
      client: "Departamento de Turismo",
      description: "Criamos um site imersivo e interativo para promover o turismo em Luanda, com recursos de realidade aumentada, mapas interativos e experiências personalizadas que destacam os principais pontos turísticos e a rica cultura local.",
      alt: "Design moderno de website com influência africana"
    },
    {
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&crop=entropy",
      title: "Campanha Social 'Educação Para Todos'",
      category: "Campanha Social",
      client: "Ministério da Educação",
      description: "Desenvolvemos uma campanha nacional de conscientização sobre a importância da educação, com materiais para TV, rádio e mídias digitais, que ajudou a aumentar em 15% as matrículas escolares no interior do país.",
      alt: "Campanha de conscientização social com foco em educação"
    },
    {
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Identidade Visual Festival Cultural",
      category: "Identidade Visual",
      client: "Festival de Artes de Angola",
      description: "Criamos a identidade visual completa para o maior festival de artes do país, incluindo logo, sinalização, materiais promocionais e merchandising, capturando a essência vibrante da cultura angolana contemporânea.",
      alt: "Materiais de identidade visual para festival cultural"
    },
    {
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Aplicativo Móvel Saúde+",
      category: "Desenvolvimento",
      client: "Global Health Initiative",
      description: "Desenvolvemos um aplicativo inovador que conecta pacientes e profissionais de saúde, facilitando consultas, marcação de exames e acesso a resultados, melhorando significativamente o acesso a serviços médicos nas regiões remotas.",
      alt: "Interface de aplicativo móvel para área de saúde"
    }
  ];
  
  const filteredItems = filter === 'todos' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contacto");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  // Depois que um item é selecionado, rolar até ele
  useEffect(() => {
    if (selectedItem !== null && itemRefs.current[selectedItem]) {
      const itemElement = itemRefs.current[selectedItem];
      if (itemElement) {
        setTimeout(() => {
          itemElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }, 100);
      }
    }
  }, [selectedItem]);
  
  // Referências para os itens do portfólio
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section 
      id="portfolio" 
      ref={sectionRef}
      className="py-28 relative bg-gray-50 overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#FFC400] rounded-full blur-[100px]"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-[#FFC400] rounded-full blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 transform ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-block">
            <span className="text-[#FFC400] font-semibold uppercase tracking-wider text-sm">Projetos destacados</span>
          </div>
          <h2 className="text-black font-bold text-4xl md:text-5xl mt-4 mb-6">Nosso Portfólio</h2>
          <div className="w-24 h-1 bg-[#FFC400] mx-auto"></div>
          <p className="text-gray-600 max-w-2xl mx-auto mt-6 text-lg">
            Conheça alguns dos nossos projetos mais recentes e como transformamos desafios em soluções criativas que impactam positivamente o mercado.
          </p>
        </div>
        
        {/* Filtros */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 delay-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          {['todos', 'Identidade Visual', 'Marketing Digital', 'Web Design', 'Campanha Social', 'Desenvolvimento'].map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedItem(null);
                setFilter(category);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === category 
                  ? 'bg-[#FFC400] text-black shadow-lg' 
                  : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
              }`}
            >
              {category === 'todos' ? 'Todos' : category}
            </button>
          ))}
        </div>
        
        {/* Grid de projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div key={index} ref={el => itemRefs.current[index] = el}>
              <PortfolioItem 
                image={item.image}
                title={item.title}
                category={item.category}
                client={item.client}
                description={item.description}
                alt={item.alt}
                index={index}
                setSelected={setSelectedItem}
                isSelected={selectedItem === index}
              />
            </div>
          ))}
        </div>

        {/* Botão de ação */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Button 
            onClick={scrollToContact}
            className="bg-[#FFC400] text-black hover:bg-[#FFC400]/90 py-6 px-8 rounded-lg font-medium group shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <span>Vamos criar algo incrível juntos</span>
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
