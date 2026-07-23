---
name: The Sims
description: Um mundo de bolso onde a relação de duas pessoas existe como save de simulador de vida.
colors:
  verde-menta-viva: "#17c08a"
  verde-profundo: "#0ba374"
  verde-fundo: "#0a7d59"
  verde-tinta: "#066647"
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
  perigo-tinta: "#b31a30"
  perigo-fundo: "#ffe3e6"
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
  action:
    fontFamily: "Nunito, Quicksand, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 800
    lineHeight: 1.2
  pill:
    fontFamily: "Nunito, Quicksand, system-ui, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 800
    lineHeight: 1.2
  micro:
    fontFamily: "Nunito, Quicksand, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 800
    letterSpacing: "0.14em"
rounded:
  xs: "7px"
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
    backgroundColor: "{colors.verde-fundo}"
    textColor: "{colors.painel}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.verde-tinta}"
    textColor: "{colors.painel}"
  button-ghost:
    backgroundColor: "{colors.painel}"
    textColor: "{colors.tinta-folha}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
    height: "44px"
  button-soft:
    backgroundColor: "{colors.menta-lavada}"
    textColor: "{colors.verde-tinta}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
    height: "44px"
  button-danger:
    backgroundColor: "{colors.perigo-fundo}"
    textColor: "{colors.perigo-tinta}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
    height: "44px"
  button-icon:
    backgroundColor: "{colors.painel-recuado}"
    textColor: "{colors.tinta-folha}"
    rounded: "{rounded.pill}"
    size: "44px"
  panel:
    backgroundColor: "{colors.painel}"
    rounded: "{rounded.lg}"
    padding: "{spacing.s-5}"
  input:
    backgroundColor: "{colors.painel-recuado}"
    textColor: "{colors.tinta-mata}"
    rounded: "{rounded.md}"
    padding: "11px 14px"
  toast:
    backgroundColor: "{colors.painel}"
    textColor: "{colors.tinta-mata}"
    rounded: "{rounded.pill}"
    padding: "12px 14px 12px 16px"
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
    textColor: "{colors.verde-tinta}"
---

# Design System: The Sims

## 1. Overview

**Creative North Star: "O Mundo de Bolso"**

Um mundo inteiro miniaturizado numa tela de celular. O fundo não é uma cor chapada: são duas manchas de luz — azul no canto superior esquerdo, verde no direito — fixas atrás de tudo, como o céu de um lugar que continua ali quando ninguém está olhando. Sobre esse céu pousam painéis brancos de cantos generosos, leves, com sombra difusa. Nada tem quina, nada é retangular por obrigação: avatares e emojis de cabeçalho usam formas de blob assimétrico, porque coisa viva não é retângulo.

O sistema é lúdico sem ser infantil. A gramática vem de simuladores cozy — Animal Crossing, Stardew Valley, The Sims — traduzida em painéis flutuantes, pills coloridas por categoria, emoji como ícone de primeira classe e movimento com mola (`--ease-bounce`). O que ele explicitamente rejeita: **dashboard/CRM** (grade de cards idênticos, métricas, gráficos, KPIs), **app de hábitos** (streaks, notas, barra que cobra), **rede social** (feed, curtidas, plateia) e **app infantil** (cor berrante, mascote, tipografia de desenho animado). O risco real é o primeiro: tem CRUD de verdade por baixo, e CRUD puxa pra grade de cards iguais toda vez que ninguém está prestando atenção.

Densidade é baixa por escolha. Celular, uma mão, sessões curtas: poucos elementos por tela, alvos grandes, texto curto em português coloquial. Onde um app de produtividade colocaria um número, este coloca uma frase.

E "de bolso" é literal: o app é uma **PWA instalada**, aberta pelo ícone na tela de início do iPhone ou do iPad, em `standalone` — sem barra de URL, sem abas. A referência de execução é um jogo de tablet, não um site responsivo. Isso não é detalhe de infraestrutura: é a primeira coisa que sustenta a ilusão, e cada tela é desenhada dentro dela (seção 6).

