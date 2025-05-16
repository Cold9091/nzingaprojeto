import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  details: string[];
}

function ContactInfoItem({ icon, title, details }: ContactInfo) {
  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-[#FFC400] bg-opacity-10 rounded-full flex items-center justify-center">
          {icon}
        </div>
        <span className="ml-3 text-white font-medium">{title}</span>
      </div>
      <div className="text-[#AAAAAA] pl-14">
        {details.map((detail, index) => (
          <p key={index}>{detail}</p>
        ))}
      </div>
    </div>
  );
}

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Erro no formulário",
        description: "Por favor, preencha todos os campos do formulário.",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "E-mail inválido",
        description: "Por favor, forneça um endereço de e-mail válido.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/contact", formData);
      
      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo seu contato. Responderemos em breve.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfoItems: ContactInfo[] = [
    {
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#FFC400" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      ),
      title: "Nosso Endereço",
      details: ["Avenida Agostinho Neto, 245", "Luanda, Angola"]
    },
    {
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#FFC400" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
      ),
      title: "E-mail",
      details: ["info@nzinga.ao", "contacto@nzinga.ao"]
    },
    {
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#FFC400" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      ),
      title: "Telefone",
      details: ["+244 923 456 789", "+244 912 345 678"]
    },
    {
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#FFC400" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
      title: "Horário",
      details: ["Segunda - Sexta", "8:00 - 18:00"]
    }
  ];

  return (
    <section id="contacto" className="py-20 bg-black">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-1 bg-[#FFC400]"></div>
              <span className="ml-4 text-[#AAAAAA] font-medium">CONTACTE-NOS</span>
            </div>
            <h2 className="text-white font-bold text-3xl md:text-4xl leading-tight mb-6">
              Vamos transformar a sua marca juntos
            </h2>
            <p className="text-[#AAAAAA] mb-8">
              Estamos prontos para entender os seus desafios e criar soluções que elevem a sua marca a outro nível. Preencha o formulário e entraremos em contacto em até 24 horas.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {contactInfoItems.map((item, index) => (
                <ContactInfoItem
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  details={item.details}
                />
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 bg-white p-8 rounded-lg">
            <h3 className="text-black font-bold text-2xl mb-6">Fale connosco</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-[#AAAAAA] text-sm font-medium mb-2">Nome</label>
                  <Input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC400]" 
                    placeholder="Seu nome" 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[#AAAAAA] text-sm font-medium mb-2">E-mail</label>
                  <Input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC400]" 
                    placeholder="Seu e-mail" 
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-[#AAAAAA] text-sm font-medium mb-2">Assunto</label>
                <Input 
                  type="text" 
                  id="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC400]" 
                  placeholder="Assunto da mensagem" 
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-[#AAAAAA] text-sm font-medium mb-2">Mensagem</label>
                <Textarea 
                  id="message" 
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC400]" 
                  placeholder="Sua mensagem..." 
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#FFC400] text-black hover:bg-[#FFC400]/90 py-6 px-6 font-semibold flex items-center justify-center"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                {!isSubmitting && (
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
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
