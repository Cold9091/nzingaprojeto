import { useEffect, useState } from "react";

export default function ClientBrands() {
  const [position, setPosition] = useState(0);
  
  // Lista das empresas com suas cores representativas
  const brands = [
    {
      name: "Unitel",
      color: "#143472",
      textColor: "#FFFFFF"
    },
    {
      name: "Yango",
      color: "#FF0000",
      textColor: "#FFFFFF"
    },
    {
      name: "Refriango",
      color: "#E50027",
      textColor: "#FFFFFF"
    },
    {
      name: "Centro Óptico",
      color: "#00B9E4",
      textColor: "#004370"
    },
    {
      name: "Beko",
      color: "#0075C9",
      textColor: "#FFFFFF"
    },
    {
      name: "Ecoangola",
      color: "#4CA12F",
      textColor: "#FFFFFF"
    }
  ];
  
  // Duplicar os brands para criar efeito infinito
  const duplicatedBrands = [...brands, ...brands, ...brands];
  
  // Efeito para animar o carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => {
        // Reset quando todos os logos já passaram
        if (prevPosition <= -brands.length * 250) {
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
          className="flex items-center py-8 transition-transform duration-1000"
          style={{ transform: `translateX(${position}px)` }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div 
              key={`${brand.name}-${index}`} 
              className="mx-12 flex items-center justify-center transition-all duration-300"
            >
              <div 
                className="flex items-center justify-center p-4 rounded-lg h-20"
                style={{ 
                  backgroundColor: brand.color,
                  minWidth: "200px"
                }}
              >
                <span 
                  className="font-bold text-xl"
                  style={{ color: brand.textColor }}
                >
                  {brand.name}
                </span>
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