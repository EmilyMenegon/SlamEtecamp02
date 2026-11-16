# Modo escuro — Slam Etecamp

## Como funciona para quem usa

- **Primeira visita:** o site segue o tema do sistema (Windows, macOS, Android, iOS).
- **Botão sol/lua:**
  - Nas áreas do usuário e do administrador, fica na navbar, ao lado da foto de perfil.
  - No celular, vira a opção **"Modo escuro"** com chave, dentro do menu (☰).
  - Nas telas sem navbar (início, login, perfil, MAT), fica num botão redondo no canto superior direito. No celular, nas telas de perfil, fica ao lado do botão voltar.
  - Na TV de exibição, fica junto do botão de tela cheia.
- A escolha fica salva no navegador (`localStorage` → `slam-theme`) e vale para todas as abas abertas.
- A troca tem uma revelação circular a partir do botão (Chrome, Edge, Safari 18+). Nos outros navegadores, as cores mudam com uma transição suave. Quem ativou "reduzir movimento" no sistema vê a troca sem animação.

## Arquitetura

| Arquivo | Papel |
|---|---|
| `src/theme/tokens.css` | Todas as cores que mudam entre os temas, como variáveis CSS (`:root` = claro, `[data-theme="dark"]` = escuro) |
| `src/theme/ThemeProvider.jsx` | Lê a preferência, aplica `data-theme` no `<html>`, acompanha o sistema, faz a animação de troca |
| `src/theme/themeContext.js` | `useTheme()`, `cssVar()` (ler token no JS, usado pelo GSAP), `originFrom()` |
| `src/components/themetoggle/` | Botão (`variant="nav" \| "floating" \| "menu"`) e `ThemeIcon` |
| `index.html` | Script que aplica o tema **antes** da primeira pintura (sem "flash" branco) |

No modo claro, os tokens têm **exatamente as cores originais**, então o visual claro não mudou.
Cores de marca usadas em botões e selos (amarelo `#ffdb53`, vinho `#831614` / `#571111`) são iguais nos dois temas e continuam escritas direto nos estilos.

## Ao criar telas novas

Use os tokens em vez de cores fixas:

```js
export const Card = styled.div`
  background: var(--surface);          /* cartão / painel */
  color: var(--text-primary);          /* texto principal */
  border: 1px solid var(--border);     /* borda */

  h2 { color: var(--text-brand); }     /* título vinho */
  p  { color: var(--text-muted); }     /* texto secundário */
`;
```

| Uso | Token |
|---|---|
| Fundo da página | `--page-bg` (creme: `--page-bg-cream`) |
| Cartão / painel / campo | `--surface`, `--surface-cream`, `--surface-highlight` |
| Texto | `--text-primary`, `--text-secondary`, `--text-muted`, `--text-brand` |
| Borda | `--border`, `--border-subtle` |
| Botão escuro (preto no claro) | `--inverse-bg` + `--inverse-fg` |
| Navbar | `--nav-bg`, `--nav-fg`, `--nav-indicator-bg`, `--nav-indicator-fg` |
| Ilustração em traço preto | `filter: var(--illustration-filter)` (contorno branco no escuro) |
| Logo | `filter: var(--logo-filter)` |

**Texto sobre amarelo ou vinho:** use a cor fixa (`#111` / `#fff`), não um token, porque o fundo não muda.

**Para testar:** clique no sol/lua, ou force pelo console:
`localStorage.setItem("slam-theme", "dark"); location.reload()`.
Para voltar a seguir o sistema: `localStorage.removeItem("slam-theme")`.

**GSAP:** animações que gravam cor inline devem ler o token com `cssVar("--nome")` e reaplicar quando o tema mudar (veja `components/layout/index.jsx`).
