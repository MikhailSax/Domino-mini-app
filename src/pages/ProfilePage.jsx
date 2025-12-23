import React from "react";
import { useProfile } from "../app/ProfileContext.jsx";

export default function ProfilePage() {
  const { profile, setField } = useProfile();

  return (
    <div className="max-w-xl mx-auto px-4 pb-28 pt-4 space-y-4 bg-gradient-to-b from-indigo-50 to-white">
      <div className="rounded-3xl border border-indigo-100 bg-white p-4 shadow-md">
        <div className="text-sm font-semibold text-slate-800">Контакты</div>

        <div className="mt-3 space-y-3">
          <input
            className="w-full rounded-2xl border border-indigo-100 px-3 py-3 text-sm bg-slate-50 text-slate-900 shadow-inner focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="Имя"
            value={profile.name || ""}
            onChange={(e) => setField("name", e.target.value)}
          />
          <input
            className="w-full rounded-2xl border border-indigo-100 px-3 py-3 text-sm bg-slate-50 text-slate-900 shadow-inner focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="Фамилия"
            value={profile.lastName || ""}
            onChange={(e) => setField("lastName", e.target.value)}
          />
          <input
            className="w-full rounded-2xl border border-indigo-100 px-3 py-3 text-sm bg-slate-50 text-slate-900 shadow-inner focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="Телефон"
            value={profile.phone || ""}
            onChange={(e) => setField("phone", e.target.value)}
          />
          <input
            className="w-full rounded-2xl border border-indigo-100 px-3 py-3 text-sm bg-slate-50 text-slate-900 shadow-inner focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="Адрес / доставка / самовывоз"
            value={profile.address || ""}
            onChange={(e) => setField("address", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
