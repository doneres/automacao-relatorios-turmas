/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  colors: {
    bg: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    border: string;
    card: string;
    accentPrimary: string;
    accentSecondary: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("theme-mode");
    return (saved as ThemeMode) || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme-mode", mode);
  }, [mode]);

  const colors = {
    light: {
      bg: {
        primary: "#ffffff",
        secondary: "#f5f7fa",
        tertiary: "#eff2f5",
      },
      text: {
        primary: "#1a1f2e",
        secondary: "#5a6370",
        tertiary: "#8a9199",
      },
      border: "#e1e5eb",
      card: "#ffffff",
      accentPrimary: "#ff6b35",
      accentSecondary: "#f7931e",
    },
    dark: {
      bg: {
        primary: "#0f1419",
        secondary: "#1a1f2e",
        tertiary: "#242a37",
      },
      text: {
        primary: "#e8ecf1",
        secondary: "#a0a5b5",
        tertiary: "#737982",
      },
      border: "rgba(255, 107, 53, 0.2)",
      card: "rgba(255, 107, 53, 0.1)",
      accentPrimary: "#ff6b35",
      accentSecondary: "#f7931e",
    },
  };

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleTheme,
        colors: colors[mode],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