**Key Characteristics:**
- App instalado em tela cheia, não página de navegador — bordas do aparelho respeitadas, toque que responde na hora, abre offline
- Céu de luz fixo atrás de painéis brancos flutuantes
- Cantos muito arredondados (16–34px) e formas de blob para o que é vivo
- Emoji como ícone canônico — não há biblioteca de ícones
- Cor codifica categoria, sempre acompanhada de texto ou emoji
- Movimento com mola, curto, sempre com alternativa em `prefers-reduced-motion`
- Zero métrica, zero nota, zero streak

## 2. Colors

Uma paleta de simulador: verdes e azuis saturados sobre neutros levemente esverdeados, com roxo, coral e âmbar entrando só onde uma categoria precisa se distinguir.

### Primary
Quatro degraus de verde, cada um com um trabalho. Quanto mais escuro, mais o verde pode carregar texto.

- **Verde Menta Viva** (`--accent`, `--c-green-500`): a cor da marca. Estado ativo, preenchimento, forma. É o verde do favicon e do `theme-color`. **Não carrega texto branco** (1.9:1 a 2.4:1).
- **Verde Profundo** (`--accent-strong`, `--c-green-600`): superfície e traço médio.
- **Verde Fundo** (`--c-green-700`): fundo que aceita texto branco (5.1:1). Início do gradiente do botão primário, checkbox marcado.
- **Verde Tinta** (`--accent-ink`, `--c-green-800`): o verde que **é** texto. Botão suave, item de nav ativo, anel de foco, borda de campo em foco. 7:1 sobre branco, 6:1 sobre a menta.
- **Verde Broto** (`--c-green-400`): decorativo — linha da timeline, blobs. Nunca carrega texto.

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

**A Regra dos Quatro Verdes.** O degrau do verde é escolhido pelo trabalho, não pela beleza: 500 e 400 são forma, 700 é fundo com texto branco em cima, 800 é texto. Branco sobre `--c-green-500` dá 2.35:1 — se você está pintando texto branco sobre verde, subiu na rampa errada.

**A Regra da Pill Não Invertida.** Estado ativo em pill colorida nunca vira branco sobre a cor saturada: no âmbar isso dá 1.6:1. Ativo é a mesma tinta escura, fundo mais forte, contorno na própria cor e sombra colorida.

**A Regra da Cor Acompanhada.** Nenhum estado, categoria ou humor é comunicado só por cor. Sempre vem com emoji, texto ou forma junto — e, quando é controle, com `aria-pressed`, `aria-checked` ou `role="radio"`.

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

### A rampa em tokens

Nenhum tamanho literal no CSS: onze degraus de texto e cinco de ornamento, todos
em `tokens.css`. Emoji e glifos decorativos crescem por outra lógica que a do
texto e por isso têm escala própria — assim um emoji grande não puxa a rampa de
leitura para cima.

| Token | Valor | Onde |
|---|---|---|
| `--t-micro` | 0.72rem | eyebrow, label de música, contagem de passos |
| `--t-pill` | 0.82rem | pill, chip, data, dica de campo |
| `--t-label` | 0.85rem | `.field-label`, botão `sm`, descrição de card |
| `--t-body-sm` | 0.92rem | texto de apoio dentro de card |
| `--t-action` | 0.95rem | texto de botão, bio, descrição do pote |
| `--t-body` | 1rem | corpo, campo de formulário |
| `--t-body-lg` | 1.1rem | título de card menor, nome na Home |
| `--t-title` | 1.15rem | `.section-title`, título de card |
| `--t-title-lg` | 1.3rem | título de modal, nome de personagem, capítulo da jornada |
| `--t-headline` | clamp(1.5rem, 4vw, 2rem) | `PageHeader`, saudação do "Nosso agora" |
| `--t-display` | clamp(1.9rem, 5vw, 2.9rem) | nome do save no `ChapterBanner` |

Ornamento: `--e-sm` 1.15rem · `--e-md` 1.35rem · `--e-lg` 1.7rem · `--e-xl` 2.2rem · `--e-2xl` 3rem.

### Named Rules

**A Regra do Peso, Não do Tamanho.** Hierarquia neste sistema se faz com peso (400 → 700 → 800) e família, não com escalas gigantes. Nenhum texto passa de 2.9rem: é um mundo de bolso, não um outdoor.

