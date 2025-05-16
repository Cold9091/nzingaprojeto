import { Link } from "wouter";

interface FooterLinkProps {
  href: string;
  label: string;
  external?: boolean;
}

function FooterLink({ href, label, external = false }: FooterLinkProps) {
  if (external) {
    return (
      <li>
        <a 
          href={href} 
          className="text-[#AAAAAA] hover:text-[#FFC400] transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      </li>
    );
  }

  // For handling scrolling to sections
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const sectionId = href.replace('#', '');
    const section = document.getElementById(sectionId);
    
    if (section) {
      const headerOffset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <li>
      <a 
        href={href} 
        onClick={handleClick}
        className="text-[#AAAAAA] hover:text-[#FFC400] transition-colors"
      >
        {label}
      </a>
    </li>
  );
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

function SocialLink({ href, icon }: SocialLinkProps) {
  return (
    <a 
      href={href} 
      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-[#AAAAAA] hover:text-[#FFC400] transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between mb-12">
          <div className="mb-8 md:mb-0">
            <Link href="/">
              <a className="logo-underline">
                <h1 className="text-white text-2xl font-bold tracking-wider">NZINGA</h1>
              </a>
            </Link>
            <p className="text-[#AAAAAA] mt-4 max-w-xs">
              Comunicação, Imagem e Estratégia para marcas que desejam se destacar no mercado.
            </p>
            <div className="flex mt-6 space-x-4">
              <SocialLink 
                href="https://facebook.com" 
                icon={
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
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                } 
              />
              <SocialLink 
                href="https://instagram.com" 
                icon={
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
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                } 
              />
              <SocialLink 
                href="https://linkedin.com" 
                icon={
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
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                } 
              />
              <SocialLink 
                href="https://twitter.com" 
                icon={
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
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                } 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <FooterLink href="#hero" label="Home" />
                <FooterLink href="#servicos" label="Serviços" />
                <FooterLink href="#portfolio" label="Portfólio" />
                <FooterLink href="#sobre" label="Sobre" />
                <FooterLink href="#contacto" label="Contacto" />
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Serviços</h4>
              <ul className="space-y-2">
                <FooterLink href="#" label="Branding" />
                <FooterLink href="#" label="Marketing Digital" />
                <FooterLink href="#" label="Web Design" />
                <FooterLink href="#" label="Design Gráfico" />
                <FooterLink href="#" label="Consultoria" />
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Melhores Projetos</h4>
              <ul className="space-y-2">
                <FooterLink href="#" label="Banco Nacional" />
                <FooterLink href="#" label="Telecom Angola" />
                <FooterLink href="#" label="Global Energy" />
                <FooterLink href="#" label="Tech Solutions" />
                <FooterLink href="#" label="Visit Angola" />
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#AAAAAA] text-sm">
              © {new Date().getFullYear()} Nzinga - Todos os direitos reservados
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-[#AAAAAA] text-sm hover:text-[#FFC400] transition-colors">Política de Privacidade</a>
              <a href="#" className="text-[#AAAAAA] text-sm hover:text-[#FFC400] transition-colors">Termos de Serviço</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
