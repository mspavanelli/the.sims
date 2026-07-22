---
name: The Sims
description: Um mundo de bolso onde a relação de duas pessoas existe como save de simulador de vida.
colors:
  verde-menta-viva: "#17c08a"
  verde-profundo: "#0ba374"
  verde-broto: "#38d39f"
  azul-interface: "#2f8bff"
  azul-piscina: "#4aa6ff"
  azul-fundo: "#1f6fe0"
  roxo-aspiracao: "#7b6cff"
  coral-carinho: "#ff7a8a"
  ambar-conquista: "#ffbf5c"
  limao-segredo: "#ffe58a"
  menta-lavada: "#d3f6e2"
  ceu-lavado: "#dcefff"
  nevoa-de-jardim: "#eef6f2"
  painel: "#ffffff"
  painel-recuado: "#f6faf8"
  tinta-mata: "#123528"
  tinta-folha: "#2b4a3e"
  tinta-salvia: "#5c7268"
  tinta-musgo: "#90a49b"
typography:
  display:
    fontFamily: "Baloo 2, Nunito, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 5vw, 2.9rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "normal"
  headline:
    fontFamily: "Baloo 2, Nunito, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 4vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.12
  title:
    fontFamily: "Baloo 2, Nunito, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Nunito, Quicksand, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Nunito, Quicksand, system-ui, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 800
    lineHeight: 1.3
rounded:
  sm: "10px"
  md: "16px"
  lg: "24px"
  xl: "34px"
  pill: "999px"
  blob: "42% 58% 55% 45% / 52% 44% 56% 48%"
spacing:
  s-1: "4px"
  s-2: "8px"
  s-3: "12px"
  s-4: "16px"
  s-5: "24px"
  s-6: "32px"
  s-7: "48px"
  s-8: "64px"
components:
  button-primary:
    backgroundColor: "{colors.azul-interface}"
    textColor: "{colors.painel}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.azul-fundo}"
    textColor: "{colors.painel}"
  button-ghost:
    backgroundColor: "{colors.painel}"
    textColor: "{colors.tinta-folha}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  button-soft:
    backgroundColor: "{colors.menta-lavada}"
    textColor: "{colors.verde-profundo}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  button-icon:
    backgroundColor: "{colors.painel-recuado}"
    textColor: "{colors.tinta-folha}"
    rounded: "{rounded.pill}"
    size: "40px"
  panel:
    backgroundColor: "{colors.painel}"
    rounded: "{rounded.lg}"
    padding: "{spacing.s-5}"
  input:
    backgroundColor: "{colors.painel-recuado}"
    textColor: "{colors.tinta-mata}"
    rounded: "{rounded.md}"
    padding: "11px 14px"
  chip:
    backgroundColor: "{colors.painel-recuado}"
    textColor: "{colors.tinta-folha}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  nav-link:
    textColor: "{colors.tinta-salvia}"
    rounded: "{rounded.pill}"
    padding: "10px 14px"
  nav-link-active:
    backgroundColor: "{colors.menta-lavada}"
    textColor: "{colors.verde-profundo}"
---

# Design System: The Sims

## 1. Overview

**Creative North Star: "O Mundo de Bolso"**

Um mundo inteiro miniaturizado numa tela de celular. O fundo não é uma cor chapada: são duas manchas de luz — azul no canto superior esquerdo, verde no direito — fixas atrás de tudo, como o céu de um lugar que continua ali quando ninguém está olhando. Sobre esse céu pousam painéis brancos de cantos generosos, leves, com sombra difusa. Nada tem quina, nada é retangular por obrigação: avatares e emojis de cabeçalho usam formas de blob assimétrico, porque coisa viva não é retângulo.

O sistema é lúdico sem ser infantil. A gramática vem de simuladores cozy — Animal Crossing, Stardew Valley, The Sims — traduzida em painéis flutuantes, pills coloridas por categoria, emoji como ícone de primeira classe e movimento com mola (`--ease-bounce`). O que ele explicitamente rejeita: **dashboard/CRM** (grade de cards idênticos, métricas, gráficos, KPIs), **app de hábitos** (streaks, notas, barra que cobra), **rede social** (feed, curtidas, plateia) e **app infantil** (cor berrante, mascote, tipografia de desenho animado). O risco real é o primeiro: tem CRUD de verdade por baixo, e CRUD puxa pra grade de cards iguais toda vez que ninguém está prestando atenção.

Densidade é baixa por escolha. Celular, uma mão, sessões curtas: poucos elementos por tela, alvos grandes, texto curto em português coloquial. Onde um app de produtividade colocaria um número, este coloca uma frase.