**A Regra do Emoji Ícone.** Emoji é o ícone oficial do sistema — em nav, cabeçalho, pill, timeline e estado vazio. Não introduzir biblioteca de ícones SVG: misturar as duas linguagens quebra a voz. Emoji decorativo leva `aria-hidden`; emoji que carrega significado leva texto equivalente.

## 4. Elevation

O sistema é flutuante, em duas camadas e sem exceção para bordas fortes. A camada ambiente é o conteúdo: painéis brancos pousados sobre o céu de luz com `--sh-md` e uma borda de 1px quase invisível em verde translúcido. A camada elevada é o que se destaca de verdade — NavBar de vidro fosco, modal, card em hover — e usa `--sh-lg` ou vidro. Não existe superfície plana encostada no fundo: se algo não flutua, ele não é um painel, é um recuo (`--surface-2`).

### Shadow Vocabulary
- **`--sh-sm`** (`0 4px 12px rgba(23,98,74,0.08)`): elementos pequenos que pousam — avatar, botão fantasma, emoji de cabeçalho, ponto da timeline.
- **`--sh-md`** (`0 12px 30px rgba(23,98,74,0.12)`): repouso de todo `.panel` e da NavBar.
- **`--sh-lg`** (`0 24px 60px rgba(23,98,74,0.18)`): hover de card e `chapter-banner`. É elevação real, não ênfase visual.
- **`--sh-border`** (`1px solid rgba(23,98,74,0.08)`): o traço quase invisível que fecha painel e rodapé de modal.
- **Foco** (`outline: 3px solid var(--c-green-800)` + `outline-offset: 2px`): contorno global via `:focus-visible`, 7:1 sobre branco. Contorno em vez de sombra porque acompanha sozinho o raio de cada elemento — pill continua pill. `--sh-ring` sobrevive só onde o foco precisa vir como sombra (checkbox nativo escondido atrás de caixa desenhada).

### Camadas

Escala fechada, sem valor solto: **nav 40 · overlay 80 · toast 90 · confete 100**.
O moodlet fica acima do modal porque também confirma o que acontece dentro dele;
o confete é a única coisa que passa por cima de tudo, e some sozinho.

### Named Rules

**A Regra da Sombra Verde.** Toda sombra do sistema é verde-escura translúcida (`rgba(23,98,74,…)`), nunca preta. Sombra preta sobre a Névoa de Jardim suja o céu e datou o app em 2014 na hora.

**A Regra do Vidro Raro.** `backdrop-filter` existe em exatamente três lugares: NavBar, fundo de modal e o chip do `chapter-banner`. Vidro é o material da navegação e da sobreposição — não é decoração de card.

## 5. Components

### Buttons
- **Shape:** pill total (`--r-pill`), `min-height: 44px`, padding `12px 20px`, peso 800, `0.95rem`. Versão `sm` em `8px 14px` / `0.85rem` com `min-height: 40px`.
- **Primary:** gradiente Verde Fundo → Azul Fundo com sombra azul. Escuro o bastante para o branco passar de 4.5:1 em qualquer ponto da rampa. Ação principal, uma por tela.
- **Hover / Focus:** sobe 2px com sombra mais forte; `:active` afunda pra `scale(0.96)` em `--ease-bounce`. Foco herda o contorno global.
- **Ghost:** superfície branca + `--sh-sm`, texto Tinta Folha. Ação secundária.
- **Soft:** Menta Lavada com texto Verde Tinta. Ação terciária dentro de painel.
- **Danger:** Perigo Fundo com Perigo Tinta — nunca vermelho chapado; remover algo aqui não é erro grave.
- **Icon:** 44×44 circular, Painel Recuado, vira Menta Lavada no hover.
- **Disabled:** `saturate(0.55)` + `opacity(0.72)`, sem sombra, sem transform.

