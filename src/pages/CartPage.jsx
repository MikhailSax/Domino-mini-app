import React, { useMemo } from "react";
import { useCart } from "../app/CartContext.jsx";
import { formatRUB } from "../app/ui.js";

export default function CartPage({ onBack, onCheckout }) {
    const { items, removeItem, clear, updateAndRecalc } = useCart();

    const total = useMemo(
        () => items.reduce((s, it) => s + Number(it.price || 0), 0),
        [items]
    );

    return (
        <div className="max-w-md mx-auto px-4 pb-[220px] pt-2">
            <div className="flex items-center justify-between">
                <button
                    className="text-sm px-3 py-2 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-800 active:scale-[0.99]"
                    onClick={onBack}
                >
                    ← Каталог
                </button>

                {items.length > 0 && (
                    <button className="text-sm text-gray-500" onClick={clear}>
                        Очистить
                    </button>
                )}
            </div>

            <div className="mt-3 glass-card bg-white/95 p-4 border border-slate-200">
                <div className="text-lg font-semibold">Корзина</div>
                <div className="text-xs text-slate-500 mt-1">
                    {items.length ? `Позиций: ${items.length}` : "Пока пусто"}
                </div>
            </div>

            <div className="mt-3 space-y-2">
                {items.map((it) => (
                    <div
                        key={it._id}
                        className="glass-card bg-white/95 p-4 border border-slate-200"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <div className="text-sm font-semibold">{it.title}</div>
                                <div className="text-xs text-slate-500 mt-1">
                                    Материал: {it.material || "—"} • Срок: {it.term || "—"}
                                </div>
                            </div>

                            <button
                                className="text-sm text-slate-500"
                                onClick={() => removeItem(it._id)}
                            >
                                Удалить
                            </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="text-xs text-slate-500">Тираж</div>
                                <input
                                    className="w-28 rounded-2xl border border-slate-200 px-3 py-2 text-sm bg-white text-slate-900 shadow-inner"
                                    type="number"
                                    min={1}
                                    value={it.qty}
                                    onChange={(e) =>
                                        updateAndRecalc(it._id, { qty: Number(e.target.value || 1) })
                                    }
                                />
                            </div>

                            <div className="text-sm font-semibold">{formatRUB(it.price)}</div>
                        </div>

                        <div className="mt-2 text-[11px] text-black">
                            Цена сейчас считается демо-логикой. Потом заменим на REST.
                        </div>
                    </div>
                ))}

                {items.length === 0 && (
                    <div className="rounded-3xl bg-slate-50 p-4 shadow-sm border border-slate-200 text-sm text-slate-700">
                        Добавь позицию из каталога.
                    </div>
                )}
            </div>

            {/* FIXED CHECKOUT BAR */}
            {items.length > 0 && (
                <div
                    className="fixed left-0 right-0 z-50"
                    style={{ bottom: "var(--bottom-nav-h)" }}
                >
                    <div className="max-w-md mx-auto px-4">
                        <div className="rounded-3xl bg-white/95 backdrop-blur border border-slate-200 shadow-lg p-3">
                            <div className="flex items-center justify-between px-1 mb-2">
                                <div className="text-xs text-slate-500">Итого</div>
                                <div className="text-base font-semibold">{formatRUB(total)}</div>
                            </div>

                            <button
                                className="w-full rounded-2xl bg-black text-white py-3.5 text-sm font-medium active:scale-[0.99] transition shadow-lg"
                                onClick={onCheckout}
                            >
                                Оформить
                            </button>
                        </div>
                        <div className="h-3" />
                    </div>
                </div>
            )}
        </div>
    );
}
