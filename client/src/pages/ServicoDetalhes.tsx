import { useParams, Link } from "wouter";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Interface para os projetos relacionados
interface ProjetoRelacionado {
  id: number;
  titulo: string;
  imagem: string;
  cliente: string;
  categoria: string;
}

// Interface para o serviço
interface ServicoDetalhado {
  slug: string;
  titulo: string;
  descricaoCurta: string;
  descricaoCompleta: string[];
  icone: React.ReactNode;
  imagemCapa: string;
  beneficios: string[];
  etapas: {
    numero: number;
    titulo: string;
    descricao: string;
  }[];
  projetosRelacionados: ProjetoRelacionado[];
}

export default function ServicoDetalhes() {
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [servico, setServico] = useState<ServicoDetalhado | null>(null);
  const [isInView, setIsInView] = useState<{[key: string]: boolean}>({
    hero: false,
    descricao: false,
    beneficios: false,
    processo: false,
    projetos: false,
  });
  
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    descricao: useRef<HTMLDivElement>(null),
    beneficios: useRef<HTMLDivElement>(null),
    processo: useRef<HTMLDivElement>(null),
    projetos: useRef<HTMLDivElement>(null),
  };
  
  // Observar quando as seções entram na viewport
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    Object.entries(sectionRefs).forEach(([key, ref]) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(prev => ({ ...prev, [key]: true }));
          }
        },
        { threshold: 0.1 }
      );
      
      if (ref.current) {
        observer.observe(ref.current);
        observers.push(observer);
      }
    });
    
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [servico]);

  // Dados simulados dos serviços
  useEffect(() => {
    setIsLoading(true);
    
    // Banco de dados simulado com informações detalhadas de cada serviço
    const servicosDB: ServicoDetalhado[] = [
      {
        slug: "estrategia-de-marca",
        titulo: "Estratégia de Marca",
        descricaoCurta: "Desenvolvemos identidades de marca autênticas que conectam sua empresa ao seu público-alvo e diferenciam-na da concorrência.",
        descricaoCompleta: [
          "Nossa abordagem de Estratégia de Marca é construída sobre uma profunda compreensão do seu negócio, mercado e público-alvo. Combinamos pesquisa de mercado, análise competitiva e insights de consumidores para desenvolver uma identidade de marca que ressoe com seu público e destaque sua empresa da concorrência.",
          "Através do nosso processo, definimos claramente a essência da sua marca — sua missão, visão, valores e posicionamento único no mercado. Estes elementos fundamentais guiam todas as expressões visuais e verbais da sua marca, garantindo consistência e impacto em todos os pontos de contato com o cliente.",
          "Nossa equipe de estrategistas e designers trabalha em conjunto para traduzir esses insights em elementos visuais memoráveis e mensagens impactantes que capturam a essência da sua marca e comunicam seu valor único para o mercado."
        ],
        icone: (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#FFC400" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m3 11 18-5v12L3 14v-3z"></path>
            <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
          </svg>
        ),
        imagemCapa: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800&q=80",
        beneficios: [
          "Diferenciação clara da concorrência",
          "Consistência em todos os pontos de contato",
          "Conexão emocional com o público-alvo",
          "Maior reconhecimento e lembrança de marca",
          "Base sólida para estratégias de marketing e comunicação",
          "Aumento do valor percebido do produto ou serviço"
        ],
        etapas: [
          {
            numero: 1,
            titulo: "Descoberta e Pesquisa",
            descricao: "Conduzimos pesquisas detalhadas para entender seu mercado, concorrentes e público-alvo, além de workshops e entrevistas para compreender os valores e a visão da sua empresa."
          },
          {
            numero: 2,
            titulo: "Estratégia e Posicionamento",
            descricao: "Desenvolvemos o posicionamento estratégico da sua marca, definindo claramente sua proposta de valor, personalidade, voz e mensagens-chave."
          },
          {
            numero: 3,
            titulo: "Identidade Visual",
            descricao: "Criamos elementos visuais distintivos incluindo logo, cores, tipografia e sistema de design que refletem o posicionamento e os valores da marca."
          },
          {
            numero: 4,
            titulo: "Guia de Marca",
            descricao: "Documentamos todas as diretrizes visuais e estratégicas em um guia abrangente para garantir consistência em todas as aplicações futuras."
          },
          {
            numero: 5,
            titulo: "Implementação e Treinamento",
            descricao: "Auxiliamos na implementação da nova identidade e oferecemos treinamento para sua equipe sobre a aplicação correta dos elementos da marca."
          }
        ],
        projetosRelacionados: [
          {
            id: 1,
            titulo: "Rebranding Corporativo Banco Nacional",
            imagem: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
            cliente: "Banco Nacional de Angola",
            categoria: "Identidade Visual"
          },
          {
            id: 2,
            titulo: "Identidade Visual Festival Cultural",
            imagem: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
            cliente: "Festival de Artes de Angola",
            categoria: "Identidade Visual"
          }
        ]
      },
      {
        slug: "marketing-digital",
        titulo: "Marketing Digital",
        descricaoCurta: "Transformamos sua presença online com estratégias que geram resultados mensuráveis e conversões efetivas.",
        descricaoCompleta: [
          "No ambiente digital altamente competitivo de hoje, uma estratégia de marketing digital bem executada é essencial para o sucesso do seu negócio. Na Nzinga, oferecemos soluções abrangentes de marketing digital que aumentam sua visibilidade online, geram leads qualificados e impulsionam as conversões.",
          "Nossa equipe de especialistas em marketing digital combina análise de dados, criatividade e conhecimento técnico para desenvolver estratégias personalizadas que atendem às necessidades específicas do seu negócio. Utilizamos as mais recentes ferramentas e técnicas para garantir que sua marca se destaque no espaço digital e alcance seu público-alvo de maneira eficaz.",
          "Nosso foco está em entregar resultados mensuráveis e um retorno significativo sobre seu investimento. Através de monitoramento contínuo e otimização, refinamos constantemente nossas estratégias para maximizar o desempenho e garantir que você esteja sempre à frente da concorrência no mercado digital."
        ],
        icone: (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#FFC400" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
            <path d="M2 12h20"></path>
          </svg>
        ),
        imagemCapa: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800&q=80",
        beneficios: [
          "Aumento do alcance e da visibilidade da marca",
          "Geração de leads qualificados",
          "Melhor engajamento com o público-alvo",
          "Aumento mensurável nas conversões e vendas",
          "Otimização do investimento em marketing",
          "Insights valiosos sobre o comportamento do cliente",
          "Capacidade de adaptar estratégias em tempo real"
        ],
        etapas: [
          {
            numero: 1,
            titulo: "Auditoria e Estratégia",
            descricao: "Analisamos sua presença digital atual, identificamos oportunidades e desenvolvemos uma estratégia personalizada alinhada aos seus objetivos de negócio."
          },
          {
            numero: 2,
            titulo: "SEO e Conteúdo",
            descricao: "Otimizamos seu site para mecanismos de busca e criamos conteúdo relevante que atrai e engaja seu público-alvo, estabelecendo sua autoridade no setor."
          },
          {
            numero: 3,
            titulo: "Publicidade Digital",
            descricao: "Implementamos campanhas de mídia paga estrategicamente direcionadas em plataformas como Google Ads, Facebook, Instagram e LinkedIn para maximizar o ROI."
          },
          {
            numero: 4,
            titulo: "Gestão de Redes Sociais",
            descricao: "Desenvolvemos e executamos estratégias de mídia social que aumentam o engajamento, constroem comunidade e fortalecem a conexão com seus clientes."
          },
          {
            numero: 5,
            titulo: "Análise e Otimização",
            descricao: "Monitoramos continuamente o desempenho de todas as iniciativas digitais, fornecendo relatórios detalhados e ajustando estratégias para melhorar resultados."
          }
        ],
        projetosRelacionados: [
          {
            id: 3,
            titulo: "Campanha Lançamento Smartphone X10",
            imagem: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
            cliente: "Telecom Angola",
            categoria: "Marketing Digital"
          },
          {
            id: 4,
            titulo: "Campanha Social 'Educação Para Todos'",
            imagem: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&crop=entropy",
            cliente: "Ministério da Educação",
            categoria: "Campanha Social"
          }
        ]
      },
      {
        slug: "design-grafico",
        titulo: "Design Gráfico",
        descricaoCurta: "Criamos soluções visuais que comunicam a essência da sua marca com impacto e elegância.",
        descricaoCompleta: [
          "Design é mais do que estética — é uma poderosa ferramenta de comunicação. Na Nzinga, nossos designers gráficos são mestres em transformar conceitos abstratos em visuais impactantes que transmitem a essência da sua marca e mensagem com clareza e beleza.",
          "Cada projeto de design que desenvolvemos começa com uma profunda compreensão da sua marca, objetivos e público-alvo. Acreditamos que o design eficaz deve ser estratégico, resolvendo problemas específicos de comunicação enquanto cria experiências visuais memoráveis que cativam seu público.",
          "Nossa equipe combina criatividade artística com pensamento estratégico para criar designs que se destacam no mercado competitivo. Seja um logotipo distintivo, material impresso elegante ou infográficos informativos, nossa abordagem equilibra forma e função para produzir resultados que encantam visualmente enquanto comunicam com eficácia."
        ],
        icone: (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#FFC400" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="13.5" cy="6.5" r="2.5"></circle>
            <circle cx="17.5" cy="10.5" r="2.5"></circle>
            <circle cx="8.5" cy="7.5" r="2.5"></circle>
            <circle cx="6.5" cy="12.5" r="2.5"></circle>
            <path d="M12 22v-6"></path>
            <path d="M14.5 18h-5"></path>
            <path d="M13.75 6.5 17 10"></path>
            <path d="M8.75 7.5 7 11"></path>
            <path d="M11.5 6.5l-3 1"></path>
            <path d="M16.5 10.5l-1 2"></path>
          </svg>
        ),
        imagemCapa: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800&q=80",
        beneficios: [
          "Comunicação visual clara e impactante",
          "Consistência em todos os materiais da marca",
          "Diferenciação da concorrência através do design distintivo",
          "Aumento da percepção de profissionalismo e qualidade",
          "Melhor retenção da mensagem pelo público-alvo",
          "Designs adaptáveis para diferentes plataformas e necessidades"
        ],
        etapas: [
          {
            numero: 1,
            titulo: "Briefing e Descoberta",
            descricao: "Realizamos uma análise detalhada das suas necessidades, objetivos, público-alvo e posicionamento da marca para estabelecer as bases do projeto."
          },
          {
            numero: 2,
            titulo: "Pesquisa e Conceituação",
            descricao: "Conduzimos pesquisas para informar nossa abordagem criativa e desenvolvemos conceitos iniciais que alinham-se com sua estratégia de marca."
          },
          {
            numero: 3,
            titulo: "Design e Visualização",
            descricao: "Transformamos os conceitos selecionados em designs refinados, utilizando princípios de design, teoria das cores e tipografia para criar visuais impactantes."
          },
          {
            numero: 4,
            titulo: "Revisão e Refinamento",
            descricao: "Apresentamos os designs para feedback e realizamos refinamentos para garantir que o resultado final atenda perfeitamente às suas expectativas."
          },
          {
            numero: 5,
            titulo: "Finalização e Entrega",
            descricao: "Preparamos e entregamos arquivos finais otimizados para todos os usos necessários, incluindo diretrizes de aplicação quando relevante."
          }
        ],
        projetosRelacionados: [
          {
            id: 5,
            titulo: "Identidade Visual Festival Cultural",
            imagem: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
            cliente: "Festival de Artes de Angola",
            categoria: "Identidade Visual"
          },
          {
            id: 6,
            titulo: "Rebranding Corporativo Banco Nacional",
            imagem: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
            cliente: "Banco Nacional de Angola",
            categoria: "Identidade Visual"
          }
        ]
      },
      {
        slug: "web-design",
        titulo: "Web Design",
        descricaoCurta: "Criamos websites e aplicações web que combinam design excepcional com funcionalidade intuitiva.",
        descricaoCompleta: [
          "No mundo digital de hoje, seu website muitas vezes é o primeiro ponto de contato entre sua marca e potenciais clientes. Na Nzinga, criamos experiências digitais que não apenas impressionam visualmente, mas também são estrategicamente projetadas para converter visitantes em clientes.",
          "Nossa abordagem para web design combina princípios de design centrado no usuário (UX/UI) com estratégias de marketing digital para criar sites que são bonitos, funcionais e eficazes em atingir seus objetivos de negócio. Cada site que desenvolvemos é cuidadosamente personalizado para refletir a identidade única da sua marca e atender às necessidades específicas do seu público.",
          "Além da estética visual, focamos na usabilidade, acessibilidade e otimização para mecanismos de busca (SEO), garantindo que seu site não apenas atraia visitantes, mas também ofereça uma experiência excepcional que os converta em clientes leais."
        ],
        icone: (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#FFC400" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M7 7h.01"></path>
            <path d="M11 7h.01"></path>
            <path d="M15 7h.01"></path>
            <path d="M7 11h.01"></path>
            <path d="M11 11h.01"></path>
            <path d="M15 11h.01"></path>
            <path d="M7 15h.01"></path>
            <path d="M11 15h.01"></path>
            <path d="M15 15h.01"></path>
          </svg>
        ),
        imagemCapa: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800&q=80",
        beneficios: [
          "Experiência do usuário intuitiva e agradável",
          "Design responsivo para todos os dispositivos",
          "Melhor desempenho nos mecanismos de busca",
          "Taxas de conversão otimizadas",
          "Tempo de carregamento rápido",
          "Integração perfeita com plataformas de marketing digital",
          "Site de fácil manutenção e atualização"
        ],
        etapas: [
          {
            numero: 1,
            titulo: "Estratégia e Planejamento",
            descricao: "Definimos os objetivos do seu site, mapeamos a jornada do usuário e determinamos a arquitetura da informação ideal para uma experiência otimizada."
          },
          {
            numero: 2,
            titulo: "Wireframing e Protótipos",
            descricao: "Criamos wireframes e protótipos interativos que permitem visualizar a estrutura e funcionalidade do site antes do design visual completo."
          },
          {
            numero: 3,
            titulo: "Design Visual",
            descricao: "Desenvolvemos o design visual do site, incorporando os elementos da sua identidade de marca e criando uma interface atraente e intuitiva."
          },
          {
            numero: 4,
            titulo: "Desenvolvimento",
            descricao: "Transformamos o design em um site funcional utilizando as tecnologias mais adequadas, garantindo código limpo, responsivo e otimizado."
          },
          {
            numero: 5,
            titulo: "Testes e Lançamento",
            descricao: "Realizamos testes rigorosos em diversos dispositivos e navegadores para garantir funcionalidade perfeita, seguido pelo lançamento e monitoramento inicial."
          }
        ],
        projetosRelacionados: [
          {
            id: 7,
            titulo: "Website Turismo Luanda",
            imagem: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
            cliente: "Departamento de Turismo",
            categoria: "Web Design"
          },
          {
            id: 8,
            titulo: "Aplicativo Móvel Saúde+",
            imagem: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
            cliente: "Global Health Initiative",
            categoria: "Desenvolvimento"
          }
        ]
      },
      {
        slug: "gestao-de-conteudo",
        titulo: "Gestão de Conteúdo",
        descricaoCurta: "Produzimos conteúdo estratégico que comunica sua mensagem, aumenta seu alcance e estabelece sua autoridade no setor.",
        descricaoCompleta: [
          "O conteúdo é o coração de qualquer estratégia de marketing digital bem-sucedida. Na Nzinga, ajudamos você a contar a história da sua marca de maneira autêntica e impactante, criando conteúdo que ressoa com seu público e impulsiona resultados de negócio.",
          "Nossa equipe de redatores, estrategistas de conteúdo e especialistas em SEO trabalha em conjunto para desenvolver e implementar uma estratégia de conteúdo abrangente que posiciona sua marca como autoridade em seu setor. Desde blogs envolventes e artigos técnicos até posts de mídia social e e-mails persuasivos, criamos conteúdos que educam, inspiram e convertem.",
          "Entendemos que cada palavra conta. Por isso, dedicamos tempo para compreender profundamente o seu negócio, público-alvo e objetivos, garantindo que cada peça de conteúdo que criamos seja estrategicamente alinhada com sua visão e otimizada para máximo impacto."
        ],
        icone: (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#FFC400" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M8 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-2"></path>
            <path d="M9 2h6v4H9z"></path>
            <path d="M7 8h10"></path>
            <path d="M7 12h10"></path>
            <path d="M7 16h10"></path>
          </svg>
        ),
        imagemCapa: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800&q=80",
        beneficios: [
          "Maior engajamento com seu público-alvo",
          "Melhor classificação nos mecanismos de busca",
          "Estabelecimento de autoridade no seu setor",
          "Aumento do tráfego para o site e plataformas digitais",
          "Maior taxa de conversão e geração de leads",
          "Construção e fortalecimento do relacionamento com clientes",
          "Conteúdo que reflete e reforça sua identidade de marca"
        ],
        etapas: [
          {
            numero: 1,
            titulo: "Auditoria e Estratégia",
            descricao: "Analisamos o conteúdo existente, a presença digital atual e desenvolvemos uma estratégia personalizada alinhada aos seus objetivos e público-alvo."
          },
          {
            numero: 2,
            titulo: "Planejamento de Conteúdo",
            descricao: "Criamos um calendário editorial detalhado e identificamos temas, formatos e canais prioritários para maximizar o impacto do seu conteúdo."
          },
          {
            numero: 3,
            titulo: "Criação e Produção",
            descricao: "Nossa equipe de redatores especializados desenvolve conteúdo de alta qualidade, otimizado para SEO e alinhado à voz da sua marca."
          },
          {
            numero: 4,
            titulo: "Distribuição e Promoção",
            descricao: "Implantamos estratégias eficazes para distribuir seu conteúdo nos canais apropriados e amplificar seu alcance através de técnicas de promoção."
          },
          {
            numero: 5,
            titulo: "Análise e Otimização",
            descricao: "Monitoramos o desempenho do conteúdo, fornecemos relatórios detalhados e refinamos continuamente a estratégia com base nos resultados obtidos."
          }
        ],
        projetosRelacionados: [
          {
            id: 9,
            titulo: "Campanha Social 'Educação Para Todos'",
            imagem: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&crop=entropy",
            cliente: "Ministério da Educação",
            categoria: "Campanha Social"
          },
          {
            id: 10,
            titulo: "Campanha Lançamento Smartphone X10",
            imagem: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
            cliente: "Telecom Angola",
            categoria: "Marketing Digital"
          }
        ]
      },
      {
        slug: "consultoria-estrategica",
        titulo: "Consultoria Estratégica",
        descricaoCurta: "Oferecemos consultoria especializada para ajudar sua empresa a identificar oportunidades de crescimento, superar desafios e implementar estratégias eficazes.",
        descricaoCompleta: [
          "No cenário de negócios em rápida evolução de hoje, ter a orientação certa pode fazer toda a diferença para o sucesso da sua empresa. Nossa consultoria estratégica oferece insights perspicazes e orientação prática para ajudar sua organização a navegar por desafios complexos e aproveitar novas oportunidades de crescimento.",
          "Nossa equipe de consultores combina experiência em diversos setores com um profundo conhecimento do mercado africano e global. Colaboramos estreitamente com você para compreender as nuances do seu negócio, identificar áreas de melhoria e desenvolver estratégias personalizadas que impulsionam resultados tangíveis.",
          "Seja você uma startup em busca de direcionamento, uma empresa estabelecida em fase de expansão ou uma organização enfrentando transformações no mercado, nossas soluções de consultoria fornecem o apoio estratégico de que você precisa para tomar decisões informadas e alcançar seus objetivos de negócio."
        ],
        icone: (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#FFC400" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        ),
        imagemCapa: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800&q=80",
        beneficios: [
          "Clareza estratégica e direcionamento para seu negócio",
          "Identificação de novas oportunidades de crescimento",
          "Soluções para desafios complexos de negócio",
          "Estratégias baseadas em dados e insights de mercado",
          "Melhoria de processos e eficiência operacional",
          "Desenvolvimento de vantagens competitivas sustentáveis",
          "Acesso a especialistas com vasta experiência em diferentes setores"
        ],
        etapas: [
          {
            numero: 1,
            titulo: "Avaliação e Diagnóstico",
            descricao: "Realizamos uma análise abrangente da sua situação atual, identificando pontos fortes, fracos, oportunidades e ameaças para formar uma base sólida para o trabalho."
          },
          {
            numero: 2,
            titulo: "Definição de Objetivos",
            descricao: "Colaboramos com você para estabelecer objetivos claros, mensuráveis e alcançáveis que impulsionarão o crescimento e o sucesso do seu negócio."
          },
          {
            numero: 3,
            titulo: "Desenvolvimento de Estratégia",
            descricao: "Criamos estratégias personalizadas e planos de ação detalhados alinhados aos seus objetivos e adaptados às realidades específicas do seu mercado."
          },
          {
            numero: 4,
            titulo: "Implementação",
            descricao: "Oferecemos suporte prático durante a implementação, ajudando sua equipe a executar as estratégias desenvolvidas e a superar obstáculos que possam surgir."
          },
          {
            numero: 5,
            titulo: "Avaliação e Refinamento",
            descricao: "Monitoramos o progresso, avaliamos os resultados em relação aos objetivos estabelecidos e refinamos as estratégias conforme necessário para otimizar os resultados."
          }
        ],
        projetosRelacionados: [
          {
            id: 11,
            titulo: "Rebranding Corporativo Banco Nacional",
            imagem: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
            cliente: "Banco Nacional de Angola",
            categoria: "Identidade Visual"
          },
          {
            id: 12,
            titulo: "Campanha Social 'Educação Para Todos'",
            imagem: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&crop=entropy",
            cliente: "Ministério da Educação",
            categoria: "Campanha Social"
          }
        ]
      }
    ];
    
    // Encontrar o serviço correspondente ao slug
    const servicoEncontrado = servicosDB.find(s => s.slug === slug);
    
    if (servicoEncontrado) {
      setServico(servicoEncontrado);
    }
    
    setIsLoading(false);
  }, [slug]);

  // Se está carregando, exibir indicador de carregamento
  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#FFC400] border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </>
    );
  }

  // Se o serviço não for encontrado
  if (!servico) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Serviço não encontrado</h1>
          <p className="text-gray-600 text-center mb-8">O serviço que você está procurando não foi encontrado.</p>
          <Link href="/">
            <a className="bg-[#FFC400] text-black px-6 py-3 rounded-md hover:bg-[#FFC400]/90 transition-all duration-300">
              Voltar para a página inicial
            </a>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section 
        ref={sectionRefs.hero}
        className="relative pt-24 pb-20 bg-black overflow-hidden"
      >
        {/* Imagem de fundo com overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={servico.imagemCapa} 
            alt={servico.titulo} 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center mb-6">
              <div className="w-12 h-1 bg-[#FFC400]"></div>
              <span className="ml-4 text-gray-400 font-medium uppercase tracking-wider text-sm">Nossos serviços</span>
            </div>
            
            <h1 className={`text-white font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 transition-all duration-1000 transform ${isInView.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {servico.titulo}
            </h1>
            
            <p className={`text-gray-300 text-xl max-w-2xl mb-10 transition-all duration-1000 delay-300 transform ${isInView.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {servico.descricaoCurta}
            </p>
            
            <div className={`transition-all duration-1000 delay-500 transform ${isInView.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Button
                onClick={() => {
                  const contactSection = document.getElementById("contacto");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="bg-[#FFC400] text-black hover:bg-[#FFC400]/90 py-6 px-8 font-semibold shadow-lg hover:shadow-[#FFC400]/20 hover:translate-y-[-5px] transition-all duration-300 rounded-md group"
              >
                <span className="flex items-center">
                  Solicitar este serviço
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
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decoração */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent opacity-5"></div>
      </section>
      
      {/* Descrição detalhada */}
      <section 
        ref={sectionRefs.descricao}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-2/3">
              <div className={`mb-8 transition-all duration-1000 transform ${isInView.descricao ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 relative">
                  Sobre este serviço
                  <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#FFC400] -mb-3"></span>
                </h2>
                
                <div className="space-y-6">
                  {servico.descricaoCompleta.map((paragrafo, idx) => (
                    <p key={idx} className={`text-gray-700 leading-relaxed text-lg transition-all duration-1000 delay-${(idx + 1) * 100} transform ${isInView.descricao ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                      {paragrafo}
                    </p>
                  ))}
                </div>
              </div>
              
              <div className={`mt-12 transition-all duration-1000 delay-500 transform ${isInView.descricao ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <Button
                  onClick={() => {
                    const contactSection = document.getElementById("contacto");
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="bg-black text-white hover:bg-gray-900 py-4 px-6 font-medium rounded-md transition-all duration-300 hover:translate-y-[-2px] group"
                >
                  <span className="flex items-center">
                    Fale conosco sobre este serviço
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
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
                </Button>
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <div className={`glass-card p-8 rounded-xl border border-gray-100 shadow-xl transition-all duration-1000 transform ${isInView.descricao ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
                <div className="w-16 h-16 bg-[#FFC400]/10 rounded-lg flex items-center justify-center mb-6">
                  {servico.icone}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">Por que escolher este serviço?</h3>
                
                <ul className="space-y-4">
                  {servico.beneficios.map((beneficio, idx) => (
                    <li key={idx} className={`flex items-start transition-all duration-700 delay-${idx * 100} transform ${isInView.descricao ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                      <svg className="w-5 h-5 text-[#FFC400] mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{beneficio}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Processo de trabalho */}
      <section 
        ref={sectionRefs.processo}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 transform ${isInView.processo ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nosso Processo</h2>
            <div className="w-24 h-1 bg-[#FFC400] mx-auto"></div>
            <p className="text-gray-700 max-w-2xl mx-auto mt-6 text-lg">
              Conheça nossa metodologia estruturada para entrega de resultados excepcionais
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servico.etapas.map((etapa, idx) => (
              <div 
                key={idx}
                className={`bg-white p-8 rounded-xl shadow-lg border border-gray-100 relative overflow-hidden transition-all duration-1000 delay-${idx * 100} transform ${isInView.processo ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} hover:shadow-xl hover:translate-y-[-5px]`}
              >
                {/* Número da etapa */}
                <div className="absolute -right-8 -top-8 w-32 h-32 flex items-center justify-center">
                  <span className="text-[120px] font-bold text-gray-100 opacity-50">{etapa.numero}</span>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{etapa.titulo}</h3>
                  <p className="text-gray-700">{etapa.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Projetos relacionados */}
      <section 
        ref={sectionRefs.projetos}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 transform ${isInView.projetos ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Projetos Relacionados</h2>
            <div className="w-24 h-1 bg-[#FFC400] mx-auto"></div>
            <p className="text-gray-700 max-w-2xl mx-auto mt-6 text-lg">
              Conheça alguns dos nossos trabalhos recentes nesta área
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servico.projetosRelacionados.map((projeto, idx) => (
              <div 
                key={idx}
                className={`group overflow-hidden rounded-xl shadow-lg relative transition-all duration-1000 delay-${idx * 200} transform ${isInView.projetos ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} hover:shadow-xl`}
              >
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img 
                    src={projeto.imagem}
                    alt={projeto.titulo}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className={`transform transition-all duration-500 ${isInView.projetos ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} group-hover:translate-y-[-10px]`}>
                    <span className="inline-block bg-[#FFC400]/80 backdrop-blur-sm text-black text-xs font-bold uppercase tracking-wider px-2 py-1 rounded mb-2">
                      {projeto.categoria}
                    </span>
                    <h3 className="text-white font-bold text-xl md:text-2xl mb-1">{projeto.titulo}</h3>
                    <p className="text-gray-300">Cliente: {projeto.cliente}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={`text-center mt-16 transition-all duration-1000 delay-500 transform ${isInView.projetos ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Link href="/#portfolio">
              <a className="bg-transparent border border-gray-300 text-gray-800 hover:border-[#FFC400] hover:text-[#FFC400] py-4 px-6 rounded-md transition-all duration-300 inline-flex items-center group">
                Ver todos os projetos
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
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
              </a>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section 
        id="contacto"
        className="py-20 bg-black relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#FFC400] opacity-5 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FFC400] opacity-5 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-white font-bold text-3xl md:text-4xl mb-6">Pronto para transformar sua marca?</h2>
            <p className="text-gray-300 text-lg mb-10">
              Entre em contato conosco para discutir como podemos ajudar a elevar sua marca através de {servico.titulo}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.location.href = "mailto:info@nzinga.ao?subject=Consultoria%20sobre%20" + servico.titulo}
                className="bg-[#FFC400] text-black hover:bg-[#FFC400]/90 py-6 px-8 font-semibold shadow-lg hover:shadow-[#FFC400]/20 hover:translate-y-[-5px] transition-all duration-300 rounded-md"
              >
                Enviar e-mail
              </Button>
              
              <Button 
                onClick={() => window.open("tel:+244923456789")}
                variant="outline"
                className="border-white/30 text-white py-6 px-8 font-medium hover:bg-white/10 backdrop-blur transition-all duration-300 rounded-md"
              >
                +244 923 456 789
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}