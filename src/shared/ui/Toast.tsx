import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ToastContext, type ToastInput } from "./toast-context";
import "./Toast.css";

type Toast = ToastInput & { id: number };

/** Sem ação: some sozinho. Com "desfazer": fica mais tempo na tela. */
const PLAIN_MS = 3200;
const ACTION_MS = 6000;

/**
 * Moodlet do save — a confirmação que faltava. Vive numa região `role="status"`
 * permanente, então leitor de tela anuncia toda mudança de estado sem que o foco
 * saia de onde estava.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const nextId = useRef(0);

  const dismiss = useCallback(() => {
    window.clearTimeout(timer.current);
    setToast(null);
  }, []);

  const notify = useCallback((input: ToastInput) => {
    window.clearTimeout(timer.current);
    const id = ++nextId.current;
    setToast({ ...input, id });
    timer.current = window.setTimeout(
      () => setToast((t) => (t?.id === id ? null : t)),
      input.action ? ACTION_MS : PLAIN_MS,
    );
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-layer" role="status" aria-live="polite">
        {toast && (
          <div className="toast" key={toast.id}>
            {toast.emoji && (
              <span className="toast-emoji" aria-hidden>
                {toast.emoji}
              </span>
            )}
            <span className="toast-message">{toast.message}</span>
            {toast.action && (
              <button
                type="button"
                className="toast-action"
                onClick={() => {
                  toast.action?.onClick();
                  dismiss();
                }}
              >
                {toast.action.label}
              </button>
            )}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}
