import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface TestimonialCardProps {
  content: string;
  name: string;
  role: string;
  company: string;
  image?: string;
  index: number;
  isActive: boolean;
}

function TestimonialCard({ content, name, role, company, image, index, isActive }: TestimonialCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, index * 150);
        }
      },
      { threshold: 0.1 }
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
  
  // Gerar iniciais do nome se não houver imagem
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div 
      ref={cardRef} 
      className={`relative transition-all duration-700 ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-20 opacity-0'
      } ${
        isActive 
          ? 'z-20 transform scale-100 md:scale-105' 
          : 'scale-95 opacity-60'
      }`}
    >
      <div className={`relative bg-white p-8 rounded-xl shadow-xl overflow-hidden transition-all duration-500 ${
        isActive ? 'border border-[#FFC400]/20 shadow-[#FFC400]/5 shadow-2xl' : ''
      }`}>
        {/* Background decorativo */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#FFC400]/5 rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#FFC400]/5 rounded-full"></div>
        
        {/* Aspas decorativas */}
        <div className="absolute top-8 right-8 text-[#FFC400]/10 text-8xl font-serif leading-none">
          "
        </div>
        
        {/* Conteúdo */}
        <div className="relative z-10">
          {/* Estrelas de avaliação */}
          <div className="flex mb-6">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i}
                className={`w-5 h-5 ${i > 0 ? 'ml-1' : ''} text-[#FFC400]`}
                fill="currentColor" 
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          
          {/* Texto do depoimento */}
          <p className="text-gray-700 leading-relaxed mb-8 relative min-h-[120px] text-lg italic">
            "{content}"
          </p>
          
          {/* Informações do cliente */}
          <div className="flex items-center">
            {image ? (
              <img 
                src={image} 
                alt={name} 
                className="w-14 h-14 rounded-full object-cover border-2 border-[#FFC400]/20"
              />
            ) : (
              <div className="w-14 h-14 bg-gradient-to-br from-[#FFC400]/20 to-[#FFC400]/10 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-[#FFC400]">{initials}</span>
              </div>
            )}
            <div className="ml-4">
              <h4 className="font-bold text-black">{name}</h4>
              <p className="text-gray-500 text-sm">{role}</p>
              <p className="text-[#FFC400] text-xs font-medium mt-1">{company}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
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
  
  // Rotação automática dos depoimentos a cada 5 segundos
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setActiveIndex(current => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isInView]);

  const testimonials = [
    {
      content: "A Nzinga transformou completamente a presença digital da nossa empresa. A equipe entendeu perfeitamente nossas necessidades e desenvolveu uma estratégia que nos ajudou a aumentar significativamente o engajamento nas redes sociais e as conversões no site.",
      name: "Maria Andrade",
      role: "CEO",
      company: "TechAngola",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
    },
    {
      content: "O rebranding que a Nzinga fez para nosso banco foi um divisor de águas. Nossa marca ganhou uma nova vida e agora realmente comunica nossos valores de inovação e confiança. O retorno sobre o investimento superou todas as nossas expectativas.",
      name: "João Carlos",
      role: "Diretor de Marketing",
      company: "Banco Nacional",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
    },
    {
      content: "Buscávamos uma agência que entendesse a cultura angolana e pudesse trazer inovação. A equipe da Nzinga foi além, criando uma campanha que destacou nossa identidade cultural e ao mesmo tempo nos posicionou como um destino turístico moderno e atraente.",
      name: "Luísa Santos",
      role: "Gerente de Marketing",
      company: "Visit Angola",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
    },
    {
      content: "O trabalho de estratégia digital que a Nzinga realizou para nossa marca foi transformador. Em apenas seis meses, nosso tráfego orgânico cresceu 200% e nossas vendas online aumentaram 150%. Sua abordagem estratégica fez toda a diferença.",
      name: "Paulo Mendes",
      role: "Diretor Comercial",
      company: "Global Retail Group",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
    },
    {
      content: "Contratar a Nzinga foi a melhor decisão que tomamos para o lançamento do nosso festival cultural. Eles entenderam perfeitamente a essência do evento e desenvolveram uma identidade visual que capturou o espírito da nossa cultura de forma contemporânea e impactante.",
      name: "Ana Lúcia",
      role: "Diretora Executiva",
      company: "Festival de Artes de Angola",
      image: "https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
    }
  ];

  return (
    <section 
      id="depoimentos" 
      ref={sectionRef}
      className="py-28 relative bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -top-32 -right-32 w-96 h-96 border border-[#FFC400]/10 rounded-full"></div>
        <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-[#FFC400]/5 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-[#FFC400]/5 rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 border border-[#FFC400]/10 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 transform ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-block">
            <span className="text-[#FFC400] font-semibold uppercase tracking-wider text-sm">Histórias de sucesso</span>
          </div>
          <h2 className="text-black font-bold text-4xl md:text-5xl mt-4 mb-6">O Que Dizem Nossos Clientes</h2>
          <div className="w-24 h-1 bg-[#FFC400] mx-auto"></div>
          <p className="text-gray-600 max-w-2xl mx-auto mt-6 text-lg">
            Confira o que nossos clientes têm a dizer sobre suas experiências trabalhando com a Nzinga.
          </p>
        </div>
        
        {/* Visualização desktop - Carrossel de 3 cards visíveis */}
        <div className="hidden lg:block relative">
          <div className="flex justify-center space-x-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="w-1/3"
                onClick={() => setActiveIndex(index)}
              >
                <TestimonialCard 
                  content={testimonial.content}
                  name={testimonial.name}
                  role={testimonial.role}
                  company={testimonial.company}
                  image={testimonial.image}
                  index={index}
                  isActive={activeIndex === index}
                />
              </div>
            ))}
          </div>
          
          {/* Indicadores e controles */}
          <div className="flex justify-center mt-12 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-[#FFC400] w-10' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ver depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Visualização mobile - Carrossel com 1 card visível */}
        <div className="lg:hidden relative">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`transition-all duration-500 ${
                  activeIndex === index 
                    ? 'opacity-100 translate-x-0 z-10' 
                    : 'absolute inset-0 opacity-0 translate-x-full'
                }`}
              >
                <TestimonialCard 
                  content={testimonial.content}
                  name={testimonial.name}
                  role={testimonial.role}
                  company={testimonial.company}
                  image={testimonial.image}
                  index={index}
                  isActive={true}
                />
              </div>
            ))}
          </div>
          
          {/* Controles de navegação para mobile */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveIndex(prev => (prev - 1 + testimonials.length) % testimonials.length)}
              className="bg-white border border-gray-200 hover:bg-gray-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </Button>
            
            <div className="flex space-x-1">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index 
                      ? 'bg-[#FFC400] w-6' 
                      : 'bg-gray-300'
                  }`}
                  aria-label={`Ver depoimento ${index + 1}`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveIndex(prev => (prev + 1) % testimonials.length)}
              className="bg-white border border-gray-200 hover:bg-gray-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Button>
          </div>
        </div>
        
        {/* CTA - Call to Action */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-500 transform ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <a 
            href="#contacto" 
            className="inline-flex items-center text-[#FFC400] font-semibold text-lg hover:underline"
          >
            Quer ser nosso próximo case de sucesso?
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
              className="ml-2"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
