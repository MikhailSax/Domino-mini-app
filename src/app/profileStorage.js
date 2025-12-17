const KEY = "tma_profile_v1";

export function loadProfile() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveProfile(p) {
  localStorage.setItem(KEY, JSON.stringify(p));
}
