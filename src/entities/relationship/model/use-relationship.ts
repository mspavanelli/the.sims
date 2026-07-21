import { useContext } from "react";
import { RelationshipContext } from "./relationship-context";

export function useRelationship() {
  const ctx = useContext(RelationshipContext);
  if (!ctx) {
    throw new Error("useRelationship precisa estar dentro de <RelationshipProvider>");
  }
  return ctx;
}
