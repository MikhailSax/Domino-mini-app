import React, { useMemo } from "react";
import { useCart } from "../app/CartContext.jsx";
import { useProfile } from "../app/ProfileContext.jsx";
import { formatRUB } from "../app/ui.js";

const TELEGRAM_ORDER_LINK = import.meta.env.VITE_TELEGRAM_ORDER_LINK || "https://t.me/share/url?url=https://domline.ru&text=";

function buildTelegramText({ profile, items, total }) {
  const lines = [
    "Новый заказ из мини-приложения",
    "",
    `Имя: ${profile.name || "—"} ${profile.lastName || ""}`.trim(),
    `Телефон: ${profile.phone || "—"}`,
    `Доставка: ${profile.address || "—"}`,
    "",
    "Позиции:",
    ...items.map((it, index) => `${index + 1}. ${it.title} • Тираж: ${it.qty} • ${formatRUB(it.price)}`),
    "",
    `Итого: ${formatRUB(total)}`,
  ];

  return lines.join("\n");
}

export default function CheckoutPage({ onBack, onDone }) {
  const { items, clear } = useCart();
  const { profile, setField } = useProfile();

  const total = useMemo(() => items.reduce((s, it) => s + Number(it.price || 0), 0), [items]);
  const disabled = items.length === 0;

  const submitOrder = () => {
    const telegramText = buildTelegramText({ profile, items, total });
    const baseLink = TELEGRAM_ORDER_LINK.includes("text=")
      ? TELEGRAM_ORDER_LINK
      : `${TELEGRAM_ORDER_LINK}${TELEGRAM_ORDER_LINK.includes("?") ? "&" : "?"}text=`;
    const telegramUrl = `${baseLink}${encodeURIComponent(telegramText)}`;

    window.open(telegramUrl, "_blank", "noopener,noreferrer");
    clear();
    onDone?.();
  };

  return (
    <div className="max-w-md mx-auto px-4 pb-28 pt-2">
      <div className="flex items-center justify-between">
        <button className="text-sm text-white px-2 py-1 rounded-xl bg-black border border-black" onClick={onBack}>
          ← Назад
        </button>
      </div>

      <div className="mt-3 rounded-3xl bg-white text-black p-5 shadow-sm border border-slate-200">
        <div className="text-sm opacity-80">Оформление</div>
        <div className="text-2xl font-semibold mt-1 leading-tight">Данные заказа</div>
        <div className="text-xs opacity-70 mt-2 text-black">Проверьте контакты и отправьте заказ менеджеру в Telegram.</div>
      </div>

      <div className="mt-3 bg-white rounded-3xl p-4 shadow-sm border border-slate-200">
        <div className="text-sm font-semibold">Контакты</div>

        <div className="mt-3 space-y-3">
          <input className="w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm bg-white text-black" placeholder="Имя" value={profile.name || ""} onChange={(e) => setField("name", e.target.value)} />
          <input className="w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm bg-white text-black" placeholder="Фамилия" value={profile.lastName || ""} onChange={(e) => setField("lastName", e.target.value)} />
          <input className="w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm bg-white text-black" placeholder="Телефон" value={profile.phone || ""} onChange={(e) => setField("phone", e.target.value)} />
          <input className="w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm bg-white text-black" placeholder="Адрес / доставка / самовывоз" value={profile.address || ""} onChange={(e) => setField("address", e.target.value)} />
        </div>
      </div>

      <div className="mt-3 bg-white rounded-3xl p-4 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-700">Итого</div>
          <div className="text-base font-semibold text-black">{formatRUB(total)}</div>
        </div>

        <button
          className={"mt-3 w-full rounded-2xl py-3 text-sm font-medium " + (disabled ? "bg-slate-200 text-slate-500" : "bg-black text-white shadow-lg")}
          disabled={disabled}
          onClick={submitOrder}
        >
          Отправить заказ в Telegram
        </button>
      </div>
    </div>
  );
}
