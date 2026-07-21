import { useContext } from "react";
import { SaveContext } from "./SaveContext";

export function useSave() {
  const ctx = useContext(SaveContext);
  if (!ctx) {
    throw new Error("useSave precisa estar dentro de <SaveProvider>");
  }
  return ctx;
}
