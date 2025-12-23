import React, { useState } from "react";
import { useProfile } from "../app/ProfileContext.jsx";
import { saveProfile } from "../app/profileStorage.js";

export default function ProfilePage() {
  const { profile, setField } = useProfile();
  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setField(field, value);
    setSaved(false);
  };

  const handleSave = () => {
    saveProfile(profile);
    setSaved(true);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen px-4 pb-28 pt-4 bg-white">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="text-sm font-semibold text-slate-900">Контакты</div>

        <div className="mt-3 space-y-3">
          <input
            className="w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm bg-white text-slate-900 shadow-inner focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="Имя"
            value={profile.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <input
            className="w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm bg-white text-slate-900 shadow-inner focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="Фамилия"
            value={profile.lastName || ""}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
          <input
            className="w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm bg-white text-slate-900 shadow-inner focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="Телефон"
            value={profile.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <input
            className="w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm bg-white text-slate-900 shadow-inner focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="Адрес / доставка / самовывоз"
            value={profile.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>

        <button
          className="mt-4 w-full rounded-2xl bg-black py-3 text-sm font-semibold text-white shadow-md transition active:scale-[0.99]"
          onClick={handleSave}
        >
          Сохранить
        </button>

        {saved && (
          <div className="mt-2 text-center text-xs font-medium text-green-600">Данные сохранены</div>
        )}
      </div>
    </div>
  );
}
