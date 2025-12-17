import React, { useEffect, useMemo, useState } from "react";
import { api } from "../app/api.js";
import { useCart } from "../app/CartContext.jsx";
import { formatRUB } from "../app/ui.js";

function PlaceholderImage({ title }) {
  return (
    <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden border border-gray-100 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.08),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(0,0,0,0.06),transparent_50%)]" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-3xl">🖨️</div>
          <div className="mt-2 text-xs text-gray-600 px-4">Изображение товара</div>
        </div>
      </div>
      <div className="absolute bottom-3 left-3 right-3">
        <div className="inline-flex max-w-full items-center rounded-2xl bg-white/80 backdrop-blur px-3 py-2 text-xs text-gray-700 border border-white">
          <span className="truncate">{title}</span>
        </div>
      </div>
    </div>
  );
}

function Chip({ children }) {
  return <span className="text-[11px] rounded-full bg-gray-100 px-3 py-1">{children}</span>;
}

export default function ProductPage({ slug, onBack, onGoCart }) {
  const { addItem } = useCart();

  const [p, setP] = useState(null);
  const [qty, setQty] = useState(100);
  const [term, setTerm] = useState("Обычный");
  const [material, setMaterial] = useState("По умолчанию");

  useEffect(() => {
    api.getProductBySlug(slug).then(setP).catch(() => setP(null));
  }, [slug]);

  const price = useMemo(() => {
    const base = p?.priceFrom ?? (slug?.includes("banner") ? 8000 : 900);
    const kQty = Math.max(1, qty / 100);
    const kTerm = term === "Срочно" ? 1.3 : 1;
    const kMat = material === "Премиум" ? 1.25 : material === "Плотнее" ? 1.12 : 1;
    return Math.round(Number(base) * kQty * kTerm * kMat);
  }, [qty, term, material, slug, p]);

  if (!p) {
    return (
      <div className="max-w-md mx-auto p-4">
        <button className="text-sm text-gray-600 px-2 py-1 rounded-xl hover:bg-gray-100" onClick={() => onBack?.()}>
          ← Назад
        </button>
        <div className="mt-4 bg-white rounded-3xl p-4 shadow-sm border border-gray-100">Загрузка…</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 pb-[260px]">
      <button className="text-sm text-gray-600 px-2 py-1 rounded-xl hover:bg-gray-100" onClick={() => onBack?.()}>
        ← Назад
      </button>

      <div className="mt-3 space-y-3">
        <PlaceholderImage title={p.title} />

        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-lg font-semibold leading-tight">{p.title}</div>
              <div className="text-sm text-gray-600 mt-1">{p.description || "Описание добавим позже."}</div>
            </div>

            <div className="text-right">
              <div className="text-xs text-gray-500">от</div>
              <div className="text-lg font-semibold leading-none">{formatRUB(price)}</div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <Chip>Конфигуратор</Chip>
            <Chip>Загрузка макета</Chip>
            <Chip>Проверка перед печатью</Chip>
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <div className="text-xs text-gray-500 mb-1">Тираж</div>
              <div className="flex items-center gap-2">
                <button className="w-11 h-11 rounded-2xl bg-gray-100 active:scale-[0.99] transition" onClick={() => setQty((q) => Math.max(100, q - 100))}>
                  −
                </button>
                <input
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value || 0))}
                  type="number"
                  min={1}
                />
                <button className="w-11 h-11 rounded-2xl bg-gray-100 active:scale-[0.99] transition" onClick={() => setQty((q) => q + 100)}>
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-gray-500 mb-1">Материал</div>
                <select className="w-full rounded-2xl border border-gray-200 px-3 py-3 text-sm bg-white" value={material} onChange={(e) => setMaterial(e.target.value)}>
                  <option>По умолчанию</option>
                  <option>Плотнее</option>
                  <option>Премиум</option>
                </select>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Срок</div>
                <select className="w-full rounded-2xl border border-gray-200 px-3 py-3 text-sm bg-white" value={term} onChange={(e) => setTerm(e.target.value)}>
                  <option>Обычный</option>
                  <option>Срочно</option>
                </select>
              </div>
            </div>

            <div className="rounded-2xl bg-gray-50 p-3 text-xs text-gray-600">
              Пока это демо-расчёт. Потом заменим на REST: <b>/api/price/estimate</b>.
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING BUY BAR (над нижней навигацией) */}
      <div className="fixed left-0 right-0 z-50" style={{ bottom: "var(--bottom-nav-h)" }}>
        <div className="max-w-md mx-auto px-4">
          <div className="rounded-3xl bg-white/95 backdrop-blur border border-gray-100 shadow-lg p-3">
            <div className="flex items-center justify-between px-1 mb-2">
              <div className="text-xs text-gray-500">Итого</div>
              <div className="text-base font-semibold">{formatRUB(price)}</div>
            </div>

            <button
              className="w-full rounded-2xl bg-black text-white py-3.5 text-sm font-medium active:scale-[0.99] transition"
              onClick={() => {
                addItem({
                  slug,
                  title: p.title,
                  qty,
                  material,
                  term,
                  price,
                });
                onGoCart?.();
              }}
            >
              Добавить в корзину
            </button>
          </div>

          <div className="h-3" />
        </div>
      </div>
    </div>
  );
}
