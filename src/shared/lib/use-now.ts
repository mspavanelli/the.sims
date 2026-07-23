import { useEffect, useState } from "react";

/**
 * A hora do mundo, viva.
 *
 * Um app instalado não fecha: ele congela quando ela sai e descongela quando
 * ela volta pelo ícone. Um `new Date()` no render, então, é a hora da última
 * vez — ela abre de manhã e lê "boa noite" de ontem, com a contagem para o
 * próximo encontro parada no dia errado.
 *
 * Três gatilhos, nessa ordem de importância: voltar a ficar visível (o caso
 * real, o app retomando), receber foco de novo, e a virada do minuto para quem
 * ficou olhando a tela. O timer é reagendado a cada virada em vez de rodar a
 * cada segundo — o relógio não precisa de mais do que isso, e a bateria dela
 * também não.
 */
export function useNow(): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let timer = 0;

    const tick = () => {
      setNow(new Date());
      schedule();
    };

    const schedule = () => {
      const msToNextMinute = 60_000 - (Date.now() % 60_000);
      timer = window.setTimeout(tick, msToNextMinute);
    };

    const refresh = () => {
      if (document.visibilityState === "hidden") return;
      window.clearTimeout(timer);
      tick();
    };

    schedule();
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("focus", refresh);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  return now;
}
