import { useEffect, useState } from "react";

// Componente para renderizar cada logo individual
const LogoItem = ({ name, color }: { name: string; color: string }) => {
  return (
    <div className="mx-12 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:opacity-80">
      <div 
        className="h-12 md:h-16 flex items-center justify-center p-4 rounded-md"
        style={{ 
          minWidth: "150px",
          background: color,
          color: getContrastColor(color)
        }}
      >
        <span className="font-bold text-lg md:text-xl">{name}</span>
      </div>
    </div>
  );
};

// Função para determinar se o texto deve ser branco ou preto com base na cor de fundo
function getContrastColor(bgColor: string): string {
  // Função simples para cores básicas
  const colorMap: Record<string, string> = {
    "#FF0000": "#FFFFFF", // Vermelho - Texto branco
    "#2B65EC": "#FFFFFF", // Azul - Texto branco
    "#188038": "#FFFFFF", // Verde - Texto branco
    "#EA4335": "#FFFFFF", // Vermelho Google - Texto branco
    "#4285F4": "#FFFFFF", // Azul Google - Texto branco
    "#FBBC05": "#000000", // Amarelo Google - Texto preto
    "#34A853": "#FFFFFF", // Verde Google - Texto branco
    "#FF5733": "#FFFFFF", // Laranja - Texto branco
    "#C70039": "#FFFFFF", // Vermelho escuro - Texto branco
    "#00BFFF": "#000000", // Azul claro - Texto preto
    "#FF007F": "#FFFFFF", // Rosa - Texto branco
    "#800080": "#FFFFFF", // Roxo - Texto branco
  };
  
  return colorMap[bgColor] || "#FFFFFF";
}

export default function LogoCarouselWithFallback() {
  const [position, setPosition] = useState(0);
  
  // Lista de empresas com cores que representam suas identidades visuais
  const companiesWithColors = [
    { name: "Unitel", color: "#2B65EC" }, // Azul
    { name: "Yango", color: "#FF0000" }, // Vermelho
    { name: "Refriango", color: "#EA4335" }, // Vermelho/Laranja
    { name: "Centro Óptico", color: "#00BFFF" }, // Azul claro
    { name: "Beko", color: "#4285F4" }, // Azul
    { name: "Ecoangola", color: "#188038" } // Verde
  ];
  
  // Duplicar os logos para criar um efeito infinito
  const duplicatedLogos = [...companiesWithColors, ...companiesWithColors];
  
  // Efeito para animar o carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => {
        // Reset quando todos os logos já passaram
        if (prevPosition <= -companiesWithColors.length * 250) {
          return 0;
        }
        return prevPosition - 1; // Movimento gradual para a esquerda
      });
    }, 20); // Velocidade do movimento
    
    return () => clearInterval(interval);
  }, [companiesWithColors.length]);
  
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
          {duplicatedLogos.map((company, index) => (
            <LogoItem 
              key={`${company.name}-${index}`} 
              name={company.name} 
              color={company.color}
            />
          ))}
        </div>
        
        {/* Gradiente direito para efeito de fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900"></div>
      </div>
    </section>
  );
}