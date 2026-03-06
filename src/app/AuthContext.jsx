import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { clearAuthState, loadAuthState, saveAuthState } from "./authStorage.js";

const AuthCtx = createContext(null);

function getTelegramContext() {
  const webApp = window.Telegram?.WebApp;

  return {
    initData: webApp?.initData || "",
    user: webApp?.initDataUnsafe?.user || null,
  };
}

function mapTelegramUser(rawUser) {
  if (!rawUser) return null;
  return {
    id: rawUser.id,
    username: rawUser.username || "",
    firstName: rawUser.firstName || rawUser.first_name || "",
    lastName: rawUser.lastName || rawUser.last_name || "",
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
    const user = mapTelegramUser(telegramCtx.user);

    if (!telegramCtx.initData || !user) {
      if (cached.user) {
        setAuth((prev) => ({ ...prev, status: "authenticated", error: "" }));
      } else {
        setAuth({
          status: "guest",
          token: "",
          user: null,
          error: "Для персонализации лучше открыть приложение через Telegram.",
        });
      }
      return;
    }

    saveAuthState({ token: "static-app", user });

    setAuth({
      status: "authenticated",
      token: "static-app",
      user,
      error: "",
    });
  }, [cached.user]);

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
  const value = React.useContext(AuthCtx);
  if (!value) throw new Error("AuthProvider missing");
  return value;
}
