import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  details: string[];
}

function ContactInfoItem({ icon, title, details }: ContactInfo) {
  return (
    <div className="hover-lift group">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-[#FFC400]/10 to-[#FFC400]/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <div className="group-hover:rotate-12 transition-transform duration-300">
            {icon}
          </div>
        </div>
        <span className="ml-3 text-white font-medium group-hover:text-[#FFC400] transition-colors duration-300">{title}</span>
      </div>
      <div className="text-gray-400 pl-14 space-y-1">
        {details.map((detail, index) => (
          <p key={index} className="group-hover:translate-x-1 transition-transform duration-300">{detail}</p>
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
  const [formSuccess, setFormSuccess] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
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
      
      // Show success toast
      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo seu contato. Responderemos em breve.",
      });
      
      // Animate success state
      setFormSuccess(true);
      
      // Reset form after animation
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
        setFormSuccess(false);
      }, 3000);
      
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
          width="24" 
          height="24" 
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
          width="24" 
          height="24" 
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
          width="24" 
          height="24" 
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
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
      title: "Horário",
      details: ["Segunda - Sexta", "8:00 - 18:00"]
    }
  ];

  return (
    <section 
      id="contacto" 
      ref={sectionRef}
      className="py-28 relative bg-gradient-to-b from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black overflow-hidden transition-colors duration-300"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#FFC400] opacity-5 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FFC400] opacity-5 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/4 right-1/4 w-20 h-20 border border-[#FFC400]/10 rounded-full animate-rotate" style={{animationDuration: '20s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-32 h-32 border border-[#FFC400]/10 rounded-full animate-rotate" style={{animationDuration: '30s', animationDirection: 'reverse'}}></div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Coluna de informações de contato */}
          <div className={`lg:w-1/2 transition-all duration-1000 transform ${isInView ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="inline-block mb-4">
              <span className="text-[#FFC400] font-semibold uppercase tracking-wider text-sm">Fale Conosco</span>
            </div>
            <h2 className="text-white font-bold text-4xl md:text-5xl leading-tight mb-6">
              Vamos transformar a sua marca juntos
            </h2>
            <div className="w-24 h-1 bg-[#FFC400] mb-8"></div>
            
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Estamos prontos para entender os seus desafios e criar soluções que elevem a sua marca a outro nível. Preencha o formulário e entraremos em contacto em até 24 horas.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
              {contactInfoItems.map((item, index) => (
                <ContactInfoItem
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  details={item.details}
                />
              ))}
            </div>
            
            {/* Social Media Links */}
            <div className="mt-12">
              <h4 className="text-white font-medium mb-4">Siga-nos nas redes sociais</h4>
              <div className="flex space-x-4">
                {[
                  { 
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    ), 
                    url: "https://facebook.com"
                  },
                  { 
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                      </svg>
                    ), 
                    url: "https://instagram.com"
                  },
                  { 
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect width="4" height="12" x="2" y="9"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    ), 
                    url: "https://linkedin.com"
                  }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:text-[#FFC400] hover:bg-white/10 transition-all duration-300 transform hover:scale-110 hover:rotate-6"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Formulário de contato */}
          <div className={`lg:w-1/2 transition-all duration-1000 transform ${isInView ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="glass-card p-10 rounded-2xl backdrop-blur-xl border border-white/10 shadow-2xl">
              <div className="text-center mb-8">
                <h3 className="text-white font-bold text-2xl mb-2">Envie uma mensagem</h3>
                <p className="text-gray-400">Estamos ansiosos para ouvir sobre seu projeto</p>
              </div>
              
              <form 
                ref={formRef}
                onSubmit={handleSubmit} 
                className={`relative transition-all duration-500 ${
                  formSuccess 
                    ? 'opacity-50 blur-sm' 
                    : 'opacity-100 blur-0'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-white text-sm font-medium mb-2">Nome</label>
                    <Input 
                      type="text" 
                      id="name" 
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC400] focus:border-transparent" 
                      placeholder="Seu nome completo" 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white text-sm font-medium mb-2">E-mail</label>
                    <Input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC400] focus:border-transparent" 
                      placeholder="seu.email@exemplo.com" 
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-white text-sm font-medium mb-2">Assunto</label>
                  <Input 
                    type="text" 
                    id="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC400] focus:border-transparent" 
                    placeholder="Como podemos ajudar?" 
                  />
                </div>
                
                <div className="mb-8">
                  <label htmlFor="message" className="block text-white text-sm font-medium mb-2">Mensagem</label>
                  <Textarea 
                    id="message" 
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC400] focus:border-transparent" 
                    placeholder="Descreva seu projeto ou dúvida em detalhes..." 
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#FFC400] text-black hover:bg-[#FFC400]/90 py-6 px-6 font-semibold flex items-center justify-center group shadow-lg hover:shadow-[#FFC400]/20 transition-all duration-300 hover:translate-y-[-5px] overflow-hidden relative"
                >
                  <span className="flex items-center relative z-10">
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
                        className="ml-2 transition-transform group-hover:translate-x-1"
                      >
                        <path d="m22 2-7 20-4-9-9-4Z"></path>
                        <path d="M22 2 11 13"></path>
                      </svg>
                    )}
                  </span>
                  <span className="absolute inset-0 bg-white/10 animate-shimmer"></span>
                </Button>
              </form>
              
              {/* Estado de sucesso que aparece quando o formulário é enviado */}
              {formSuccess && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center animate-fade-in-up">
                  <div className="w-20 h-20 bg-[#FFC400]/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
                    <svg
                      className="w-10 h-10 text-[#FFC400]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Mensagem Enviada!</h4>
                  <p className="text-gray-300">
                    Agradecemos seu contato. Nossa equipe responderá o mais breve possível.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mapa ou imagem da localização */}
      <div className={`mt-20 container mx-auto px-4 lg:px-8 transition-all duration-1000 delay-300 transform ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="overflow-hidden rounded-xl shadow-2xl glass-dark">
          <iframe 
            title="Localização da Nzinga" 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63037.79996142259!2d13.214883!3d-8.839976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f15cdc8d2c7d%3A0x850dd0b5a0932c!2sLuanda%2C%20Angola!5e0!3m2!1sen!2sus!4v1658419903686!5m2!1sen!2sus" 
            width="100%" 
            height="400" 
            style={{ border: 0 }} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="opacity-90 hover:opacity-100 transition-opacity duration-300"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
