import React, { useEffect, useMemo, useState } from "react";
import { api, calculateProductPrice } from "../app/api.js";
import { useCart } from "../app/CartContext.jsx";
import { formatRUB } from "../app/ui.js";

function Chip({ children }) {
  return (
    <span className="text-[11px] rounded-full bg-slate-100 px-3 py-1 text-slate-700 border border-slate-200">
      {children}
    </span>
  );
}

export default function ProductPage({ slug, onBack, onGoCart }) {
  const { addItem } = useCart();
  const [p, setP] = useState(null);

  const [qty, setQty] = useState(100);
  const [term, setTerm] = useState("Обычный");
  const [material, setMaterial] = useState("Стандарт");
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    api.getProductBySlug(slug).then(setP).catch(() => setP(null));
  }, [slug]);

  useEffect(() => {
    setSlideIndex(0);
  }, [slug]);

  const slides = p?.images?.length ? p.images : [];

  const price = useMemo(() => {
    return calculateProductPrice({
      qty,
      material,
      term,
      pricingProfile: p?.pricingProfile,
    });
  }, [qty, term, material, p]);

  if (!p) {
    return (
      <div className="max-w-md mx-auto p-4">
        <button className="text-sm text-slate-800 px-2 py-1 rounded-xl bg-white border border-slate-200" onClick={() => onBack?.()}>
          ← Назад
        </button>
        <div className="mt-4 rounded-3xl p-4 border border-slate-200 bg-white">Загрузка…</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 pb-[240px]">
      <button className="text-sm px-3 py-2 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-800" onClick={() => onBack?.()}>
        ← Каталог
      </button>

      {slides.length > 0 && (
        <div className="mt-3 rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm">
          <div className="relative aspect-[4/3] bg-slate-100">
            <img src={slides[slideIndex]} alt={`${p.title} — слайд ${slideIndex + 1}`} className="w-full h-full object-cover" />

            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-slate-200 text-slate-700"
                  onClick={() => setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length)}
                >
                  ←
                </button>
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-slate-200 text-slate-700"
                  onClick={() => setSlideIndex((prev) => (prev + 1) % slides.length)}
                >
                  →
                </button>
              </>
            )}
          </div>

          {slides.length > 1 && (
            <div className="flex items-center justify-center gap-2 py-3">
              {slides.map((img, idx) => (
                <button
                  key={img + idx}
                  type="button"
                  onClick={() => setSlideIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${idx === slideIndex ? "w-6 bg-black" : "w-2.5 bg-slate-300"}`}
                  aria-label={`Слайд ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-3 glass-card bg-white/95 p-4 border border-slate-200 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xl font-semibold leading-tight">{p.title}</div>
            <div className="text-sm text-slate-600 mt-1">{p.description}</div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xs text-slate-500">от</div>
            <div className="text-lg font-semibold">{formatRUB(price)}</div>
          </div>
        </div>

        <div className="text-xs text-slate-500 rounded-2xl bg-slate-50 border border-slate-200 p-2.5">
          Настройки цен и фото находятся в <span className="font-semibold">src/app/api.js → PRODUCT_SETTINGS</span>.
        </div>

        <div className="flex flex-wrap gap-2">
          <Chip>Тираж: {qty}</Chip>
          <Chip>Материал: {material}</Chip>
          <Chip>Срок: {term}</Chip>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-slate-500 mb-1">Тираж</div>
            <input
              className="w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm bg-white text-slate-900"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
              type="number"
              min={1}
            />
          </div>

          <div>
            <div className="text-xs text-slate-500 mb-1">Материал</div>
            <select
              className="w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm bg-white text-slate-900"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            >
              <option>Стандарт</option>
              <option>Плотнее</option>
              <option>Премиум</option>
            </select>
          </div>
        </div>

        <div>
          <div className="text-xs text-slate-500 mb-1">Срок</div>
          <select
            className="w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm bg-white text-slate-900"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          >
            <option>Обычный</option>
            <option>Срочно</option>
          </select>
        </div>
      </div>

      <div className="fixed left-0 right-0 z-50" style={{ bottom: "var(--bottom-nav-h)" }}>
        <div className="max-w-md mx-auto px-4">
          <div className="rounded-3xl bg-white/95 text-slate-900 backdrop-blur shadow-xl p-4 border border-slate-200">
            <div className="flex items-center justify-between px-1 mb-3">
              <div className="text-xs text-slate-500">Итого</div>
              <div className="text-lg font-semibold">{formatRUB(price)}</div>
            </div>

            <button
              className="w-full rounded-2xl bg-black text-white py-3.5 text-sm font-semibold"
              onClick={() => {
                addItem({
                  slug,
                  title: p.title,
                  qty,
                  material,
                  term,
                  price,
                  priceFrom: p.priceFrom,
                  pricingProfile: p.pricingProfile,
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
