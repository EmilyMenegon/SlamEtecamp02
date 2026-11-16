import { useCallback, useEffect, useMemo, useState } from "react";

import { ThemeContext, THEME_STORAGE_KEY } from "./themeContext";

/*
  =====================================================
  TEMA (claro / escuro)
  =====================================================
  - Primeira visita: segue o tema do sistema (Windows, macOS, Android, iOS).
  - Depois que a pessoa escolhe, a escolha fica salva neste navegador
    (localStorage "slam-theme") e passa a valer sempre.
  - O atributo data-theme no <html> ativa as variáveis de src/theme/tokens.css.
  - O script inline do index.html aplica o tema antes da primeira pintura,
    então a página nunca "pisca" branca no modo escuro.
*/

const media =
  typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;

function readStoredTheme() {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function systemTheme() {
  return media?.matches ? "dark" : "light";
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#121212" : "#ffdb53");
}

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

export function ThemeProvider({ children }) {
  const [stored, setStored] = useState(readStoredTheme);
  const [system, setSystem] = useState(systemTheme);

  const theme = stored ?? system;

  // aplica no <html> sempre que mudar
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // acompanha o sistema enquanto a pessoa não escolheu manualmente
  useEffect(() => {
    if (!media) return undefined;
    const onChange = () => setSystem(systemTheme());
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, []);

  // sincroniza entre abas abertas do sistema
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === THEME_STORAGE_KEY) setStored(readStoredTheme());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setTheme = useCallback((next, origin) => {
    const commit = () => {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        /* navegação privada: mantém só na sessão */
      }
      applyTheme(next);
      setStored(next);
    };

    if (prefersReducedMotion()) {
      commit();
      return;
    }

    // Revelação circular a partir do botão (Chrome/Edge/Safari 18+)
    if (document.startViewTransition && origin) {
      const { x, y } = origin;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(commit);

      transition.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 520,
              easing: "cubic-bezier(.4, 0, .2, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        })
        .catch(() => {});
      return;
    }

    // Demais navegadores: transição suave de cores
    const root = document.documentElement;
    root.classList.add("theme-switching");
    commit();
    window.setTimeout(() => root.classList.remove("theme-switching"), 350);
  }, []);

  const toggleTheme = useCallback(
    (origin) => setTheme(theme === "dark" ? "light" : "dark", origin),
    [theme, setTheme]
  );

  const value = useMemo(
    () => ({ theme, isDark: theme === "dark", setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
