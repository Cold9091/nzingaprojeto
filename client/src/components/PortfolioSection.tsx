import { Button } from "@/components/ui/button";

interface PortfolioItemProps {
  image: string;
  title: string;
  category: string;
  alt: string;
}

function PortfolioItem({ image, title, category, alt }: PortfolioItemProps) {
  return (
    <div className="group overflow-hidden rounded-lg shadow-md relative">
      <img 
        src={image}
        alt={alt}
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 left-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <h3 className="text-white font-bold text-xl">{title}</h3>
        <p className="text-[#AAAAAA] mt-2">{category}</p>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const portfolioItems = [
    {
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Rebranding Corporativo",
      category: "Identidade Visual",
      alt: "Projeto de identidade visual corporativa com elementos modernos"
    },
    {
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Campanha de Lançamento",
      category: "Marketing Digital",
      alt: "Campanha publicitária moderna para lançamento de produto"
    },
    {
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Website Premium",
      category: "Web Design",
      alt: "Design moderno de website com influência africana"
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
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-black font-bold text-3xl md:text-4xl">Nosso Portfólio</h2>
          <div className="w-24 h-1 bg-[#FFC400] mx-auto mt-6"></div>
          <p className="text-[#AAAAAA] max-w-2xl mx-auto mt-6">
            Conheça alguns dos nossos projetos mais recentes e como transformamos desafios em soluções criativas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <PortfolioItem 
              key={index}
              image={item.image}
              title={item.title}
              category={item.category}
              alt={item.alt}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            onClick={scrollToContact}
            className="bg-black text-white hover:bg-black/80 py-6 px-6 font-semibold group"
          >
            Ver todos os projetos
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
          </Button>
        </div>
      </div>
    </section>
  );
}
