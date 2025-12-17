export function formatRUB(n) {
  return Number(n || 0).toLocaleString("ru-RU") + " ₽";
}

export function uid() {
  return globalThis.crypto?.randomUUID?.() ?? String(Date.now() + Math.random());
}