**Key Characteristics:**
- Céu de luz fixo atrás de painéis brancos flutuantes
- Cantos muito arredondados (16–34px) e formas de blob para o que é vivo
- Emoji como ícone canônico — não há biblioteca de ícones
- Cor codifica categoria, sempre acompanhada de texto ou emoji
- Movimento com mola, curto, sempre com alternativa em `prefers-reduced-motion`
- Zero métrica, zero nota, zero streak

## 2. Colors

Uma paleta de simulador: verdes e azuis saturados sobre neutros levemente esverdeados, com roxo, coral e âmbar entrando só onde uma categoria precisa se distinguir.

### Primary
- **Verde Menta Viva** (`--accent`, `--c-green-500`): a cor da marca. Ações concluídas, estado ativo, foco (`--sh-ring`), o coração da NavBar. É o verde do favicon e do `theme-color`.
- **Verde Profundo** (`--accent-strong`, `--c-green-600`): a variante legível. Todo texto verde sobre fundo claro usa esta, nunca a Menta Viva.
- **Verde Broto** (`--c-green-400`): decorativo — início de gradiente, linha da timeline, blobs. Nunca carrega texto.

### Secondary
- **Azul Interface** (`--accent-2`, `--c-blue-500`): ação primária e navegação. Fecha o gradiente dos botões e o `chapter-banner`.
- **Azul Piscina** (`--c-blue-400`) e **Azul Fundo** (`--c-blue-600`): decorativo e estado hover, respectivamente.

### Tertiary
- **Roxo Aspiração** (`--accent-3`): aspirações e planos de longo prazo. A cor do que ainda não aconteceu.
- **Coral Carinho** (`--accent-warm`): afeto, remoção suave, o ♡ da marca. Também o coral dos blobs decorativos.
- **Âmbar Conquista** (`--c-amber-400`) e **Limão Segredo** (`--c-lemon-300`): destaque raro — conquistas, easter eggs, brilho.

### Neutral
- **Névoa de Jardim** (`--bg`): fundo do documento, sob as duas manchas de luz (`--bg-tint-a` Céu Lavado, `--bg-tint-b` Menta Lavada).
- **Painel** (`--surface`) e **Painel Recuado** (`--surface-2`): superfície de conteúdo e superfície de formulário/rodapé. Input recuado sobre painel branco é o padrão do sistema — o campo é um buraco, não uma caixa.
- **Tinta Mata** (`--ink-900`): todo texto principal e todo título. 13.4:1 sobre branco.
- **Tinta Folha** (`--ink-700`): labels de campo e texto de botão fantasma. 9.8:1.
- **Tinta Sálvia** (`--ink-500`): texto secundário e `.muted`. 5.2:1 sobre branco, 4.7:1 sobre a Névoa de Jardim — é o piso legível do sistema.
- **Tinta Musgo** (`--ink-300`): 2.6:1 sobre branco. **Reprovado para texto.**

### Named Rules

**A Regra da Tinta Musgo.** `--ink-300` é decoração, não texto. Placeholder, dica de campo e qualquer palavra que precise ser lida usam `--ink-500` no mínimo. Se um texto em Musgo sumiu no sol do meio-dia, ele nunca deveria estar em Musgo.

**A Regra do Verde Legível.** Branco sobre `--c-green-500` dá 2.35:1 e sobre `--c-green-400` é pior. Verde saturado é fundo de área grande, forma decorativa ou preenchimento de barra — nunca fundo de texto pequeno em branco. Texto verde sobre claro usa sempre `--accent-strong`.

**A Regra da Cor Acompanhada.** Nenhum estado, categoria ou humor é comunicado só por cor. Sempre vem com emoji, texto ou forma junto.

## 3. Typography

**Display Font:** Baloo 2 (fallback Nunito, system-ui)
**Body Font:** Nunito (fallback Quicksand, system-ui)

**Character:** Baloo 2 é um sans arredondado de terminais grossos, quase de placa de sorveteria — é o que dá o tom lúdico sem virar Comic Sans. Nunito é o parceiro humanista de contraste baixo: carrega texto corrido, labels e formulários sem competir. As duas são famílias arredondadas, então a distinção **não** é feita por forma e sim por peso e função: display sempre 700–800, corpo em 400–600. Toda a identidade tipográfica do projeto está nesse par; não substituir.

### Hierarchy
- **Display** (Baloo 2, 700, `clamp(1.9rem, 5vw, 2.9rem)`, 1.12): nome do save no `chapter-banner`. Um por tela, no máximo.
- **Headline** (Baloo 2, 700, `clamp(1.5rem, 4vw, 2rem)`, 1.12): título de página no `PageHeader`.
- **Title** (Baloo 2, 700, 1.15rem, 1.2): `.section-title`, título de modal (1.3rem), título de card.
- **Body** (Nunito, 400, 1rem, 1.5): texto corrido, memórias, cartas. Prosa longa fica em 65–75ch; `EmptyState` usa 34ch de propósito.
- **Label** (Nunito, 800, 0.85rem): `.field-label`, texto de botão (0.95rem), pill (0.82rem), nav mobile (0.62rem).

