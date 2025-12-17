import React, { useMemo } from "react";
import { useCart } from "../app/CartContext.jsx";
import { formatRUB } from "../app/ui.js";

export default function CartPage({ onBack, onCheckout }) {
  const { items, removeItem, clear, setQty } = useCart();

  const total = useMemo(() => items.reduce((s, it) => s + Number(it.price || 0), 0), [items]);

  return (
    <div className="max-w-md mx-auto px-4 pb-28 pt-2">
      <div className="flex items-center justify-between">
        <button className="text-sm text-gray-600 px-2 py-1 rounded-xl hover:bg-gray-100" onClick={onBack}>
          ← Назад
        </button>
        {items.length > 0 && (
          <button className="text-sm text-gray-500" onClick={clear}>
            Очистить
          </button>
        )}
      </div>

      <div className="mt-3 bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
        <div className="text-lg font-semibold">Корзина</div>
        <div className="text-xs text-gray-500 mt-1">{items.length ? `Позиций: ${items.length}` : "Пока пусто"}</div>
      </div>

      <div className="mt-3 space-y-2">
        {items.map((it) => (
          <div key={it._id} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">{it.title}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Тираж: {it.qty} • Материал: {it.material || "—"} • Срок: {it.term || "—"}
                </div>
              </div>

              <button className="text-sm text-gray-500" onClick={() => removeItem(it._id)}>
                Удалить
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-xs text-gray-500">Тираж</div>
                <input
                  className="w-28 rounded-2xl border border-gray-200 px-3 py-2 text-sm"
                  type="number"
                  min={1}
                  value={it.qty}
                  onChange={(e) => setQty(it._id, e.target.value)}
                />
              </div>

              <div className="text-sm font-semibold">{formatRUB(it.price)}</div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="rounded-3xl bg-white p-4 shadow-sm border border-gray-100 text-sm text-gray-600">
            Добавь позицию из каталога.
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="mt-4 bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Итого</div>
            <div className="text-base font-semibold">{formatRUB(total)}</div>
          </div>

          <button
            className="mt-3 w-full rounded-2xl bg-black text-white py-3 text-sm font-medium active:scale-[0.99] transition"
            onClick={onCheckout}
          >
            Оформить
          </button>
        </div>
      )}
    </div>
  );
}
