import React from "react";
import { useProfile } from "../app/ProfileContext.jsx";

export default function ProfilePage() {
  const { profile, setField } = useProfile();

  return (
    <div className="max-w-xl mx-auto px-4 pb-28 pt-4 space-y-4 bg-gradient-to-b from-indigo-50 to-white">
      <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-5 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm leading-5 opacity-80">Профиль</div>
            <div className="text-2xl font-semibold mt-1 leading-tight">Ваши данные</div>
            <div className="text-xs opacity-80 mt-2">
              Сохраняется на устройстве. Вскоре добавим синхронизацию через REST.
            </div>
          </div>
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold shadow-sm">
            ✨ Обновлено
          </span>
        </div>
      </div>

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
          <textarea
            className="w-full rounded-2xl border border-indigo-100 px-3 py-3 text-sm bg-slate-50 text-slate-900 shadow-inner focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="Комментарий по умолчанию"
            rows={3}
            value={profile.comment || ""}
            onChange={(e) => setField("comment", e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-4 shadow-sm text-xs text-slate-700">
        В будущем: логин, роли, адреса, история платежей.
      </div>
    </div>
  );
}
