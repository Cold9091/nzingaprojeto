import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <Card className="bg-white shadow-md rounded-lg border-t-4 border-[#FFC400] transition-all duration-300 hover:translate-y-[-10px] hover:shadow-xl">
      <CardContent className="p-8">
        <div className="w-16 h-16 bg-[#FFC400] bg-opacity-10 rounded-full flex items-center justify-center mb-6">
          {icon}
        </div>
        <h3 className="font-bold text-xl mb-4">{title}</h3>
        <p className="text-[#AAAAAA]">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function ServicesSection() {
  const services = [
    {
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
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
      title: "Estratégia de Marca",
      description: "Desenvolvemos identidades de marca autênticas que conectam sua empresa ao seu público-alvo e diferenciam-na da concorrência."
    },
    {
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
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
      title: "Design Gráfico",
      description: "Criamos soluções visuais que comunicam a essência da sua marca com impacto e elegância."
    },
    {
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
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
      title: "Marketing Digital",
      description: "Transformamos sua presença online com estratégias que geram resultados mensuráveis e conversões efetivas."
    }
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById("contacto");
    if (contactSection) {
      const headerOffset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="servicos" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-black font-bold text-3xl md:text-4xl">Nossos Serviços</h2>
          <div className="w-24 h-1 bg-[#FFC400] mx-auto mt-6"></div>
          <p className="text-[#AAAAAA] max-w-2xl mx-auto mt-6">
            Oferecemos soluções integradas e personalizadas para impulsionar sua marca no mercado.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={scrollToContact}
            className="inline-flex items-center text-[#FFC400] font-semibold group"
          >
            Ver todos os serviços
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
              className="ml-2 transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
