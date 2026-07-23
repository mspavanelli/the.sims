import { createContext, useContext } from "react";

export type IdeaJarContextValue = { openJar: () => void };

export const IdeaJarContext = createContext<IdeaJarContextValue | null>(null);

/**
 * O pote de ideias é um só no app inteiro. Antes existiam duas instâncias — uma
 * na NavBar e outra na Home — cada uma com o próprio baralho e o próprio
 * contador, então o ♡ de cima e o ♡ de baixo abriam potes diferentes.
 */
export function useIdeaJar(): IdeaJarContextValue {
  const ctx = useContext(IdeaJarContext);
  if (!ctx) throw new Error("useIdeaJar precisa estar dentro do AppShell");
  return ctx;
}
