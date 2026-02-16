import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiRequest } from "./http.js";
import { clearAuthState, loadAuthState, saveAuthState } from "./authStorage.js";

const AuthCtx = createContext(null);

function getTelegramContext() {
  const webApp = window.Telegram?.WebApp;

  return {
    initData: webApp?.initData || "",
    initDataUnsafe: webApp?.initDataUnsafe || {},
    user: webApp?.initDataUnsafe?.user || null,
  };
}

export function AuthProvider({ children }) {
  const cached = loadAuthState();
  const [auth, setAuth] = useState(() => ({
    status: "idle",
    token: cached.token || "",
    user: cached.user || null,
    error: "",
  }));

  const authenticate = useCallback(async () => {
    const telegramCtx = getTelegramContext();

    if (!telegramCtx.initData) {
      setAuth((prev) => ({
        ...prev,
        status: prev.token ? "authenticated" : "guest",
        error: prev.token ? "" : "Откройте приложение через Telegram, чтобы авторизоваться.",
      }));
      return;
    }

    setAuth((prev) => ({ ...prev, status: "loading", error: "" }));

    try {
      const authPayload = await apiRequest("/auth/telegram", {
        method: "POST",
        body: {
          initData: telegramCtx.initData,
          initDataUnsafe: telegramCtx.initDataUnsafe,
        },
      });

      const token = authPayload?.accessToken || "";
      const rawUser = authPayload?.user || telegramCtx.user;
      const user = rawUser
        ? {
            id: rawUser.id,
            username: rawUser.username,
            firstName: rawUser.firstName || rawUser.first_name || "",
            lastName: rawUser.lastName || rawUser.last_name || "",
          }
        : null;

      if (!token) {
        throw new Error("Backend не вернул accessToken");
      }

      saveAuthState({ token, user });

      setAuth({
        status: "authenticated",
        token,
        user,
        error: "",
      });
    } catch (error) {
      clearAuthState();
      setAuth({
        status: "error",
        token: "",
        user: null,
        error: error instanceof Error ? error.message : "Ошибка авторизации",
      });
    }
  }, []);

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  const logout = useCallback(() => {
    clearAuthState();
    setAuth({
      status: "guest",
      token: "",
      user: null,
      error: "",
    });
  }, []);

  const value = useMemo(
    () => ({
      ...auth,
      authenticate,
      logout,
    }),
    [auth, authenticate, logout],
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const value = useContext(AuthCtx);
  if (!value) throw new Error("AuthProvider missing");
  return value;
}