### Chips e Pills
- **`.chip`:** neutro (Painel Recuado / Tinta Folha), pill, 0.82rem/700. Metadado.
- **`CategoryPill`:** cor por categoria via `--cp`. Fundo `color-mix(--cp 15%, white)`, tinta `color-mix(--cp 35%, ink-900)` — a mistura fica puxada para o escuro de propósito. Ativa: fundo a 26%, contorno de 2px na cor cheia, sombra colorida e `aria-pressed`. Sobe 2px no hover, `min-height: 36px`.
- **`TraitBadge`:** mesma mecânica, fundo a 14% e a mesma tinta a 35%. Traços de personagem.
- **`.choice`:** pill com borda de 2px transparente que ganha cor quando ligada, `min-height: 40px`. É o radio do sistema: renderiza como `role="radiogroup"` com `role="radio"` e `aria-checked` em cada opção.

### Cards / Containers
- **`.panel`** é o container canônico: branco, `--r-lg` (24px), `--sh-md`, borda de 1px em verde 6%. Padding `--s-5`.
- **`.card-hover`** adiciona subida de 4px em `--ease-bounce` + `--sh-lg`. Só onde o card inteiro é clicável.
- **Nunca aninhar painel dentro de painel.** Dentro de um painel, a separação é por `--surface-2`, espaçamento ou divisória de 1px.

### A lavagem de categoria

Card de meta, missão e carta carregam a cor da categoria como **uma lavagem que
nasce no topo e se dissolve na superfície** em ~104px:

```css
background: linear-gradient(
  180deg,
  color-mix(in srgb, var(--cat) 10%, var(--surface)) 0,
  var(--surface) 104px
);
```

Uma gramática só para os três. Antes eram três: `border-left: 4px` na meta e
`border-top: 4px` na missão e na carta — listra colorida é banimento absoluto, e
ter três dialetos de destaque no mesmo app é pior do que não ter nenhum. A cor
continua acompanhada pela pill de categoria, que carrega emoji e texto.

### Toast (moodlet do save)

Pill branca flutuante logo acima da NavBar, com `--sh-lg` e entrada em
`--ease-bounce`. Vive numa região `role="status"` / `aria-live="polite"`
**permanente** — só o conteúdo troca, então leitor de tela anuncia a mudança sem
mover o foco de onde estava.

Dois tempos: 3,2s quando só confirma; 6s quando carrega **"Desfazer"**. É o
padrão de remoção do app inteiro: some primeiro, oferece a volta depois. A única
exceção é "Restaurar dados iniciais", que continua perguntando antes por um
`Modal` — é a única ação sem volta que existe.

### Inputs / Fields
- **Style:** fundo Painel Recuado, borda de 2px transparente, `--r-md`, padding `11px 14px`, `min-height: 44px`. O campo é um recuo, não uma caixa contornada.
- **Focus:** a borda ganha Verde Tinta e o fundo vira branco — o campo "sobe" pra superfície. O contorno global cuida do teclado; nunca zerar `box-shadow`/`outline` no `:focus` de um campo.
- **Select:** seta desenhada em dois gradientes; `appearance: none`. Textarea com `min-height: 84px` e resize vertical.
- **`.field-label`** em 800/0.85rem Tinta Folha; `.field-hint` **deve** usar Tinta Sálvia (ver A Regra da Tinta Musgo).
- **`TagInput`:** chips removíveis com fundo `color-mix(--tag-accent 16%, white)` e botão × circular.

### Navigation
- **Mobile (<900px):** barra inferior flutuante, presa 12px das bordas, altura 74px, `--r-xl`, vidro fosco. Emoji 1.35rem sobre label de 0.62rem/800. Marca escondida.
- **Desktop (≥900px):** trilho lateral fixo de 232px com a mesma casca de vidro; conteúdo com `padding-left: 252px`. Marca no topo, Config empurrado pro rodapé com `margin-top: auto`.
- **Ativo:** gradiente Menta Lavada → Céu Lavado com texto Verde Tinta (6:1). Hover: Painel Recuado.

### Timeline (componente-assinatura)
Grade de duas colunas (48px + conteúdo). Ponto circular de 44px em superfície branca com anel de 4px na cor do fundo, ligado por uma linha de 3px com gradiente verde→azul a 40% de opacidade. O emoji da memória vive dentro do ponto. É a espinha da Jornada e a única metáfora de progresso do app — não substituir por barra de porcentagem.

### ChapterBanner (componente-assinatura)
O único lugar onde a cor toma a tela: gradiente verde→azul→roxo com três blobs em flutuação lenta e um brilho radial. Carrega o nome do save e o capítulo atual. Um por tela, e só nas telas que abrem um contexto.

