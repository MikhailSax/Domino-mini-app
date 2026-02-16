const KEY = "tma_auth_v1";

export function loadAuthState() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveAuthState(value) {
  localStorage.setItem(KEY, JSON.stringify(value));
}

export function clearAuthState() {
  localStorage.removeItem(KEY);
}
