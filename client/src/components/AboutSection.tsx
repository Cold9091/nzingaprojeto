export default function AboutSection() {
  return (
    <section id="sobre" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=750" 
              alt="Equipe de trabalho diversificada em escritório moderno" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
          <div className="lg:w-1/2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-1 bg-[#FFC400]"></div>
              <span className="ml-4 text-[#AAAAAA] font-medium">SOBRE NÓS</span>
            </div>
            <h2 className="text-black font-bold text-3xl md:text-4xl leading-tight mb-6">
              Uma agência com DNA africano e visão global
            </h2>
            <p className="text-[#AAAAAA] mb-4">
              A Nzinga nasceu da paixão por contar histórias autênticas e construir marcas que deixam legado. Nossa missão é transformar a comunicação das empresas angolanas e africanas, combinando nossas raízes culturais com as melhores práticas internacionais.
            </p>
            <p className="text-[#AAAAAA] mb-8">
              Com uma equipe multidisciplinar de criativos, estrategistas e executores, trabalhamos para elevar as marcas a outro patamar de comunicação e imagem.
            </p>
            <div className="flex flex-wrap gap-8 mt-8">
              <div>
                <h3 className="text-4xl font-bold text-[#FFC400] mb-2">10+</h3>
                <p className="text-[#AAAAAA]">Anos de experiência</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-[#FFC400] mb-2">250+</h3>
                <p className="text-[#AAAAAA]">Projetos entregues</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-[#FFC400] mb-2">45+</h3>
                <p className="text-[#AAAAAA]">Clientes satisfeitos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
