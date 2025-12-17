const KEY = "tma_orders_v1";

export function loadOrders() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveOrders(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}