### Named Rules

**A Regra do Peso, Não do Tamanho.** Hierarquia neste sistema se faz com peso (400 → 700 → 800) e família, não com escalas gigantes. Nenhum texto passa de 2.9rem: é um mundo de bolso, não um outdoor.

**A Regra do Emoji Ícone.** Emoji é o ícone oficial do sistema — em nav, cabeçalho, pill, timeline e estado vazio. Não introduzir biblioteca de ícones SVG: misturar as duas linguagens quebra a voz. Emoji decorativo leva `aria-hidden`; emoji que carrega significado leva texto equivalente.

## 4. Elevation

O sistema é flutuante, em duas camadas e sem exceção para bordas fortes. A camada ambiente é o conteúdo: painéis brancos pousados sobre o céu de luz com `--sh-md` e uma borda de 1px quase invisível em verde translúcido. A camada elevada é o que se destaca de verdade — NavBar de vidro fosco, modal, card em hover — e usa `--sh-lg` ou vidro. Não existe superfície plana encostada no fundo: se algo não flutua, ele não é um painel, é um recuo (`--surface-2`).

### Shadow Vocabulary
- **`--sh-sm`** (`0 4px 12px rgba(23,98,74,0.08)`): elementos pequenos que pousam — avatar, botão fantasma, emoji de cabeçalho, ponto da timeline.
- **`--sh-md`** (`0 12px 30px rgba(23,98,74,0.12)`): repouso de todo `.panel` e da NavBar.
- **`--sh-lg`** (`0 24px 60px rgba(23,98,74,0.18)`): hover de card e `chapter-banner`. É elevação real, não ênfase visual.
- **`--sh-ring`** (`0 0 0 4px rgba(23,192,138,0.18)`): foco de teclado global via `:focus-visible`. Nunca remover.

### Named Rules

**A Regra da Sombra Verde.** Toda sombra do sistema é verde-escura translúcida (`rgba(23,98,74,…)`), nunca preta. Sombra preta sobre a Névoa de Jardim suja o céu e datou o app em 2014 na hora.

**A Regra do Vidro Raro.** `backdrop-filter` existe em exatamente três lugares: NavBar, fundo de modal e o chip do `chapter-banner`. Vidro é o material da navegação e da sobreposição — não é decoração de card.

## 5. Components

### Buttons
- **Shape:** pill total (`--r-pill`), padding `12px 20px`, peso 800, `0.95rem`. Versão `sm` em `8px 14px` / `0.85rem`.
- **Primary:** hoje um gradiente verde→azul com sombra azul. Ação principal, uma por tela.
- **Hover / Focus:** sobe 2px com sombra mais forte; `:active` afunda pra `scale(0.96)` em `--ease-bounce`. Foco herda o anel global.
- **Ghost:** superfície branca + `--sh-sm`, texto Tinta Folha. Ação secundária.
- **Soft:** Menta Lavada com texto Verde Profundo. Ação terciária dentro de painel.
- **Danger:** `#ffe3e6` com texto `#d63a4c` — nunca vermelho chapado; remover algo aqui não é erro grave.
- **Icon:** 40×40 circular, Painel Recuado, vira Menta Lavada no hover.
- **Disabled:** `saturate(0.55)` + `opacity(0.72)`, sem sombra, sem transform.

### Chips e Pills
- **`.chip`:** neutro (Painel Recuado / Tinta Folha), pill, 0.82rem/700. Metadado.
- **`CategoryPill`:** cor por categoria via `--cp`, com `color-mix(--cp 15%, white)` de fundo e texto misturado com a tinta. Ativa: fundo saturado, texto branco e sombra colorida. Sobe 2px no hover.
- **`TraitBadge`:** mesma mecânica, mistura 14%. Traços de personagem.
- **`.choice`:** pill com borda de 2px transparente que ganha cor quando ligada. É o radio/checkbox do sistema — não usar controle nativo.

### Cards / Containers
- **`.panel`** é o container canônico: branco, `--r-lg` (24px), `--sh-md`, borda de 1px em verde 6%. Padding `--s-5`.
- **`.card-hover`** adiciona subida de 4px em `--ease-bounce` + `--sh-lg`. Só onde o card inteiro é clicável.
- **Nunca aninhar painel dentro de painel.** Dentro de um painel, a separação é por `--surface-2`, espaçamento ou divisória de 1px.

