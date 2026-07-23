import { Component, type ErrorInfo, type ReactNode } from "react";

const RELOADED_KEY = "the-sims:route-reloaded";

type Props = { children: ReactNode };
type State = { failed: boolean };

/**
 * A rede de proteção das rotas `lazy()`.
 *
 * Depois de um deploy, o service worker apaga o cache antigo e os pedaços com
 * hash velho somem do servidor — uma sessão já aberta fica pedindo arquivos que
 * não existem mais. O app é instalado e fica semanas aberto em segundo plano,
 * então isso não é hipótese.
 *
 * A cura é recarregar uma vez: o `index.html` novo chega e aponta para os
 * pedaços novos. A flag em `sessionStorage` garante que seja **uma** vez — se
 * recarregar não resolveu, o problema é outro e um laço de recarga seria pior.
 *
 * Nada disso vira tela de erro de rede: o app não fala sobre conexão. O que
 * sobra, no pior caso, é o convite de voltar para o "Nosso agora".
 */
export class RouteRecovery extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, _info: ErrorInfo): void {
    const isChunkError =
      error.name === "ChunkLoadError" ||
      /dynamically imported module|Importing a module script failed|Failed to fetch/i.test(
        error.message,
      );
    if (!isChunkError) return;

    let alreadyTried = false;
    try {
      alreadyTried = sessionStorage.getItem(RELOADED_KEY) === "1";
      sessionStorage.setItem(RELOADED_KEY, "1");
    } catch {
      // Safari privado bloqueia o sessionStorage: sem memória, sem recarga.
      alreadyTried = true;
    }
    if (!alreadyTried) window.location.reload();
  }

  render(): ReactNode {
    if (!this.state.failed) return this.props.children;

    return (
      <div className="page route-loading" role="status">
        <p className="muted">
          esse cantinho ainda está chegando… <a href="#/inicio">voltar pro nosso agora</a>
        </p>
      </div>
    );
  }
}
