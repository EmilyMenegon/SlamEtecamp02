import styled, { css, keyframes } from "styled-components";

/* vinho escuro da paleta (primaryDark), usado no lugar do #831614 */
const WINE = "#571111";

/* ============================================================
   ANIMAÇÃO PADRÃO DOS BOTÕES
   Igual à dos botões da tela de login:
   - borda de 2px que muda de cor no hover
   - botão sobe 8px com sombra (5px no celular)
   - bolinha cresce a partir do mouse
   - foco por teclado com contorno amarelo

   bordaHover: a borda no hover precisa contrastar com a cor da
   bolinha (bolinha escura -> borda preta, bolinha amarela -> borda vinho).F
============================================================ */

const botaoBase = css`
  position: relative;
  overflow: hidden;
  isolation: isolate;
  cursor: pointer;
  box-sizing: border-box;
  transition:
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.25s ease,
    box-shadow 0.3s ease,
    color 0.25s ease,
    background 0.25s ease;
`;

const botaoAnimado = (tamanho = 40, escala = 18, bordaHover = "#111111") => css`
  &::before {
    content: "";
    position: absolute;
    left: var(--mouse-x, 50%);
    top: var(--mouse-y, 50%);
    width: ${tamanho}px;
    height: ${tamanho}px;
    border-radius: 50%;
    background: #ffdb53;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-8px);
    border-color: ${bordaHover};
    box-shadow: 0 18px 35px rgba(131, 22, 20, 0.16);
  }

  &:hover::before {
    transform: translate(-50%, -50%) scale(${escala});
  }

  @media (max-width: 768px) {
    &:hover {
      transform: translateY(-5px);
    }
  }

  &:active {
    transform: translateY(-3px) scale(0.98);
  }

  &:focus-visible {
    outline: 3px solid #ffdb53;
    outline-offset: 4px;
  }
`;

/* ============================================================
   ANIMAÇÕES
============================================================ */

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const floating = keyframes`
  0% { transform: translate(0, 0); }
  50% { transform: translate(12px, -18px); }
  100% { transform: translate(0, 0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: .9; }
  50% { transform: scale(1.12); opacity: .6; }
  100% { transform: scale(1); opacity: .9; }
`;

const pixelOneFloat = keyframes`
  0% { transform: translate(0, 0) rotate(-4deg); }
  50% { transform: translate(-8px, -14px) rotate(4deg); }
  100% { transform: translate(0, 0) rotate(-4deg); }
`;

const pixelTwoFloat = keyframes`
  0% { transform: translate(0, 0) rotate(3deg); }
  50% { transform: translate(10px, -12px) rotate(-5deg); }
  100% { transform: translate(0, 0) rotate(3deg); }
`;

const pixelThreeFloat = keyframes`
  0% { transform: translate(0, 0) rotate(-3deg); }
  50% { transform: translate(9px, 13px) rotate(5deg); }
  100% { transform: translate(0, 0) rotate(-3deg); }
`;

/* ============================================================
   PAGE
============================================================ */

export const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  background: var(--page-bg);
  font-family: "Poppins", sans-serif;
  color: var(--text-primary);
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

/* ============================================================
   HERO
============================================================ */

export const Hero = styled.main`
  width: 100%;
  min-height: calc(100vh - 80px);
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--surface);
`;

export const HeroContent = styled.div`
  width: 85%;
  max-width: 1400px;
  flex: 1;
  margin: 0 auto;
  padding: 40px 0 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 70px;
  position: relative;
  z-index: 3;

  @media (max-width: 1100px) {
    width: 88%;
    gap: 40px;
  }

  @media (max-width: 768px) {
    width: 90%;
    padding: 45px 0 40px;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 30px;
  }
`;

/* ============================================================
   LEFT CONTENT
============================================================ */

export const LeftContent = styled.div`
  width: 52%;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${fadeUp} .8s ease both;

  @media (max-width: 900px) {
    width: 55%;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 650px;
    align-items: center;
  }
`;

/* ============================================================
   BADGE
============================================================ */

/* detalhe vinho: selo do evento */
export const EventBadge = styled.div`
  width: fit-content;
  margin-bottom: 22px;
  padding: 9px 15px;
  display: flex;
  align-items: center;
  gap: 9px;
  border-radius: 30px;
  background: ${WINE};
  color: #fff;
  font-size: 1.0rem;
  font-weight: 800;
  letter-spacing: 1.2px;
  box-shadow: 0 8px 20px rgba(87, 17, 17, .32);
  animation: ${fadeUp} .7s ease both;

  @media (max-width: 768px) {
    font-size: .68rem;
  }
`;

export const BadgeDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ffdb53;
  animation: ${pulse} 1.8s ease infinite;
`;

/* ============================================================
   TEXTOS
============================================================ */

export const BigText = styled.h1`
  margin: 0 0 25px;
  color: var(--text-primary);
  font-size: clamp(2.8rem, 5vw, 5rem);
  line-height: 1.04;
  font-weight: 900;
  letter-spacing: -2px;
  animation: ${fadeUp} .85s ease .1s both;

  @media (max-width: 1100px) {
    font-size: clamp(2.5rem, 5vw, 4rem);
  }

  @media (max-width: 768px) {
    font-size: clamp(2.4rem, 9vw, 4rem);
    letter-spacing: -1.5px;
  }

  @media (max-width: 480px) {
    font-size: 2.25rem;
  }
`;

export const Highlight = styled.span`
  color: var(--text-gold-350);