### Inputs / Fields
- **Style:** fundo Painel Recuado, borda de 2px transparente, `--r-md`, padding `11px 14px`. O campo é um recuo, não uma caixa contornada.
- **Focus:** a borda ganha Verde Menta Viva e o fundo vira branco — o campo "sobe" pra superfície.
- **Select:** seta desenhada em dois gradientes; `appearance: none`. Textarea com `min-height: 84px` e resize vertical.
- **`.field-label`** em 800/0.85rem Tinta Folha; `.field-hint` **deve** usar Tinta Sálvia (ver A Regra da Tinta Musgo).
- **`TagInput`:** chips removíveis com fundo `color-mix(--tag-accent 16%, white)` e botão × circular.

### Navigation
- **Mobile (<900px):** barra inferior flutuante, presa 12px das bordas, altura 74px, `--r-xl`, vidro fosco. Emoji 1.35rem sobre label de 0.62rem/800. Marca escondida.
- **Desktop (≥900px):** trilho lateral fixo de 232px com a mesma casca de vidro; conteúdo com `padding-left: 252px`. Marca no topo, Config empurrado pro rodapé com `margin-top: auto`.
- **Ativo:** gradiente Menta Lavada → Céu Lavado com texto Verde Profundo. Hover: Painel Recuado.

### Timeline (componente-assinatura)
Grade de duas colunas (48px + conteúdo). Ponto circular de 44px em superfície branca com anel de 4px na cor do fundo, ligado por uma linha de 3px com gradiente verde→azul a 40% de opacidade. O emoji da memória vive dentro do ponto. É a espinha da Jornada e a única metáfora de progresso do app — não substituir por barra de porcentagem.

### ChapterBanner (componente-assinatura)
O único lugar onde a cor toma a tela: gradiente verde→azul→roxo com três blobs em flutuação lenta e um brilho radial. Carrega o nome do save e o capítulo atual. Um por tela, e só nas telas que abrem um contexto.

## 6. Do's and Don'ts

### Do:
- **Do** manter todo texto legível em `--ink-900`, `--ink-700` ou `--ink-500`. Nada abaixo de 4.5:1.
- **Do** usar `--accent-strong` (`#0ba374`) para qualquer palavra verde sobre fundo claro.
- **Do** acompanhar toda cor de estado com emoji ou texto — o app é usado no celular, na rua, por duas pessoas que podem estar com pressa.
- **Do** dar a cada tela algo que muda sozinho: horário, clima, contagem regressiva, novidade composta. O mundo continua vivo entre as visitas.
- **Do** escrever em português coloquial, minúsculo onde couber, com nomes e datas reais. Texto que serviria pra outro casal está errado.
- **Do** cobrir toda animação nova com `@media (prefers-reduced-motion: reduce)` — o bloco global já existe, mantenha-o valendo.
- **Do** usar emoji como ícone e `aria-hidden` quando ele for decorativo.
- **Do** preferir `--surface-2`, espaçamento ou divisória de 1px quando precisar separar algo dentro de um painel.

### Don't:
- **Don't** usar `--ink-300` (`#90a49b`) em placeholder, dica de campo ou qualquer texto: 2.6:1 sobre branco. Hoje `.field-hint`, `.input::placeholder` e `.eyebrow` violam isso.
- **Don't** pôr texto branco pequeno sobre `--c-green-500` ou `--c-green-400` (2.35:1 e pior).
- **Don't** usar `border-left`/`border-right` colorida acima de 1px como listra de destaque. `GoalCard.css` faz isso hoje (`border-left: 4px`) e deve ser reescrito com borda completa, tinta de fundo ou o próprio emoji da meta.
- **Don't** repetir a `.eyebrow` (maiúsculas tracked) acima de toda seção. Ela aparece em cinco cards da Home; isso é andaime, não voz. Uma por tela, no máximo — de preferência nenhuma.
- **Don't** construir grade de cards idênticos com ícone + título + texto. É a rota direta pro **dashboard/CRM**, a anti-referência número um do projeto.
- **Don't** introduzir métrica, nota, streak ou porcentagem que possa ser lida como cobrança — nada de **app de hábitos**.
- **Don't** adicionar feed, contador de curtidas ou qualquer coisa que sugira plateia: são duas pessoas, não uma **rede social**.
- **Don't** aumentar saturação ou arredondar mais "pra ficar fofo" — a fronteira com **app infantil** está exatamente aí.
- **Don't** aninhar painel dentro de painel.
- **Don't** usar `background-clip: text` com gradiente, nem sombra preta, nem `z-index` arbitrário (a escala é: nav 40, modal 80).
- **Don't** trocar Baloo 2 + Nunito nem introduzir uma terceira família ou uma biblioteca de ícones SVG.
