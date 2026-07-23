import type { ReactNode } from "react";
import { RelationshipProvider } from "@/entities/relationship";
import { ToastProvider } from "@/shared/ui";

export function AppProviders({ children }: { children: ReactNode }) {
  // O moodlet por fora do save: é ele que avisa quando o aparelho recusa a
  // escrita, e para isso o `RelationshipProvider` precisa poder chamá-lo.
  return (
    <ToastProvider>
      <RelationshipProvider>{children}</RelationshipProvider>
    </ToastProvider>
  );
}