`;

export const Description = styled.p`
  width: 90%;
  margin: 0 0 30px;
  color: var(--text-neutral-750);
  font-size: clamp(1rem, 5.25vw, 1.50rem);
  line-height: 1.7;
  animation: ${fadeUp} .85s ease .2s both;

  /* detalhe vinho: palavras em destaque */
  strong {
    color: var(--text-wine);
    font-weight: 800;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 550px;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  width: 100%;
  max-width: 100%;
  animation: ${fadeUp} .85s ease .3s both;

  a {
    text-decoration: none;
    display: flex;
    width: auto;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    gap: 13px;

    a {
      width: 100%;
    }
  }
`;

/* amarelo, bolinha vinho: a borda fica preta quando o botão enche de vinho */
export const PrimaryLink = styled.button`
  ${botaoBase}
  min-height: 70px;
  padding: 20px 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  width: auto;
  border: 2px solid #ffdb53;
  border-radius: 12px;
  background: #ffdb53;
  color: #000;
  font-family: "Poppins", sans-serif;
  font-size: 1.2rem;
  font-weight: 800;

  ${botaoAnimado(40, 18, "#ffdb53")}

  &::before {
    background: ${WINE};
  }

  span {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    color: inherit;
    transition: color .3s ease;
  }

  &:hover {
    color: #fff;
  }

  svg {
    flex-shrink: 0;
    transition: transform .3s cubic-bezier(.16, 1, .3, 1);
  }

  &:hover svg {
    transform: translateX(6px);
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 0;
    min-height: 70px;
    padding: 20px 15px;
  }
`;

/* detalhe vinho: borda e ícone do botão secundário */
export const SecondaryLink = styled.div`
  min-height: 70px;
  padding: 20px 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  width: auto;
  border: 1.5px solid ${WINE};
  border-radius: 12px;
  background: var(--surface);
  color: var(--text-primary);
  font-family: "Poppins", sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  transition:
    border-color .25s ease,
    background .25s ease,
    transform .25s ease;

  svg {
    color: var(--text-wine);
    transition: transform .25s ease;
  }

  &:hover {
    border-color: ${WINE};
    background: var(--surface-neutral-50-8);
    transform: translateY(-3px);
  }

  &:hover svg {
    transform: translateY(-2px);
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 0;
    min-height: 70px;
    padding: 20px 15px;
  }
`;

export const ImageBox = styled.div`
  width: 46%;
  max-width: 600px;
  min-height: 560px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: ${fadeUp} .9s ease .15s both;

  @media (max-width: 1100px) {
    width: 43%;
    min-height: 500px;
  }

  @media (max-width: 900px) {
    width: 40%;
    min-height: 450px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Image = styled.img`
  width: 100%;
  max-width: 650px;
  height: auto;
  display: block;
  object-fit: contain;
  position: relative;
  z-index: 2;
  filter: var(--illustration-filter);
  box-shadow: none;
`;

/* ============================================================
   PIXELS DECORATIVOS
============================================================ */

export const PixelOne = styled.img`
  filter: var(--illustration-filter);
  position: absolute;
  width: 150px;
  height: auto;
  top: 27%;
  left: -15%;
  z-index: 7;
  display: block;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
  animation: ${pixelOneFloat} 4.5s ease-in-out infinite;
  will-change: transform;

  @media (max-width: 1100px) { width: 65px; left: -8%; }
  @media (max-width: 900px) { width: 58px; left: -8%; }
  @media (max-width: 768px) { width: 52px; top: 22%; left: -6%; }
  @media (max-width: 500px) { width: 44px; left: -3%; }
`;

export const PixelTwo = styled.img`
  filter: var(--illustration-filter);
  position: absolute;
  width: 150px;
  height: auto;
  top: 7%;
  right: -6%;
  z-index: 7;
  display: block;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
  animation: ${pixelTwoFloat} 5s ease-in-out infinite;
  animation-delay: .7s;
  will-change: transform;

  @media (max-width: 1100px) { width: 60px; right: -5%; }
  @media (max-width: 900px) { width: 53px; right: -6%; }
  @media (max-width: 768px) { width: 48px; top: 5%; right: -4%; }
  @media (max-width: 500px) { width: 40px; right: -2%; }
`;

export const PixelThree = styled.img`
  filter: var(--illustration-filter);
  position: absolute;
  width: 150px;
  height: auto;
  bottom: 10%;
  right: -8%;
  z-index: 7;
  display: block;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
  animation: ${pixelThreeFloat} 4.8s ease-in-out infinite;
  animation-delay: 1.2s;
  will-change: transform;

  @media (max-width: 1100px) { width: 68px; right: -7%; }
  @media (max-width: 900px) { width: 60px; right: -7%; }
  @media (max-width: 768px) { width: 55px; bottom: 7%; right: -5%; }
  @media (max-width: 500px) { width: 46px; right: -3%; }
`;

/* ============================================================
   CÍRCULOS
============================================================ */

export const Circle = styled.span`
  position: absolute;
  width: ${({ $size }) => $size || "50px"};
  height: ${({ $size }) => $size || "50px"};
  top: ${({ $top }) => $top || "auto"};
  left: ${({ $left }) => $left || "auto"};
  right: ${({ $right }) => $right || "auto"};
  bottom: ${({ $bottom }) => $bottom || "auto"};
  border-radius: 50%;
  background: #ffdb53;
  opacity: .9;
  box-shadow: none;
  filter: none;
  z-index: 1;
  pointer-events: none;
  animation: ${floating} ${({ $duration }) => $duration || "5s"} ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay || "0s"};
  will-change: transform;

  @media (max-width: 768px) {
    display: none;
  }
`;
