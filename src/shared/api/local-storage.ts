export function readJson<Value>(key: string): Value | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Value) : null;
  } catch {
    return null;
  }
}

export function writeJson<Value>(key: string, value: Value): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* localStorage indisponível — o protótipo segue em memória. */
  }
}

export function removeStoredValue(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    /* noop */
  }
}
