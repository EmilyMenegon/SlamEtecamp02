import styled, { css } from "styled-components";

// =========================================================
// BOTÃO REDONDO (navbar / flutuante)
// =========================================================

export const ToggleButton = styled.button`
  position: relative;

  width: 52px;
  height: 52px;

  flex-shrink: 0;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border-radius: 50%;

  cursor: pointer;

  font-family: "Poppins", sans-serif;

  color: var(--nav-fg);

  background: var(--nav-burger-bg);

  border: 2px solid transparent;

  -webkit-tap-highlight-color: transparent;

  transition:
    transform 0.25s ease,
    background-color 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: scale(1.06);

    color: var(--nav-indicator-fg);

    background: var(--nav-indicator-bg);
  }

  &:active {
    transform: scale(0.96);
  }

  &:focus-visible {
    outline: 3px solid var(--focus-ring);

    outline-offset: 3px;
  }

  ${({ $variant }) =>
    $variant === "floating" &&
    css`
      position: fixed;

      top: 22px;
      right: 22px;

      z-index: 2000;

      width: 48px;
      height: 48px;

      color: var(--text-primary);

      background: var(--surface);

      border-color: var(--border-subtle);

      box-shadow:
        0 10px 24px rgba(0, 0, 0, 0.12),
        0 2px 6px rgba(0, 0, 0, 0.08);

      &:hover {
        color: #111111;

        background: #ffdb53;

        border-color: #ffdb53;
      }

      @media (max-width: 700px) {
        top: 14px;
        right: 14px;

        width: 44px;
        height: 44px;
      }
    `}

  @media (max-width: 1200px) {
    width: 48px;
    height: 48px;
  }

  @media (max-width: 1000px) {
    width: 44px;
    height: 44px;
  }

  /* No celular a opção fica dentro do menu (variant="menu") */
  ${({ $variant }) =>
    $variant === "nav" &&
    css`
      @media (max-width: 700px) {
        display: none;
      }
    `}

  @media print {
    display: none;
  }
`;

// =========================================================
// ÍCONES SOL / LUA (troca com rotação)
// =========================================================

export const IconStack = styled.span`
  position: relative;

  width: 22px;
  height: 22px;

  display: block;

  svg {
    position: absolute;
    inset: 0;

    width: 100%;
    height: 100%;

    stroke-width: 2.2;

    transition:
      transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
      opacity 0.25s ease;
  }

  /* claro: mostra a lua (ação = escurecer) */
  .lua {
    opacity: ${({ $dark }) => ($dark ? 0 : 1)};

    transform: ${({ $dark }) =>
      $dark ? "rotate(-90deg) scale(0.4)" : "rotate(0) scale(1)"};
  }

  /* escuro: mostra o sol (ação = clarear) */
  .sol {
    opacity: ${({ $dark }) => ($dark ? 1 : 0)};

    transform: ${({ $dark }) =>
      $dark ? "rotate(0) scale(1)" : "rotate(90deg) scale(0.4)"};
  }

  @media (prefers-reduced-motion: reduce) {
    svg {
      transition: opacity 0.15s ease;
    }
  }
`;

// =========================================================
// LINHA DO MENU MOBILE
// =========================================================

export const MenuRow = styled.button`
  width: 100%;

  min-height: 46px;

  margin-top: 6px;

  padding: 0 14px 0 17px;

  display: none;

  align-items: center;

  justify-content: space-between;

  gap: 12px;

  border: 0;

  border-top: 1px solid var(--nav-border);

  border-radius: 0 0 13px 13px;

  background: transparent;

  color: var(--nav-fg);

  font-family: "Poppins", sans-serif;

  font-size: 16px;

  font-weight: 600;

  cursor: pointer;

  .rotulo {
    display: inline-flex;

    align-items: center;

    gap: 10px;
  }

  &:focus-visible {
    outline: 3px solid var(--focus-ring);

    outline-offset: 2px;
  }

  @media (max-width: 700px) {
    display: flex;
  }
`;

export const Switch = styled.span`
  position: relative;

  width: 44px;
  height: 26px;

  flex-shrink: 0;

  border-radius: 999px;

  background: ${({ $on }) => ($on ? "var(--nav-indicator-bg)" : "rgba(17, 17, 17, 0.18)")};

  transition: background-color 0.25s ease;

  span {
    position: absolute;

    top: 3px;
    left: 3px;

    width: 20px;
    height: 20px;

    border-radius: 50%;

    background: ${({ $on }) => ($on ? "var(--nav-indicator-fg)" : "#ffffff")};

    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);

    transform: translateX(${({ $on }) => ($on ? "18px" : "0")});

    transition: transform 0.25s ease;
  }
`;
