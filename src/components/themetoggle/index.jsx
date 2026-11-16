import { FiMoon, FiSun } from "react-icons/fi";

import { originFrom, useTheme } from "../../theme/themeContext";

import { ToggleButton, IconStack, MenuRow, Switch } from "./style";

/*
  =====================================================
  BOTÃO DE TEMA (claro / escuro)
  =====================================================
  variant:
    "nav"      -> círculo na navbar, ao lado da foto de perfil
    "floating" -> círculo fixo no canto da tela (páginas sem navbar)
    "menu"     -> linha "Modo escuro" com chave, dentro do menu mobile
*/

/* Só o ícone animado (para usar dentro de botões que já existem) */
export function ThemeIcon() {
  const { isDark } = useTheme();

  return (
    <IconStack $dark={isDark} aria-hidden="true">
      <FiSun className="sol" />
      <FiMoon className="lua" />
    </IconStack>
  );
}

export default function ThemeToggle({ variant = "nav", className, style }) {
  const { isDark, toggleTheme } = useTheme();

  const label = isDark ? "Ativar modo claro" : "Ativar modo escuro";

  if (variant === "menu") {
    return (
      <MenuRow
        type="button"
        role="switch"
        aria-checked={isDark}
        onClick={(event) => toggleTheme(originFrom(event))}
        className={className}
        style={style}
      >
        <span className="rotulo">
          <FiMoon aria-hidden="true" />
          Modo escuro
        </span>

        <Switch $on={isDark} aria-hidden="true">
          <span />
        </Switch>
      </MenuRow>
    );
  }

  return (
    <ToggleButton
      type="button"
      $variant={variant}
      $dark={isDark}
      onClick={(event) => toggleTheme(originFrom(event))}
      aria-label={label}
      title={label}
      className={className}
      style={style}
    >
      <IconStack $dark={isDark} aria-hidden="true">
        <FiSun className="sol" />
        <FiMoon className="lua" />
      </IconStack>
    </ToggleButton>
  );
}
