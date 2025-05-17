import { useEffect, useState } from "react";

export default function BrandsCarousel() {
  const [position, setPosition] = useState(0);
  
  // Lista de empresas com links para as imagens
  const brands = [
    {
      name: "Unitel",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3e/LOGO_UNITEL_2022.svg",
      bgColor: "#143472"
    },
    {
      name: "Yango",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Yango_logo.svg/1920px-Yango_logo.svg.png",
      bgColor: "#FF0000"
    },
    {
      name: "Refriango",
      logoUrl: "https://www.refriango.com/wp-content/uploads/2022/02/refriango.png",
      bgColor: "#F7F7F7"
    },
    {
      name: "Centro Óptico",
      logoUrl: "https://centrooptico.co.ao/wp-content/uploads/2022/09/logo-centrooptico-horizontal.png",
      bgColor: "#FFFFFF"
    },
    {
      name: "Beko",
      logoUrl: "https://www.beko.com/content/dam/bekoglobal/logo/bekologoaq-bg-min.png",
      bgColor: "#F7F7F7"
    },
    {
      name: "Ecoangola",
      logoUrl: "https://i0.wp.com/ecoangola.com/wp-content/uploads/2021/11/eco-angola.png",
      bgColor: "#FFFFFF"
    }
  ];
  
  // Duplicar os brands para criar efeito infinito
  const duplicatedBrands = [...brands, ...brands];
  
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
              className="mx-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
            >
              <div 
                className="flex items-center justify-center p-4 rounded-lg h-20"
                style={{ 
                  backgroundColor: brand.bgColor,
                  minWidth: "200px"
                }}
              >
                <img 
                  src={brand.logoUrl} 
                  alt={`Logo da ${brand.name}`}
                  className="h-14 object-contain transition-transform duration-300 hover:scale-110"
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