import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    
    try {
      // Verificar o tema salvo no localStorage
      const savedTheme = localStorage.getItem("theme") as Theme;
      
      // Verificar a preferência do sistema
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      
      // Retornar tema salvo ou preferência do sistema
      return savedTheme || (prefersDark ? "dark" : "light");
    } catch (error) {
      // Fallback para temas caso haja erro (ex: problemas com localStorage)
      console.error("Erro ao obter tema:", error);
      return 'light';
    }
  });
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      // Aplicar classe ao html baseado no tema
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(theme);
      
      // Salvar no localStorage
      localStorage.setItem("theme", theme);
      
      // Atualizar cor da meta tag theme-color para mobile
      const metaThemeColor = document.querySelector("meta[name='theme-color']");
      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          "content",
          theme === "dark" ? "#121212" : "#ffffff"
        );
      } else {
        // Criar meta tag se não existir
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = theme === "dark" ? "#121212" : "#ffffff";
        document.head.appendChild(meta);
      }
    } catch (error) {
      console.error("Erro ao aplicar tema:", error);
    }
  }, [theme]);
  
  // Função para alternar entre os temas com tratamento de erro
  const toggleTheme = () => {
    try {
      setTheme(prev => prev === "light" ? "dark" : "light");
    } catch (error) {
      console.error("Erro ao alternar tema:", error);
    }
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }
  
  return context;
}