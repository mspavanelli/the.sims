# Product

## Register

brand

## Platform

web

PWA instalável, e essa é a forma canônica de usar: ícone na tela de início do iPhone ou do iPad, aberto em `standalone` (sem barra de URL, sem abas, sem botão de voltar do navegador). O navegador é o instalador, não o lugar onde o app mora. Não passa por app store, não tem backend: o save inteiro vive no `localStorage` do aparelho de cada um.

O alvo é **iPhone em retrato** (a tela do produto) e **iPad**, retrato ou paisagem. Desktop existe porque a web é assim, mas não é onde o app foi pensado; a versão desktop é a mesma coisa com trilho lateral, nunca uma tela "completa" que o celular não tem.

A referência de execução é um **jogo de tablet/celular**, não um site responsivo: abre offline sem tela de erro, respeita as bordas físicas da tela (notch, Dynamic Island, barra de gestos), não faz rubber-band nem pull-to-refresh, não deixa selecionar a interface por acidente e responde ao toque na hora. Qualquer coisa que denuncie "isto é uma página web dentro de um navegador" é bug de produto.

## Users

Duas pessoas, e só. Matheus (32) é quem alimenta o save: escreve as memórias, marca as missões, esconde os easter eggs. Luiza (23) é quem visita — abre o app pra ver o que mudou desde a última vez e pra achar o que ele deixou ali pra ela. Ambos INTP, juntos desde 20/04/2026, se veem praticamente toda semana.

O contexto de uso é o aparelho pessoal, ao longo do dia, em brechas curtas: celular numa mão, no ônibus, na fila, na cama; ou iPad no sofá, com as duas mãos e mais calma. Nunca uma sessão de trabalho sentado no computador. Ela abre pelo ícone da tela de início, com o aparelho já na mão — muitas vezes sem sinal bom, às vezes sem sinal nenhum. O que ela quer fazer ao abrir são duas coisas ao mesmo tempo: **ver o que está acontecendo agora** (as novidades, o clima, a música do momento) e **descobrir algo escondido**.

Público-alvo do que se constrói é ela. Sucesso é a reação dela: surpresa, carinho, a sensação de que aquilo foi feito pra ela.

## Product Purpose

Um mundo particular onde a relação dos dois existe em forma de save de simulador de vida: personagens com traços e curiosidades, jornada em memórias, missões, cartas, aspirações. Não é um app de registro que por acaso é bonito — a atmosfera é o produto. O app pode registrar menos coisas contanto que o lugar continue valendo a visita.

Sucesso não é "cadastramos tudo". É ela abrir e se emocionar. Em um ano, o app deu certo se ela ainda sente que alguém pensou em cada detalhe daquilo.

## Positioning

Feito à mão pra duas pessoas. Nenhum produto genérico serve aqui: o valor inteiro está em ser artesanal, específico e exclusivo desse casal — nomes, datas, piadas internas, coisas que só quem conhece os dois entenderia.

## Conversion & proof

- Ação principal: ver o que está acontecendo agora — o painel vivo da Home (saudação por horário, clima simbólico, música do momento, novidades compostas do save). Ação secundária, igualmente desejada: descobrir algo escondido (o pote de ideias atrás do ♡, e o que vier depois dele).
- A frase que ela carrega 10 segundos depois de fechar: *"fizeram isso pra mim"*.
- Escada de crenças, nessa ordem: **é bonito** (que lugar bonito) → **é nosso** (espera, isso é sobre nós) → **é vivo** (e muda sozinho) → **tem segredo** (e tem coisa escondida aqui).
- Acervo disponível: os dois avatares já versionados em `src/entities/relationship/ui/avatars/`. Fora do repositório existem fotos reais do casal, músicas que marcam momentos e textos/cartas já escritos, ainda não trazidos pro projeto. Colocar em `.impeccable/assets/` conforme forem entrando.

## Brand Personality

Acolhedor, íntimo, vivo, colorido, surpreendente, gamificado.

