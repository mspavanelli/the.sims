import { useState } from "react";
import { readJson, writeJson } from "@/shared/api";
import "./InstallHint.css";

const DISMISSED_KEY = "the-sims:install-hint-dismissed";

/**
 * Aberto pelo ícone da tela de início é o estado canônico do app — quem já
 * chegou assim nunca vê isto. Para quem ainda está na aba do Safari, não é só
 * estética: o iOS descarta o `localStorage` de um site depois de sete dias sem
 * visita, e um app na tela de início não é um site. É o convite que impede o
 * mundo de evaporar sozinho.
 */
function isStandalone(): boolean {
  const iosStandalone = (
    window.navigator as Navigator & { standalone?: boolean }
  ).standalone;
  return window.matchMedia?.("(display-mode: standalone)").matches || iosStandalone === true;
}

/** iPadOS 13+ se apresenta como Mac; o toque é o que o entrega. */
function isIOS(): boolean {
  const ua = window.navigator.userAgent;
  return (
    /iphone|ipad|ipod/i.test(ua) ||
    (/macintosh/i.test(ua) && window.navigator.maxTouchPoints > 1)
  );
}

export default function InstallHint() {
  const [visible, setVisible] = useState(
    () =>
      isIOS() && !isStandalone() && readJson<boolean>(DISMISSED_KEY) !== true,
  );

  if (!visible) return null;

  const dismiss = () => {
    writeJson(DISMISSED_KEY, true);
    setVisible(false);
  };

  return (
    <aside className="install-hint">
      <span className="install-hint-emoji" aria-hidden>
        📲
      </span>
      <p className="install-hint-text">
        me leva pra tela de início? toque em <strong>compartilhar</strong> e
        depois em <strong>adicionar à tela de início</strong> — aí eu abro em
        tela cheia, e sem internet também.
      </p>
      <button
        type="button"
        className="btn-icon install-hint-close"
        onClick={dismiss}
        aria-label="Esconder o convite de instalação"
      >
        ✕
      </button>
    </aside>
  );
}
