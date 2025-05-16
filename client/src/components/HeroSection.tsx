import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToServices = () => {
    const servicesSection = document.getElementById("servicos");
    if (servicesSection) {
      const headerOffset = 80;
      const elementPosition = servicesSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="hero" className="hero-gradient min-h-screen relative flex items-center">
      <div className="container mx-auto px-4 lg:px-8 py-24 pt-32">
        <div className="flex flex-col max-w-3xl">
          <h1 className="text-white font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight animate-fade-in-up">
            Transformamos a sua marca em uma experiência memorável
          </h1>
          <p className="text-[#AAAAAA] text-lg md:text-xl mt-8 max-w-2xl animate-fade-in-up delay-200">
            Combinamos criatividade, estratégia e tecnologia para criar soluções inovadoras que elevam a comunicação da sua marca.
          </p>
          <div className="mt-10 animate-fade-in-up delay-400">
            <Button 
              onClick={scrollToServices}
              className="bg-[#FFC400] text-black hover:bg-[#FFC400]/90 py-6 px-6 font-semibold group"
            >
              Ler Mais
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
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-10 right-10 hidden lg:block">
        <div className="w-24 h-24 border-2 border-[#FFC400] opacity-20"></div>
      </div>
      <div className="absolute top-1/3 right-20 hidden lg:block">
        <div className="w-8 h-8 bg-[#FFC400] opacity-10"></div>
      </div>
    </section>
  );
}
