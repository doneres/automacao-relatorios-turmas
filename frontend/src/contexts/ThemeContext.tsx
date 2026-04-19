/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyTheme(dark: boolean) {
  if (dark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // Padrão: CLARO. Só escuro se o usuário salvou explicitamente.
    const saved = localStorage.getItem("cp-theme-v2");
    const dark = saved === "dark";
    applyTheme(dark); // aplica ANTES da primeira renderização
    return dark;
  });

  useEffect(() => {
    applyTheme(isDark);
    localStorage.setItem("cp-theme-v2", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme: () => setIsDark((d) => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
