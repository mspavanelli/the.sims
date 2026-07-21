# The Sims

Aplicação React + TypeScript + Vite para registrar a jornada de um casal.

## Desenvolvimento

```bash
npm run dev
npm run build
npm run lint
```

## Arquitetura

O projeto segue o Feature-Sliced Design (FSD), com aliases `@/...` e APIs
públicas em cada slice.

```text
src/
  app/                         bootstrap, providers, rotas e estilos globais
  pages/                       composição e UI exclusiva de cada rota
  widgets/app-shell/           navegação e pote de ideias reutilizados
  entities/relationship/       estado persistido e modelo do relacionamento
  shared/                      componentes UI, utilitários e localStorage genérico
```

As dependências seguem a direção `app → pages → widgets → entities → shared`.
Formulários e cards exclusivos continuam em suas páginas; não há camadas de
`features` artificiais para código usado por uma única tela.
