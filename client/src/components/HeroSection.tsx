import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Controlar a interação de mouse com o fundo
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Efeito de carregamento suave
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);
  
  const scrollToServices = () => {
    const servicesSection = document.getElementById("servicos");
    if (servicesSection) {
      const headerOffset = 80;
      const elementPosition = servicesSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };
  
  // Calcular a posição dos elementos decorativos baseado no mouse
  const calculatePosition = (baseValue: number, influence: number) => {
    return baseValue + (mousePosition.x - 0.5) * influence;
  };

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="hero-gradient min-h-screen relative flex items-center overflow-hidden"
      style={{
        backgroundPosition: `${50 + (mousePosition.x - 0.5) * 10}% ${50 + (mousePosition.y - 0.5) * 10}%`
      }}
    >
      {/* Efeito de partículas flutuantes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-[#FFC400] opacity-10 animate-float"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Overlay gradiente para melhorar contraste */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
      
      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 lg:px-8 py-24 pt-32 relative z-20">
        <div className="flex flex-col max-w-3xl">
          <div className={`overflow-hidden ${isLoaded ? 'mb-2' : 'mb-0'}`}>
            <span className="inline-block text-[#FFC400] font-bold text-xl mb-4 animate-fade-in-right delay-100 tracking-wider uppercase">
              Agência de Comunicação & Estratégia
            </span>
          </div>
          
          <div className="overflow-hidden">
            <h1 className={`text-white font-extrabold text-5xl md:text-6xl lg:text-7xl leading-tight animate-fade-in-up ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
              <span className="block">Transformamos</span>
              <span className="block">sua marca em uma</span>
              <span className="block">
                <span className="text-[#FFC400] animate-pulse" style={{animationDuration: '3s'}}>experiência memorável</span>
              </span>
            </h1>
          </div>
          
          <div className="overflow-hidden mt-8">
            <p className="text-white/80 text-lg md:text-xl max-w-2xl animate-fade-in-up delay-300 leading-relaxed backdrop-blur-sm bg-black/5 p-4 rounded-lg glass-dark inline-block">
              Combinamos <span className="text-[#FFC400] font-semibold">criatividade</span>, <span className="text-[#FFC400] font-semibold">estratégia</span> e <span className="text-[#FFC400] font-semibold">tecnologia</span> para elevar a comunicação da sua marca a outro patamar no mercado global.
            </p>
          </div>
          
          <div className="mt-10 animate-fade-in-up delay-500 flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={scrollToServices}
              className="bg-[#FFC400] text-black hover:bg-[#FFC400]/90 py-6 px-8 font-semibold group shadow-lg hover:shadow-[#FFC400]/30 transition-all duration-300 hover:translate-y-[-5px] rounded-md overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center">
                Conheça Nossos Serviços
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
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
              <span className="absolute inset-0 bg-white/20 animate-shimmer"></span>
            </Button>
            
            <Button
              onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              className="border-white/30 text-white py-6 px-8 font-medium hover:bg-white/10 backdrop-blur transition-all duration-300 group rounded-md glass mt-2 sm:mt-0"
            >
              Fale Conosco
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
                <path d="m22 2-7 20-4-9-9-4Z"></path>
                <path d="M22 2 11 13"></path>
              </svg>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Elementos decorativos avançados */}
      <div 
        className="absolute bottom-20 right-20 hidden lg:block animate-float" 
        style={{
          left: `${calculatePosition(70, 30)}%`,
          top: `${calculatePosition(70, 10)}%`
        }}
      >
        <div className="w-40 h-40 border border-[#FFC400]/30 rounded-full backdrop-blur-sm animate-rotate" style={{animationDuration: '20s'}}></div>
      </div>
      
      <div 
        className="absolute top-1/3 right-20 hidden lg:block animate-float" 
        style={{
          left: `${calculatePosition(20, 10)}%`,
          top: `${calculatePosition(30, 15)}%`
        }}
      >
        <div className="w-24 h-24 border border-[#FFC400]/20 animate-rotate" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
      </div>
      
      <div 
        className="absolute bottom-40 left-20 hidden lg:block animate-float"
        style={{animationDelay: '1s'}}
      >
        <div className="w-32 h-32 glass-dark rounded-xl rotate-45 animate-pulse" style={{animationDuration: '8s'}}></div>
      </div>
      
      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:flex flex-col items-center">
        <span className="text-white/50 text-sm mb-2">Scroll</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-[#FFC400]"
        >
          <path d="M12 5v14"></path>
          <path d="m19 12-7 7-7-7"></path>
        </svg>
      </div>
    </section>
  );
}
