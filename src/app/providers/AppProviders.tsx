import type { ReactNode } from "react";
import { RelationshipProvider } from "@/entities/relationship";
import { ToastProvider } from "@/shared/ui";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <RelationshipProvider>
      <ToastProvider>{children}</ToastProvider>
    </RelationshipProvider>
  );
}
