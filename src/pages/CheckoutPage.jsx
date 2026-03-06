import React, { useMemo, useState } from "react";
import { useCart } from "../app/CartContext.jsx";
import { useProfile } from "../app/ProfileContext.jsx";
import { useAuth } from "../app/AuthContext.jsx";
import { formatRUB } from "../app/ui.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const TELEGRAM_ORDER_ENDPOINT =
  import.meta.env.VITE_TELEGRAM_ORDER_ENDPOINT ||
  (API_BASE_URL ? `${API_BASE_URL}/orders/telegram` : "");

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

function normalizePhone(phone) {
  return String(phone || "").replace(/\D/g, "");
}

function isValidPhone(phone) {
  const digits = normalizePhone(phone);
  return digits.length >= 10 && digits.length <= 15;
}

function buildTelegramText({ profile, items, total }) {
  const lines = [
    "Новый заказ из мини-приложения",
    "",
    `Имя: ${profile.name || "—"} ${profile.lastName || ""}`.trim(),
    `Телефон: ${profile.phone || "—"}`,
    `Комментарий: ${profile.comment || "—"}`,
    "",
    "Позиции:",
    ...items.map(
      (it, index) =>
        `${index + 1}. ${it.title} • Тираж: ${it.qty} • ${formatRUB(it.price)}`
    ),
    "",
    `Итого: ${formatRUB(total)}`,
  ];

  return lines.join("\n");
}

export default function CheckoutPage({ onBack, onDone }) {
  const { items, clear } = useCart();
  const { profile, setField } = useProfile();
  const { user } = useAuth();
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = useMemo(
    () => items.reduce((s, it) => s + Number(it.price || 0), 0),
    [items]
  );

  const disabled = items.length === 0 || isSubmitting;

  const submitOrder = async () => {
    setSubmitError("");

    if (!isValidPhone(profile.phone)) {
      setSubmitError("Введите корректный телефон (минимум 10 цифр).");
      return;
    }

    const telegramText = buildTelegramText({ profile, items, total });

    if (TELEGRAM_ORDER_ENDPOINT) {
      setIsSubmitting(true);

      try {
        const response = await fetch(TELEGRAM_ORDER_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source: "telegram-mini-app",
            telegramUser: user
              ? {
                  id: user.id,
                  username: user.username,
                  firstName: user.firstName,
                  lastName: user.lastName,
                }
              : null,
            profile,
            items,
            total,
            text: telegramText,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Order endpoint error: ${response.status} ${errorText}`.trim()
          );
        }

        clear();
        onDone?.();
      } catch {
        setSubmitError(
          "Не удалось отправить заказ в Telegram-бота. Попробуйте снова."
        );
      } finally {
        setIsSubmitting(false);
      }

      return;
    }

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      setIsSubmitting(true);

      try {
        const response = await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: TELEGRAM_CHAT_ID,
              text: telegramText,
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Telegram Bot API error: ${response.status} ${errorText}`.trim()
          );
        }

        clear();
        onDone?.();
      } catch {
        setSubmitError(
          "Не удалось отправить заказ в Telegram-бота. Попробуйте снова."
        );
      } finally {
        setIsSubmitting(false);
      }

      return;
    }

    setSubmitError(
      "Не настроена автоматическая отправка заказа. Укажите VITE_TELEGRAM_ORDER_ENDPOINT или пару VITE_TELEGRAM_BOT_TOKEN/VITE_TELEGRAM_CHAT_ID."
    );
  };

  return (
    <div className="max-w-md mx-auto px-4 pb-28 pt-2">
      <div className="flex items-center justify-between">
        <button
          className="text-sm text-white px-2 py-1 rounded-xl bg-black border border-black"
          onClick={onBack}
        >
          ← Назад
        </button>
      </div>

      <div className="mt-3 rounded-3xl bg-white text-black p-5 shadow-sm border border-slate-200">
        <div className="text-sm opacity-80">Оформление</div>
        <div className="text-2xl font-semibold mt-1 leading-tight">
          Данные заказа
        </div>
        <div className="text-xs opacity-70 mt-2 text-black">
          Проверьте контакты и отправьте заказ. Он будет отправлен в Telegram автоматически.
        </div>
      </div>

      <div className="mt-3 bg-white rounded-3xl p-4 shadow-sm border border-slate-200">
        <div className="text-sm font-semibold">Контакты</div>

        <div className="mt-3 space-y-3">
          <input
            className="w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm bg-white text-black"
            placeholder="Имя"
            value={profile.name || ""}
            onChange={(e) => setField("name", e.target.value)}
          />

          <input
            className="w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm bg-white text-black"
            placeholder="Фамилия"
            value={profile.lastName || ""}
            onChange={(e) => setField("lastName", e.target.value)}
          />

          <input
            className="w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm bg-white text-black"
            placeholder="Телефон"
            value={profile.phone || ""}
            onChange={(e) => setField("phone", e.target.value)}
          />

          <textarea
            className="w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm bg-white text-black min-h-24"
            placeholder="Комментарий к заказу"
            value={profile.comment || ""}
            onChange={(e) => setField("comment", e.target.value)}
          />
        </div>
      </div>

      <div className="mt-3 bg-white rounded-3xl p-4 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-700">Итого</div>
          <div className="text-base font-semibold text-black">
            {formatRUB(total)}
          </div>
        </div>

        {submitError ? (
          <div className="mt-3 text-xs text-red-600">{submitError}</div>
        ) : null}

        <button
          className={
            "mt-3 w-full rounded-2xl py-3 text-sm font-medium " +
            (disabled
              ? "bg-slate-200 text-slate-500"
              : "bg-black text-white shadow-lg")
          }
          disabled={disabled}
          onClick={submitOrder}
        >
          {isSubmitting ? "Отправка..." : "Оформить заказ"}
        </button>
      </div>
    </div>
  );
}
