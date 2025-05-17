import { useEffect, useState } from "react";

// Import company logos
import unitelLogo from '../assets/image_1747500014834.png';
import ecoAngolaLogo from '../assets/image_1747500127588.png';
import centroOpticoLogo from '../assets/image_1747500192220.png';
import refriangoLogo from '../assets/image_1747500237124.png';
import bekoLogo from '../assets/image_1747500277811.png';

// Component to render each individual logo
const LogoItem = ({ image, name }: { image: string; name: string }) => {
  return (
    <div className="mx-12 flex items-center justify-center transition-all duration-300 hover:scale-110">
      <div 
        className="h-16 md:h-20 flex items-center justify-center p-4"
        style={{ 
          minWidth: "180px"
        }}
      >
        <img 
          src={image} 
          alt={`${name} logo`} 
          className="h-full object-contain"
        />
      </div>
    </div>
  );
};

export default function LogoCarouselWithFallback() {
  const [position, setPosition] = useState(0);
  
  // List of companies with their logo images
  const companyLogos = [
    { name: "Unitel", image: unitelLogo },
    { name: "Eco Angola", image: ecoAngolaLogo },
    { name: "Centro Óptico", image: centroOpticoLogo },
    { name: "Refriango", image: refriangoLogo },
    { name: "Beko", image: bekoLogo }
  ];
  
  // Duplicate logos for infinite effect
  const duplicatedLogos = [...companyLogos, ...companyLogos];
  
  // Effect to animate the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => {
        // Reset when all logos have passed
        if (prevPosition <= -companyLogos.length * 250) {
          return 0;
        }
        return prevPosition - 1; // Gradual movement to the left
      });
    }, 20); // Speed of movement
    
    return () => clearInterval(interval);
  }, [companyLogos.length]);
  
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
        {/* Left gradient for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900"></div>
        
        {/* Infinite carousel */}
        <div 
          className="flex items-center py-8 transition-transform duration-1000"
          style={{ transform: `translateX(${position}px)` }}
        >
          {duplicatedLogos.map((company, index) => (
            <LogoItem 
              key={`${company.name}-${index}`} 
              name={company.name} 
              image={company.image}
            />
          ))}
        </div>
        
        {/* Right gradient for fade effect */}
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900"></div>
      </div>
    </section>
  );
}