## 6. A casca do app (PWA)

O app é instalado e roda em tela cheia num aparelho de mão. Tudo nesta seção existe
para uma coisa só: apagar o navegador da experiência. Não é uma camada técnica em
cima do design — é a moldura dentro da qual todas as outras cinco seções acontecem.

### O aparelho instalado

- **Manifesto:** `display: standalone`, `theme_color` Verde Menta Viva (`#17c08a`),
  `background_color` Névoa de Jardim (`#eef6f2`) — o splash de abertura é o mesmo
  céu do app, então não existe flash branco entre o toque no ícone e o mundo.
- **Ícones:** 192 e 512 no manifesto, mais `apple-touch-icon` (iOS ignora o
  manifesto pra isso). O ícone é a capa do jogo: ele fica na tela de início dela
  entre os outros apps, e tem que aguentar essa comparação.
- **Barra de status:** `apple-mobile-web-app-status-bar-style: black-translucent`
  — o céu passa por trás do relógio. É o que faz o app ocupar a tela inteira, e é
  também o que torna as safe areas obrigatórias logo abaixo.
- **Sem trava de orientação.** Retrato é o cânone; paisagem no iPad tem que
  continuar bonita, com o trilho lateral, e nunca virar celular esticado.

### Offline não é estado de erro

O service worker cacheia a casca (`/`, manifesto, ícones) e **as fontes do Google**
— sem isso, o app instalado abria offline em `system-ui` e perdia a identidade
tipográfica inteira, justamente no cenário que o SW existe pra cobrir. Navegação é
network-first com fallback pro `/` cacheado: o dinossauro do Chrome ou a página de
erro do Safari dentro de um app instalado é falha grave, não degradação aceitável.

Como o save vive em `localStorage`, offline é indistinguível de online — e é assim
que tem que parecer. O app nunca fala sobre conexão.

### As bordas da tela (safe areas)

Tela cheia significa que o notch, a Dynamic Island e a barra de gestos passam por
cima do layout. O padrão do sistema:

- `<meta name="viewport" … viewport-fit=cover>` — sem isso o `env()` devolve zero e
  o app fica com faixas pretas.
- **NavBar mobile:** os 12px de folga viram
  `calc(12px + env(safe-area-inset-bottom))`. A barra flutua acima da barra de
  gestos do iPhone, nunca embaixo dela.
- **`.page`:** o `padding-bottom` já reserva `--nav-h`; soma o mesmo inset, senão o
  último card fica preso atrás da barra em telas com gesto.
- **Trilho desktop/iPad paisagem:** `top`, `left` e `bottom` somam os insets
  correspondentes.
- **Topo:** o `ChapterBanner` e o `PageHeader` respiram `env(safe-area-inset-top)`
  — nenhum texto ou controle nasce debaixo do relógio.

### Altura de verdade

`100vh` mente no Safari de celular: mede a tela sem a barra de URL, que aparece e
some enquanto rola. Onde a altura significa "a tela toda", use `100dvh` (ou `svh`
quando o conteúdo não pode saltar). `.shell-main` e overlay de modal entram nessa
regra.

### Toque, não ponteiro

- **`touch-action: manipulation`** em botão, pill e alvo clicável: mata o atraso de
  ~300ms do double-tap-to-zoom. Botão de jogo responde no toque, não meio segundo
  depois.
- **`-webkit-tap-highlight-color: transparent`** global: o retângulo cinza do iOS
  não existe em nenhum jogo de tablet. O feedback é o `:active` com
  `scale(0.96)` em `--ease-bounce`, que já é o vocabulário do sistema.
- **`user-select: none`** na casca — nav, pills, botões, emoji, títulos de card. A
  lupa de seleção do iOS aparecendo em cima de um emoji da NavBar é o tipo de
  detalhe que denuncia o navegador. **Exceção deliberada:** memórias, cartas e
  qualquer texto que ela possa querer copiar continuam selecionáveis.
- **`overscroll-behavior-y: contain`** no documento e dentro de modal: mata o
  pull-to-refresh (recarregar o mundo por acidente ao rolar pra cima é a pior
  quebra possível) e impede o elástico de vazar do modal pro fundo.
