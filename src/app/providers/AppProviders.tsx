import type { ReactNode } from "react";
import { RelationshipProvider } from "@/entities/relationship";

export function AppProviders({ children }: { children: ReactNode }) {
  return <RelationshipProvider>{children}</RelationshipProvider>;
}
