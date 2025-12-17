import React from "react";
import { useProfile } from "../app/ProfileContext.jsx";

export default function ProfilePage() {
  const { profile, setField } = useProfile();

  return (
    <div className="max-w-md mx-auto px-4 pb-28 pt-2">
      <div className="mt-3 rounded-3xl bg-black text-white p-5 shadow-sm">
        <div className="text-sm opacity-90">Профиль</div>
        <div className="text-2xl font-semibold mt-1 leading-tight">Данные</div>
        <div className="text-xs opacity-80 mt-2">Сохраняется локально. Позже подключим REST.</div>
      </div>

      <div className="mt-3 bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
        <div className="text-sm font-semibold">Контакты</div>

        <div className="mt-3 space-y-3">
          <input
            className="w-full rounded-2xl border border-gray-200 px-3 py-3 text-sm"
            placeholder="Имя"
            value={profile.name || ""}
            onChange={(e) => setField("name", e.target.value)}
          />
          <input
            className="w-full rounded-2xl border border-gray-200 px-3 py-3 text-sm"
            placeholder="Телефон"
            value={profile.phone || ""}
            onChange={(e) => setField("phone", e.target.value)}
          />
          <input
            className="w-full rounded-2xl border border-gray-200 px-3 py-3 text-sm"
            placeholder="Адрес / доставка / самовывоз"
            value={profile.address || ""}
            onChange={(e) => setField("address", e.target.value)}
          />
          <textarea
            className="w-full rounded-2xl border border-gray-200 px-3 py-3 text-sm"
            placeholder="Комментарий по умолчанию"
            rows={3}
            value={profile.comment || ""}
            onChange={(e) => setField("comment", e.target.value)}
          />
        </div>
      </div>

      <div className="mt-3 bg-white rounded-3xl p-4 shadow-sm border border-gray-100 text-xs text-gray-600">
        В будущем: логин, роли, адреса, история платежей.
      </div>
    </div>
  );
}
