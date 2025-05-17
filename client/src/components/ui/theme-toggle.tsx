import { useTheme } from "@/hooks/use-theme";
import { Button } from "./button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  // Função para manipular o clique com prevenção de propagação
  const handleThemeToggle = (e: React.MouseEvent) => {
    // Impedir propagação do evento para que não seja capturado por elementos pais
    e.stopPropagation();
    // Aplicar um pequeno atraso para garantir que o evento seja processado
    setTimeout(() => {
      toggleTheme();
    }, 50);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeToggle}
      className="w-10 h-10 rounded-full transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/10 shadow-lg dark:shadow-white/10 active:scale-95 bg-white/30 dark:bg-black/30 backdrop-blur-sm relative z-50"
      aria-label="Alternar tema"
    >
      {theme === "light" ? (
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
          className="text-gray-800 dark:text-gray-200"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      ) : (
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
    </Button>
  );
}