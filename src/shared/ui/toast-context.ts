import { createContext } from "react";

export type ToastAction = { label: string; onClick: () => void };

export type ToastInput = {
  /** Emoji do moodlet. Decorativo — a mensagem precisa se sustentar sozinha. */
  emoji?: string;
  message: string;
  action?: ToastAction;
};

export type ToastContextValue = { notify: (toast: ToastInput) => void };

export const ToastContext = createContext<ToastContextValue | null>(null);
