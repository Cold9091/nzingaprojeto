import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Verificar o tema salvo no localStorage
    const savedTheme = localStorage.getItem("theme") as Theme;
    
    // Verificar a preferência do sistema
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Retornar tema salvo ou preferência do sistema
    return savedTheme || (prefersDark ? "dark" : "light");
  });
  
  useEffect(() => {
    // Aplicar classe ao html baseado no tema
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    // Salvar no localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);
  
  // Função para alternar entre os temas
  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
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