import React from "react";
import { useOrders } from "../app/OrdersContext.jsx";
import { formatRUB } from "../app/ui.js";

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString("ru-RU");
  } catch {
    return iso;
  }
}

export default function OrdersPage() {
  const { orders, clearOrders } = useOrders();

  return (
    <div className="max-w-md mx-auto px-4 pb-28 pt-2">
      <div className="mt-3 rounded-3xl bg-black text-white p-5 shadow-sm border border-black">
        <div className="text-sm opacity-80">Мои заказы</div>
        <div className="text-2xl font-semibold mt-1 leading-tight">История</div>
        <div className="text-xs opacity-70 mt-2">Хранится локально (localStorage). Потом заменим на REST.</div>
      </div>

      {orders.length > 0 && (
        <div className="mt-3 flex justify-end">
          <button className="text-sm text-slate-400" onClick={clearOrders}>
            Очистить историю
          </button>
        </div>
      )}

      <div className="mt-3 space-y-2">
        {orders.map((o) => (
          <div key={o.id} className="bg-black/80 rounded-3xl p-4 shadow-sm border border-black">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">Заказ #{String(o.id).slice(0, 6)}</div>
                <div className="text-xs text-slate-400 mt-1">{formatDate(o.createdAt)} • {o.status}</div>
              </div>
              <div className="text-sm font-semibold">{formatRUB(o.total)}</div>
            </div>

            <div className="mt-3 text-xs text-slate-300">
              Позиций: {o.items?.length || 0}
              {o.fileName ? ` • Макет: ${o.fileName}` : ""}
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="rounded-3xl bg-black/80 p-4 shadow-sm border border-black text-sm text-slate-200">
            Пока нет заказов.
          </div>
        )}
      </div>
    </div>
  );
}
