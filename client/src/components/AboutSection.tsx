import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AboutSection() {
  const [isInView, setIsInView] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [counters, setCounters] = useState({ years: 0, projects: 0, clients: 0 });
  const finalCounters = { years: 10, projects: 250, clients: 45 };
  
  // Mostrar contador animado quando estiver visível
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          
          // Iniciar animação de contagem
          const animateCounter = (target: number, key: keyof typeof counters) => {
            const duration = 2000; // 2 segundos
            const frameDuration = 1000 / 60; // 60fps
            const totalFrames = Math.round(duration / frameDuration);
            let frame = 0;
            
            const timer = setInterval(() => {
              frame++;
              const progress = frame / totalFrames;
              const currentCount = Math.ceil(progress * target);
              
              setCounters(prev => ({ ...prev, [key]: currentCount }));
              
              if (frame === totalFrames) {
                clearInterval(timer);
              }
            }, frameDuration);
            
            return timer;
          };
          
          const yearTimer = animateCounter(finalCounters.years, 'years');
          const projectTimer = animateCounter(finalCounters.projects, 'projects');
          const clientTimer = animateCounter(finalCounters.clients, 'clients');
          
          return () => {
            clearInterval(yearTimer);
            clearInterval(projectTimer);
            clearInterval(clientTimer);
          };
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

  const tabs = [
    {
      title: "Nossa História",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            A Nzinga nasceu em 2013 da paixão por contar histórias autênticas e construir marcas que deixam legado. Inspirados pela rainha Nzinga Mbandi, uma estrategista brilhante e símbolo de resistência em Angola, decidimos criar uma agência que combina nossa rica herança cultural com uma visão global contemporânea.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Começamos como uma pequena equipe de três profissionais em Luanda, e hoje contamos com mais de 20 especialistas espalhados por Angola e parcerias internacionais em Portugal, Brasil e África do Sul, conectando talentos africanos ao mundo.
          </p>
        </div>
      )
    },
    {
      title: "Nossa Missão",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Nossa missão é transformar a comunicação das empresas angolanas e africanas, combinando nossas raízes culturais com as melhores práticas internacionais, posicionando marcas africanas no cenário global com autenticidade e impacto.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Acreditamos no poder das histórias autênticas e da comunicação estratégica para impulsionar marcas e negócios, criando conexões emocionais duradouras entre as empresas e seus públicos, ao mesmo tempo que valorizamos nossa identidade cultural única.
          </p>
        </div>
      )
    },
    {
      title: "Nossa Equipe",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Nossa equipe multidisciplinar reúne talentos diversos em design, estratégia de marca, marketing digital, tecnologia e comunicação. Com profissionais formados nas melhores instituições de Angola e do exterior, trazemos perspectivas únicas e uma visão global para cada projeto.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Valorizamos a diversidade, criatividade e inovação, reunindo mentes criativas que compartilham a paixão por criar soluções impactantes que elevam marcas, negócios e narrativas africanas a um patamar de excelência global.
          </p>
          <div className="mt-6">
            <Button className="bg-black hover:bg-black/80 text-white rounded-md">
              Conheça nossa equipe
            </Button>
          </div>
        </div>
      )
    }
  ];

  return (
    <section 
      id="sobre" 
      ref={sectionRef}
      className="py-28 relative bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300"
    >
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 dark:bg-gray-800 transform skew-x-12 -mr-32 opacity-70 z-0 overflow-hidden transition-colors duration-300"></div>
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -left-40 bottom-20 w-80 h-80 bg-[#FFC400] opacity-[0.03] rounded-full"></div>
        <div className="absolute right-60 top-20 w-40 h-40 bg-[#FFC400] opacity-[0.05] rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Coluna de imagem com overlay interativo */}
          <div className={`relative transition-all duration-1000 transform ${isInView ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=80" 
                alt="Equipe Nzinga trabalhando em um escritório moderno" 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
                <div className="p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold text-2xl mb-2">Nossa Filosofia</h3>
                  <p className="text-white/90 text-sm">
                    "Combinamos a riqueza cultural africana com um olhar global para criar soluções únicas que transcendem fronteiras."
                  </p>
                </div>
              </div>
            </div>
            
            {/* Cartão flutuante sobre a imagem */}
            <div className="absolute -bottom-10 -right-10 glass-card p-6 rounded-xl shadow-2xl backdrop-blur-lg border border-white/10 w-60 md:w-80 transform rotate-3 hover:rotate-0 transition-all duration-300">
              <div className="flex flex-col space-y-2">
                <h4 className="text-black font-bold text-lg">Reconhecimentos</h4>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#FFC400] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Melhor Agência de Branding 2023</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#FFC400] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Top 10 Empresas Criativas de África</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Conteúdo principal */}
          <div className={`transition-all duration-1000 transform ${isInView ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="mb-6">
              <div className="inline-block">
                <span className="text-[#FFC400] font-semibold uppercase tracking-wider text-sm">Conheça nossa agência</span>
              </div>
              <h2 className="text-black dark:text-white font-bold text-4xl md:text-5xl mt-4 mb-6 leading-tight transition-colors duration-300">
                Uma agência com DNA africano e visão global
              </h2>
              <div className="w-24 h-1 bg-[#FFC400]"></div>
            </div>
            
            {/* Tabs de navegação */}
            <div className="mt-8 mb-6">
              <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700 mb-6 transition-colors duration-300">
                {tabs.map((tab, index) => (
                  <button 
                    key={index} 
                    className={`px-4 py-2 font-medium text-sm md:text-base transition-all duration-300 ${
                      activeTab === index 
                        ? 'text-[#FFC400] border-b-2 border-[#FFC400]' 
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                    onClick={() => setActiveTab(index)}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>
              
              {/* Conteúdo da tab ativa */}
              <div className="min-h-[150px]">
                {tabs[activeTab].content}
              </div>
            </div>
            
            {/* Contadores */}
            <div className="grid grid-cols-3 gap-6 mt-10 py-6">
              <div ref={el => counterRefs.current[0] = el} className="text-center p-4 relative group">
                <div className="absolute inset-0 bg-[#FFC400]/5 rounded-xl -z-10 transform transition-transform duration-300 group-hover:scale-105"></div>
                <h3 className="text-4xl lg:text-5xl font-bold text-[#FFC400] mb-2 animate-pulse" style={{ animationDuration: '3s' }}>
                  {counters.years}+
                </h3>
                <p className="text-gray-700 font-medium">Anos de experiência</p>
              </div>
              <div ref={el => counterRefs.current[1] = el} className="text-center p-4 relative group">
                <div className="absolute inset-0 bg-[#FFC400]/5 rounded-xl -z-10 transform transition-transform duration-300 group-hover:scale-105"></div>
                <h3 className="text-4xl lg:text-5xl font-bold text-[#FFC400] mb-2 animate-pulse" style={{ animationDuration: '3s' }}>
                  {counters.projects}+
                </h3>
                <p className="text-gray-700 font-medium">Projetos entregues</p>
              </div>
              <div ref={el => counterRefs.current[2] = el} className="text-center p-4 relative group">
                <div className="absolute inset-0 bg-[#FFC400]/5 rounded-xl -z-10 transform transition-transform duration-300 group-hover:scale-105"></div>
                <h3 className="text-4xl lg:text-5xl font-bold text-[#FFC400] mb-2 animate-pulse" style={{ animationDuration: '3s' }}>
                  {counters.clients}+
                </h3>
                <p className="text-gray-700 font-medium">Clientes satisfeitos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
