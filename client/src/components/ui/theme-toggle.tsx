import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  // Verifica se estamos em ambiente de navegador
  const isBrowser = typeof window !== 'undefined';
  
  // Impede propagação e garante que o evento de clique não seja capturado por elementos pais
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Garantir que o evento não se propague para elementos pais
    if (isBrowser) {
      document.body.click(); // Força qualquer evento pendente a ser executado
      
      // Adiciona um pequeno atraso para evitar conflitos com outros eventos
      setTimeout(() => {
        toggleTheme();
      }, 10);
    } else {
      toggleTheme();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={theme === "light" ? "Mudar para modo escuro" : "Mudar para modo claro"}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-white/30 dark:bg-black/30 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 shadow-md dark:shadow-white/10 relative z-[100]"
    >
      {theme === "light" ? (
        // Ícone Lua
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
          className="text-gray-800"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      ) : (
        // Ícone Sol
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
          className="text-yellow-300"
        >
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      )}
    </button>
  );
}