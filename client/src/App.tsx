import { Route, Switch } from "wouter";
import { useEffect, useState } from "react";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import ServicoDetalhes from "@/pages/ServicoDetalhes";

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);
  const [cursorActive, setCursorActive] = useState(false);

  useEffect(() => {
    // Acompanhar posição do mouse
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Detectar hover em elementos clicáveis
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.hasAttribute("role") || 
        target.classList.contains("clickable") ||
        target.closest("a") || 
        target.closest("button") || 
        target.closest("[role='button']") ||
        target.closest(".clickable")
      ) {
        setCursorHover(true);
      }
    };

    const handleMouseOut = () => {
      setCursorHover(false);
    };

    // Detectar cliques
    const handleMouseDown = () => {
      setCursorActive(true);
    };

    const handleMouseUp = () => {
      setCursorActive(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Cursor personalizado (apenas em desktop) */}
      <div
        className={`custom-cursor ${cursorHover ? "hover" : ""} ${cursorActive ? "active" : ""}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      ></div>
      <div
        className={`custom-cursor-dot ${cursorHover ? "hover" : ""} ${cursorActive ? "active" : ""}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      ></div>
      
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/servico/:slug" component={ServicoDetalhes} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
