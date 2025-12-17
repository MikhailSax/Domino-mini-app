import React, { useMemo, useState } from "react";
import { useCart } from "../app/CartContext.jsx";
import { useOrders } from "../app/OrdersContext.jsx";
import { useProfile } from "../app/ProfileContext.jsx";
import { formatRUB } from "../app/ui.js";

export default function CheckoutPage({ onBack, onDone }) {
  const { items, clear } = useCart();
  const { addOrder } = useOrders();
  const { profile, setField } = useProfile();

  const total = useMemo(() => items.reduce((s, it) => s + Number(it.price || 0), 0), [items]);
  const [comment, setComment] = useState(profile.comment || "");
  const [fileName, setFileName] = useState("");

  const disabled = items.length === 0;

  return (
    <div className="max-w-md mx-auto px-4 pb-28 pt-2">
      <div className="flex items-center justify-between">
        <button className="text-sm text-gray-600 px-2 py-1 rounded-xl hover:bg-gray-100" onClick={onBack}>
          ← Назад
        </button>
      </div>

      <div className="mt-3 rounded-3xl bg-black text-white p-5 shadow-sm">
        <div className="text-sm opacity-90">Оформление</div>
        <div className="text-2xl font-semibold mt-1 leading-tight">Данные заказа</div>
        <div className="text-xs opacity-80 mt-2">Пока фронт. Потом отправим в REST API.</div>
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
            placeholder="Комментарий к заказу"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-3 bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
        <div className="text-sm font-semibold">Макет</div>
        <div className="text-xs text-gray-500 mt-1">Пока заглушка (имя файла). Позже загрузка в API.</div>

        <div className="mt-3">
          <input
            type="file"
            className="block w-full text-sm"
            onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
          />
          {fileName && <div className="mt-2 text-xs text-gray-600">Файл: {fileName}</div>}
        </div>
      </div>

      <div className="mt-3 bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">Итого</div>
          <div className="text-base font-semibold">{formatRUB(total)}</div>
        </div>

        <button
          className={"mt-3 w-full rounded-2xl py-3 text-sm font-medium active:scale-[0.99] transition " + (disabled ? "bg-gray-300 text-gray-600" : "bg-black text-white")}
          disabled={disabled}
          onClick={() => {
            setField("comment", comment);
            addOrder({
              customer: {
                name: profile.name || "",
                phone: profile.phone || "",
                address: profile.address || "",
                comment,
              },
              items,
              total,
              fileName,
            });
            clear();
            onDone?.();
          }}
        >
          Подтвердить заказ
        </button>
      </div>
    </div>
  );
}
