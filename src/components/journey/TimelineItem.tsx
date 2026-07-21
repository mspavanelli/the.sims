import type { ReactNode } from "react";
import "./TimelineItem.css";

export default function TimelineItem({
  emoji,
  children,
  last = false,
}: {
  emoji: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <div className={"timeline-item" + (last ? " is-last" : "")}>
      <div className="timeline-rail" aria-hidden>
        <span className="timeline-dot">{emoji}</span>
        {!last && <span className="timeline-line" />}
      </div>
      <div className="timeline-content">{children}</div>
    </div>
  );
}
