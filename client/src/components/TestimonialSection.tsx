interface TestimonialCardProps {
  content: string;
  name: string;
  role: string;
  initials: string;
}

function TestimonialCard({ content, name, role, initials }: TestimonialCardProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
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
      <p className="text-[#AAAAAA] italic mb-6">
        "{content}"
      </p>
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-xl font-bold text-[#AAAAAA]">{initials}</span>
        </div>
        <div className="ml-4">
          <h4 className="font-bold">{name}</h4>
          <p className="text-[#AAAAAA] text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialSection() {
  const testimonials = [
    {
      content: "A Nzinga transformou completamente a presença digital da nossa empresa. A equipa é extremamente profissional e entregou resultados acima das expectativas.",
      name: "Maria Andrade",
      role: "CEO, Empresa de Tecnologia",
      initials: "MA"
    },
    {
      content: "O rebranding que a Nzinga fez para nós foi um divisor de águas. Nossa marca ganhou uma nova vida e agora realmente comunica nossos valores.",
      name: "João Carlos",
      role: "Diretor de Marketing, Banco Nacional",
      initials: "JC"
    },
    {
      content: "Buscávamos uma agência que entendesse a cultura angolana e pudesse trazer inovação. A Nzinga superou todas as expectativas com criatividade e profissionalismo.",
      name: "Luísa Santos",
      role: "Gerente, Empresa de Turismo",
      initials: "LS"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-black font-bold text-3xl md:text-4xl">O Que Dizem Nossos Clientes</h2>
          <div className="w-24 h-1 bg-[#FFC400] mx-auto mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              content={testimonial.content}
              name={testimonial.name}
              role={testimonial.role}
              initials={testimonial.initials}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