Gamificado no sentido de vocabulário — missões, aspirações, traços, moodlets, clima do save — e nunca no sentido de cobrança. Sem streaks, sem notas, sem barra de progresso que acusa. A voz é a de alguém falando com quem ama: em português, minúsculas onde couber, sem linguagem de fracasso, sem tom corporativo e sem fofura infantilizada.

As referências que capturam a sensação certa são **Animal Crossing / Stardew Valley** (um mundo cozy que continua vivo mesmo quando ninguém está olhando — hora do dia, estação, coisinhas pra descobrir) e **The Sims** (o vocabulário de simulador de vida: painéis flutuantes, moodlets, humor de simulador). A identidade visual é original: pega a gramática dos dois, não os ativos nem a marca.

## Anti-references

- **Dashboard / CRM.** Grade de cards iguais, métricas, gráficos, KPIs, cara de ferramenta corporativa. O maior risco real do projeto, porque o app tem CRUD de verdade por baixo.
- **App de hábitos.** Streaks, notas, cobrança, "você falhou 3 dias".
- **Rede social.** Feed infinito, curtidas, perfil público, sensação de plateia. Não tem audiência aqui; são duas pessoas.
- **App infantil.** Cores berrantes, mascote fofinho demais, tipografia de desenho animado. O app é lúdico, não é pra criança.
- **Site.** Cara de página web aberta no navegador: conteúdo colado na borda de cima do iPhone, `alert()` dizendo "the.sims diz:", texto da interface selecionando quando o dedo encosta, tela branca de erro quando cai a rede, elástico de scroll no fim da página, botão que só reage no `:hover`. O app é instalado; tem que se comportar como app instalado.

## Design Principles

- **A atmosfera vem antes do registro.** Quando "mais eficiente pra cadastrar" briga com "mais gostoso de estar", ganha o segundo. Formulário é meio, não é tela-produto.
- **O mundo continua vivo entre as visitas.** Toda tela deve ter algo que muda sozinho — horário, clima, contagem regressiva, novidade composta — pra que abrir depois de dias seja diferente de abrir agora.
- **Esconder é uma feature.** Nem tudo se anuncia. Descobrir por acaso vale mais do que um botão explicando. Cada easter egg é uma prova de que alguém pensou nela.
- **Específico bate genérico.** Nomes reais, datas reais, piadas internas, curiosidades. Qualquer texto que serviria pra outro casal está errado.
- **Lúdico sem cobrar.** Vocabulário de jogo, zero mecânica de punição. Nenhum número que possa ser lido como nota.
- **Parece um app, não parece um site.** O mundo de bolso é literal: ícone na tela de início, tela cheia, bordas respeitadas, toque que responde na hora, abre offline. A ilusão é frágil e cara de construir — qualquer detalhe que lembre "navegador" derruba tudo de uma vez, e nenhuma economia de implementação vale isso.
- **O aparelho é o palco.** Retrato de celular é a composição canônica; iPad é a mesma cena com mais ar, nunca a mesma tela esticada. Se um layout só funciona com mouse e teclado, ele não está pronto.

## Accessibility & Inclusion

Nenhuma necessidade específica conhecida entre os dois usuários. Mantém-se WCAG AA como piso: contraste de texto ≥4.5:1 (atenção especial ao `--ink-300` e `--ink-500` sobre superfícies claras), alvos de toque confortáveis no celular, e foco visível — já existe `:focus-visible` global com `--sh-ring`.

Como o app roda em tela cheia num aparelho de mão, a ergonomia entra junto com a acessibilidade: alvo mínimo de 44px (`--tap`), ação principal ao alcance do polegar, nada de conteúdo ou controle debaixo do notch, da Dynamic Island ou da barra de gestos, e teclado virtual que não pode esconder o campo que está sendo preenchido. O foco de teclado continua obrigatório mesmo sem teclado à vista — iPad com Magic Keyboard é um cenário real.

Estado e categoria nunca podem depender só de cor: pill, ícone, emoji ou texto acompanham sempre. O `@media (prefers-reduced-motion: reduce)` global já existe e deve continuar cobrindo toda animação nova.
