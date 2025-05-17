import { useEffect, useState } from "react";

// Importar as imagens logos
import unitelLogo from "/images/client-logos/unitel.png";
import yangoLogo from "/images/client-logos/yango.png";
import refriangoLogo from "/images/client-logos/refriango.png";
import centroOpticoLogo from "/images/client-logos/centro-optico.png";
import bekoLogo from "/images/client-logos/beko.png";
import ecoangolaLogo from "/images/client-logos/ecoangola.png";

export default function ClientLogosCarousel() {
  const [position, setPosition] = useState(0);
  
  // Logos das empresas parceiras
  const logos = [
    {
      name: "Unitel",
      image: unitelLogo,
      width: 180,
      alt: "Logo da Unitel"
    },
    {
      name: "Yango",
      image: yangoLogo,
      width: 180,
      alt: "Logo da Yango"
    },
    {
      name: "Refriango",
      image: refriangoLogo,
      width: 180,
      alt: "Logo da Refriango"
    },
    {
      name: "Centro Óptico",
      image: centroOpticoLogo,
      width: 180,
      alt: "Logo do Centro Óptico"
    },
    {
      name: "Beko",
      image: bekoLogo,
      width: 180,
      alt: "Logo da Beko"
    },
    {
      name: "Ecoangola",
      image: ecoangolaLogo,
      width: 180,
      alt: "Logo da Ecoangola"
    }
  ];
  
  // Duplicar o array de logos para criar efeito infinito
  const duplicatedLogos = [...logos, ...logos];
  
  // Efeito para animar o carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => {
        // Reset quando todos os logos já passaram
        if (prevPosition <= -logos.length * 250) {
          return 0;
        }
        return prevPosition - 1; // Movimento gradual para a esquerda
      });
    }, 20); // Velocidade do movimento
    
    return () => clearInterval(interval);
  }, [logos.length]);
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 mb-10">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Empresas que confiam na Nzinga</h3>
          <div className="w-20 h-1 bg-[#FFC400] mx-auto mt-4"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Orgulhamo-nos de trabalhar com estas marcas de referência, ajudando-as a elevar a sua comunicação e estratégia.
          </p>
        </div>
      </div>
      
      <div className="relative w-full overflow-hidden">
        {/* Gradiente esquerdo para efeito de fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900"></div>
        
        {/* Carrossel infinito */}
        <div 
          className="flex items-center py-8 transition-transform duration-1000"
          style={{ transform: `translateX(${position}px)` }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div 
              key={`${logo.name}-${index}`} 
              className="mx-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
            >
              <img 
                src={logo.image} 
                alt={logo.alt}
                className="h-16 md:h-20 object-contain transition-transform duration-300 hover:scale-110"
                style={{ minWidth: "200px" }}
              />
            </div>
          ))}
        </div>
        
        {/* Gradiente direito para efeito de fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900"></div>
      </div>
    </section>
  );
}