import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadProfile, saveProfile } from "./profileStorage.js";

const ProfileCtx = createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => loadProfile());

  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  const value = useMemo(() => ({
    profile,
    setField: (k, v) => setProfile((p) => ({ ...p, [k]: v })),
  }), [profile]);

  return <ProfileCtx.Provider value={value}>{children}</ProfileCtx.Provider>;
}

export function useProfile() {
  const v = useContext(ProfileCtx);
  if (!v) throw new Error("ProfileProvider missing");
  return v;
}
