import { createContext, useContext } from "react";

export const THEME_STORAGE_KEY = "slam-theme";

export const ThemeContext = createContext(null);

/* Tema atual e funções para trocar: { theme, isDark, setTheme, toggleTheme } */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme precisa estar dentro de <ThemeProvider>.");
  return context;
}

/* Lê o valor atual de um token CSS (útil para animações GSAP). */
export function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/* Centro do elemento clicado: ponto de origem da transição circular. */
export function originFrom(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}
