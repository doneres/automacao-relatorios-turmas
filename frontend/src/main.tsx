import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import App from "./App.tsx";
import Home from "./pages/Home/index.tsx";
import Relatorios from "./pages/Relatorios/index.tsx";
import Configuracao from "./pages/Configuracao/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="relatorios" element={<Relatorios />} />
            <Route path="configuracoes" element={<Configuracao />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
