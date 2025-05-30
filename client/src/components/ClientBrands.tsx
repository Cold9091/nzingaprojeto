import { useEffect, useState, useRef } from "react";

// Importar logos das empresas
import unitelLogo from '../assets/image_1747500014834.png';
import ecoAngolaLogo from '../assets/image_1747500127588.png';
import centroOpticoLogo from '../assets/image_1747500192220.png';
import refriangoLogo from '../assets/image_1747500237124.png';
import bekoLogo from '../assets/image_1747500277811.png';

export default function ClientBrands() {
  const [position, setPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Lista das empresas com seus logos
  const brands = [
    {
      name: "Unitel",
      image: unitelLogo
    },
    {
      name: "Eco Angola",
      image: ecoAngolaLogo
    },
    {
      name: "Centro Óptico",
      image: centroOpticoLogo
    },
    {
      name: "Refriango",
      image: refriangoLogo
    },
    {
      name: "Beko",
      image: bekoLogo
    }
  ];
  
  // Duplicar os brands para criar efeito infinito
  const duplicatedBrands = [...brands, ...brands, ...brands];
  
  // Efeito para animar o carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => {
        // Reset quando todos os logos já passaram
        if (prevPosition <= -brands.length * 220) {
          return 0;
        }
        return prevPosition - 1; // Movimento gradual para a esquerda
      });
    }, 20); // Velocidade do movimento
    
    return () => clearInterval(interval);
  }, [brands.length]);
  
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
          ref={carouselRef}
          className="flex items-center py-8 transition-transform duration-1000"
          style={{ transform: `translateX(${position}px)` }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div 
              key={`${brand.name}-${index}`} 
              className="mx-10 flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <div 
                className="flex items-center justify-center p-4 h-20"
                style={{ 
                  minWidth: "180px",
                  background: "transparent"
                }}
              >
                <img 
                  src={brand.image} 
                  alt={`${brand.name} logo`} 
                  className="h-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Gradiente direito para efeito de fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900"></div>
      </div>
    </section>
  );
}