- **Nada depende de `:hover`.** Hover é enfeite de desktop; toda informação e todo
  affordance tem que estar visível em repouso. Onde o hover levanta um card, o
  toque tem `:active`.
- **Teclado virtual:** campo em foco não pode ficar escondido atrás do teclado. Em
  modal, o rodapé com o botão de salvar acompanha; `font-size` de campo nunca abaixo
  de 16px (`--t-body`), senão o iOS dá zoom sozinho ao focar — e o zoom não volta.

### Os três tamanhos

Um sistema, três composições. Não existe "versão mobile": existe o aparelho.

- **iPhone (<600px)** — a tela do produto. Coluna única, barra inferior flutuante
  debaixo do polegar, densidade baixa, uma ação principal por tela.
- **iPad retrato (600–899px)** — a mesma barra inferior, mas o conteúdo **não
  estica**: `--shell-max` segura a medida, e o ar que sobra vira respiro, não
  linhas de 120 caracteres. Onde couber, a Jornada e os Planos ganham duas colunas.
- **iPad paisagem / desktop (≥900px)** — trilho lateral de 232px, conteúdo com
  `padding-left: 252px`. Mesmo mundo, outra moldura.

### Estado atual

Tudo desta seção está valendo: manifesto `standalone` com `id` e ícone
`maskable`, `apple-mobile-web-app-title`, `theme-color`, `viewport-fit=cover`,
os quatro `env(safe-area-inset-*)` em tokens (`--safe-t/r/b/l` e `--nav-space`),
`100dvh`, `overscroll-behavior`, `touch-action`, `-webkit-tap-highlight-color`,
`user-select` da casca com a exceção `.selectable`, rodapé de modal grudado para
o teclado virtual, a faixa de iPad retrato (600–899px) e alvos de `--tap` 44px
com `:active` de mola no toque.

Offline cobre o app inteiro, não só a casca: as cinco áreas em `lazy()` são
buscadas em segundo plano **depois** de `serviceWorker.ready` — antes disso elas
passariam por fora do SW — e o service worker busca a folha do Google Fonts e
cada `.woff2` dela ao ativar, porque a folha é pedida no `<head>` antes de ele
existir. Uma única visita com sinal deixa o mundo inteiro disponível no avião.

Falta só o que não dá para verificar fora do aparelho: se o relógio branco do
`black-translucent` continua legível sobre o céu claro no topo.

## 7. Do's and Don'ts

### Do:
- **Do** manter todo texto legível em `--ink-900`, `--ink-700` ou `--ink-500`. Nada abaixo de 4.5:1.
- **Do** usar `--accent-ink` (`#066647`) para qualquer palavra verde sobre fundo claro ou tinta de menta.
- **Do** dar `min-height: var(--tap)` a botão e campo, e expandir a área de toque de alvo pequeno com um `::after` de `inset` negativo — cresce o dedo, não o layout.
- **Do** usar `--ease-out` para mudança de estado funcional e guardar `--ease-bounce` para o que "chega" (modal, avatar, card que sobe, clique).
- **Do** acompanhar toda cor de estado com emoji ou texto — o app é usado no celular, na rua, por duas pessoas que podem estar com pressa.
- **Do** dar a cada tela algo que muda sozinho: horário, clima, contagem regressiva, novidade composta. O mundo continua vivo entre as visitas.
- **Do** escrever em português coloquial, minúsculo onde couber, com nomes e datas reais. Texto que serviria pra outro casal está errado.
- **Do** cobrir toda animação nova com `@media (prefers-reduced-motion: reduce)` — o bloco global já existe, mantenha-o valendo.
- **Do** usar emoji como ícone e `aria-hidden` quando ele for decorativo.
- **Do** preferir `--surface-2`, espaçamento ou divisória de 1px quando precisar separar algo dentro de um painel.
- **Do** confirmar toda ação de escrita com um moodlet (`useToast`), e oferecer **desfazer** em vez de perguntar antes — remover algo aqui não é erro grave.
- **Do** puxar todo tamanho de `--t-*` (texto) ou `--e-*` (ornamento), e todo raio de `--r-*`. Se falta um degrau, o degrau entra no token e na tabela — não no arquivo do componente.
- **Do** dar nome ao item em `aria-label` de botão repetido: "Editar a missão Piquenique", não "Editar missão" oito vezes na mesma lista.
- **Do** desenhar toda tela dentro das safe areas: o que encosta na borda de baixo soma `env(safe-area-inset-bottom)`, o que encosta na de cima soma `env(safe-area-inset-top)`.
- **Do** testar cada tela no aparelho instalado, não só na aba do navegador — notch, barra de gestos, teclado virtual e abrir offline só aparecem lá.
- **Do** manter campo de formulário em `--t-body` (16px) ou mais: abaixo disso o iOS dá zoom sozinho ao focar, e a tela nunca mais volta ao lugar.
- **Do** dizer por que o botão de salvar está desligado (`.form-why` no rodapé do modal), em vez de deixar o campo obrigatório para a pessoa adivinhar.

