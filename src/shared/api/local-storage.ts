export function readJson<Value>(key: string): Value | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Value) : null;
  } catch {
    return null;
  }
}

/**
 * Devolve `false` quando não deu para guardar (aba privada do Safari, cota
 * cheia). Num app cujo valor inteiro é texto escrito à mão, engolir isso em
 * silêncio é o pior modo de falha possível: parece salvo e evapora no reload.
 */
export function writeJson<Value>(key: string, value: Value): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeStoredValue(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    /* noop */
  }
}
