import { useState } from "react";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

function FaqItem({ question, answer, isOpen, onClick, index }: FaqItemProps) {
  return (
    <div 
      className={`border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        isOpen ? 'pb-6' : 'pb-0'
      }`}
    >
      <button
        className="py-6 w-full flex justify-between items-center text-left focus:outline-none"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <h3 className="text-lg md:text-xl font-medium text-gray-900 dark:text-white">
          {question}
        </h3>
        <div className={`ml-4 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
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
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </button>
      
      <div 
        id={`faq-answer-${index}`}
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="text-gray-600 dark:text-gray-300 text-base leading-relaxed pb-2">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  const faqs = [
    {
      question: "Quais serviços a Nzinga oferece?",
      answer: "A Nzinga oferece uma gama completa de serviços de comunicação e estratégia, incluindo desenvolvimento de identidade de marca, design gráfico, marketing digital, web design, gestão de conteúdo e consultoria estratégica. Nosso objetivo é fornecer soluções personalizadas que ajudem sua marca a se destacar no mercado competitivo."
    },
    {
      question: "Como funciona o processo de trabalho com a Nzinga?",
      answer: "Nosso processo começa com uma consulta inicial para entender suas necessidades e objetivos. Em seguida, desenvolvemos uma proposta personalizada com escopo, cronograma e orçamento. Após aprovação, entramos na fase de pesquisa e planejamento estratégico, seguida pela execução criativa e implementação. Finalizamos com uma análise de resultados e recomendações para otimizações futuras."
    },
    {
      question: "Quanto custam os serviços da Nzinga?",
      answer: "Cada projeto é único, por isso nossos preços são personalizados com base no escopo, prazos e recursos necessários. Oferecemos desde pacotes básicos para pequenas empresas até soluções complexas para grandes corporações. Entre em contato conosco para receber uma cotação personalizada para o seu projeto específico."
    },
    {
      question: "Quanto tempo leva para completar um projeto?",
      answer: "O prazo para a conclusão de um projeto varia dependendo da sua complexidade e escopo. Um redesign de marca completo pode levar de 4 a 8 semanas, enquanto uma campanha de marketing digital pode exigir um compromisso contínuo de 3 a 6 meses para resultados otimizados. Durante nossa consulta inicial, forneceremos um cronograma detalhado para seu projeto específico."
    },
    {
      question: "Vocês trabalham com empresas de diferentes setores e tamanhos?",
      answer: "Sim, trabalhamos com empresas de todos os tamanhos - desde startups e pequenos negócios até grandes corporações. Nossa experiência abrange diversos setores, incluindo tecnologia, saúde, educação, varejo, gastronomia, entretenimento e muitos outros. Adaptamos nossa abordagem para atender às necessidades específicas de cada setor e tamanho de empresa."
    },
    {
      question: "Como posso medir o retorno sobre o investimento (ROI) dos serviços contratados?",
      answer: "Estabelecemos métricas claras de sucesso no início de cada projeto e fornecemos relatórios regulares de desempenho. Dependendo dos serviços contratados, podemos monitorar indicadores como tráfego do site, taxas de conversão, engajamento nas redes sociais, visibilidade da marca, geração de leads e aumento nas vendas. Nosso objetivo é sempre vincular nossas ações a resultados comerciais mensuráveis."
    },
    {
      question: "Posso ver exemplos de trabalhos anteriores para empresas semelhantes à minha?",
      answer: "Sim, temos um portfólio diversificado de projetos concluídos para diferentes setores. Durante nossa consulta inicial, podemos compartilhar estudos de caso e exemplos específicos de trabalhos anteriores em seu setor ou para desafios semelhantes aos seus. Isso ajudará a demonstrar nossa experiência e abordagem em situações comparáveis."
    }
  ];
  
  return (
    <section id="faq" className="py-24 bg-white dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Perguntas Frequentes
          </h2>
          <div className="w-20 h-1 bg-[#FFC400] mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Respostas para as dúvidas mais comuns sobre nossos serviços e processo de trabalho.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FaqItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFaq(index)}
              index={index}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Não encontrou a resposta que procurava? Entre em contato conosco.
          </p>
          <a 
            href="#contacto" 
            className="inline-flex items-center px-8 py-4 bg-[#FFC400] text-black font-medium rounded-md hover:bg-[#FFC400]/90 transition-all duration-300 hover:translate-y-[-2px]"
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
              className="ml-2"
            >
              <path d="m22 2-7 20-4-9-9-4Z"></path>
              <path d="M22 2 11 13"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}