### Don't:
- **Don't** usar `--ink-300` (`#90a49b`) em placeholder, dica de campo ou qualquer texto: 2.6:1 sobre branco.
- **Don't** pôr texto branco pequeno sobre `--c-green-500` ou `--c-green-400` (2.35:1 e pior).
- **Don't** inverter pill ativa para branco sobre a cor saturada.
- **Don't** animar `width`, `height`, `padding` ou `margin`. A barra de progresso desliza com `translateX` dentro de uma pista com `overflow: hidden`.
- **Don't** usar `border-left`/`border-right`/`border-top` colorida acima de 1px como listra de destaque. Categoria em card se marca com a lavagem de topo descrita acima.
- **Don't** repetir a `.eyebrow` (maiúsculas tracked) acima de toda seção — é andaime, não voz. Uma por tela, no máximo. A Home não tem nenhuma: os cinco cards que a repetiam viraram dois blocos de formas diferentes.
- **Don't** construir grade de cards idênticos com ícone + título + texto. É a rota direta pro **dashboard/CRM**, a anti-referência número um do projeto.
- **Don't** introduzir métrica, nota, streak ou porcentagem que possa ser lida como cobrança — nada de **app de hábitos**.
- **Don't** adicionar feed, contador de curtidas ou qualquer coisa que sugira plateia: são duas pessoas, não uma **rede social**.
- **Don't** aumentar saturação ou arredondar mais "pra ficar fofo" — a fronteira com **app infantil** está exatamente aí.
- **Don't** aninhar painel dentro de painel.
- **Don't** usar `background-clip: text` com gradiente, nem sombra preta, nem `z-index` arbitrário (a escala é nav 40 · overlay 80 · toast 90 · confete 100).
- **Don't** usar `confirm()`/`alert()` nativos: a caixa do navegador diz "the.sims diz:" e derruba o mundo de bolso na hora. Modal do sistema, ou desfazer.
- **Don't** colocar atalho na Home que repita item da NavBar. A barra é fixa e fica debaixo do polegar; duplicar isso é gastar a dobra com navegação.
- **Don't** trocar Baloo 2 + Nunito nem introduzir uma terceira família ou uma biblioteca de ícones SVG.
- **Don't** usar `100vh` onde a altura significa "a tela toda": no Safari de celular ela mede errado e o layout pula quando a barra de URL some. `100dvh`/`100svh`.
- **Don't** deixar a interface selecionável — a lupa do iOS em cima de um emoji da NavBar entrega o navegador na hora. Texto de memória e carta é a exceção, e é de propósito.
- **Don't** entregar affordance só no `:hover`: no aparelho não existe ponteiro. O que precisa ser visto está visível em repouso; o retorno do toque é o `:active`.
- **Don't** deixar o pull-to-refresh vivo. Rolar pra cima e recarregar o mundo por acidente é a pior quebra possível da ilusão — `overscroll-behavior-y: contain`.
- **Don't** mostrar tela de erro de rede, spinner de conexão ou qualquer aviso de offline: o save é local, o app abre igual com ou sem sinal e nunca fala sobre isso.
- **Don't** esticar a coluna do celular pra preencher o iPad. Mais tela vira respiro e, onde couber, mais colunas — nunca linha de texto mais longa que 75ch.
