import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadProfile, saveProfile } from "./profileStorage.js";
import { useAuth } from "./AuthContext.jsx";

const ProfileCtx = createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => loadProfile());
  const { user } = useAuth();

  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  useEffect(() => {
    if (!user) return;

    setProfile((prev) => ({
      ...prev,
      name: prev.name || user.firstName || "",
      lastName: prev.lastName || user.lastName || "",
    }));
  }, [user]);

  const value = useMemo(
    () => ({
      profile,
      setField: (k, v) => setProfile((p) => ({ ...p, [k]: v })),
    }),
    [profile],
  );

  return <ProfileCtx.Provider value={value}>{children}</ProfileCtx.Provider>;
}

export function useProfile() {
  const v = useContext(ProfileCtx);
  if (!v) throw new Error("ProfileProvider missing");
  return v;
}
