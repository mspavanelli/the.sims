/**
 * Confete discreto — comemoração leve ao concluir uma missão.
 * Sem dependências: cria partículas efêmeras e anima com a Web Animations API.
 * Silencioso quando o usuário prefere menos movimento.
 */
const COLORS = [
  "#38d39f",
  "#2f8bff",
  "#7b6cff",
  "#ff7a8a",
  "#ffbf5c",
  "#ffe58a",
];

export function burstConfetti(origin: HTMLElement, count = 16): void {
  if (typeof window === "undefined") return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  const rect = origin.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const layer = document.createElement("div");
  layer.style.cssText =
    "position:fixed;left:0;top:0;width:0;height:0;pointer-events:none;z-index:9999;";
  document.body.appendChild(layer);

  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    const size = 6 + Math.random() * 6;
    p.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;width:${size}px;height:${size}px;border-radius:${
      Math.random() > 0.5 ? "50%" : "3px"
    };background:${COLORS[i % COLORS.length]};will-change:transform,opacity;`;
    layer.appendChild(p);

    const angle = Math.random() * Math.PI * 2;
    const distance = 60 + Math.random() * 90;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - 40; // leve tendência para cima
    const rot = (Math.random() - 0.5) * 720;

    p.animate(
      [
        { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
        {
          transform: `translate(${dx}px, ${dy + 80}px) rotate(${rot}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 700 + Math.random() * 500,
        easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
        fill: "forwards",
      },
    );
  }

  window.setTimeout(() => layer.remove(), 1400);
}
