import React, { useEffect, useMemo, useState } from "react";
import { api } from "../app/api.js";
import { useCart } from "../app/CartContext.jsx";
import { formatRUB } from "../app/ui.js";

function PlaceholderImage({ title }) {
  return (
      <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden border border-white/60 bg-gradient-to-br from-rose-50 via-white to-amber-50 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_20%,rgba(244,63,94,0.15),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(251,146,60,0.14),transparent_50%)]" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="text-4xl">🖨️</div>
            <div className="mt-2 text-xs text-slate-600 px-4">
              Изображение товара
            </div>
          </div>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="inline-flex max-w-full items-center rounded-2xl bg-white/90 backdrop-blur px-3 py-2 text-xs text-slate-700 border border-white shadow">
            <span className="truncate">{title}</span>
          </div>
        </div>
      </div>
  );
}

function Segmented({ value, onChange, items }) {
  return (
      <div className="mt-3 p-1 rounded-2xl bg-gray-100 border border-gray-200 flex gap-1">
        {items.map((it) => {
          const active = it.value === value;
          return (
              <button
                  key={it.value}
                  onClick={() => onChange(it.value)}
                  className={
                      "flex-1 text-[12px] py-2 rounded-xl active:scale-[0.99] transition " +
                      (active ? "bg-white shadow-sm" : "text-gray-600")
                  }
              >
                {it.label}
              </button>
          );
        })}
      </div>
  );
}

function Chip({ children }) {
  return (
      <span className="text-[11px] rounded-full bg-gray-100 px-3 py-1">
      {children}
    </span>
  );
}

export default function ProductPage({ slug, onBack, onGoCart }) {
  const { addItem } = useCart();

  const [p, setP] = useState(null);
  const [tab, setTab] = useState("config"); // config | upload | proof
  const [qty, setQty] = useState(100);
  const [term, setTerm] = useState("Обычный");
  const [material, setMaterial] = useState("По умолчанию");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    api.getProductBySlug(slug).then(setP).catch(() => setP(null));
  }, [slug]);

  const price = useMemo(() => {
    const base = p?.priceFrom ?? (slug?.includes("banner") ? 8000 : 900);
    const kQty = Math.max(1, Number(qty || 1) / 100);
    const kTerm = term === "Срочно" ? 1.3 : 1;
    const kMat =
        material === "Премиум" ? 1.25 : material === "Плотнее" ? 1.12 : 1;
    return Math.round(Number(base) * kQty * kTerm * kMat);
  }, [qty, term, material, slug, p]);

  if (!p) {
    return (
        <div className="max-w-md mx-auto p-4">
          <button
              className="text-sm text-gray-600 px-2 py-1 rounded-xl hover:bg-gray-100"
              onClick={() => onBack?.()}
          >
            ← Назад
          </button>
          <div className="mt-4 bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
            Загрузка…
          </div>
        </div>
    );
  }

  return (
      <div className="max-w-md mx-auto p-4 pb-[260px]">
        <div className="flex items-center justify-between">
          <button
              className="text-sm text-rose-700 px-3 py-2 rounded-2xl bg-white/70 border border-white/80 shadow-sm active:scale-[0.99]"
              onClick={() => onBack?.()}
          >
            ← Каталог
          </button>
          <div className="text-[11px] px-2 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
            Новинка недели
          </div>
        </div>

        <div className="mt-3 space-y-3">
          <PlaceholderImage title={p.title} />

          <div className="glass-card bg-white/90 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold leading-tight">{p.title}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {p.description || "Описание добавим позже."}
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-gray-500">от</div>
                <div className="text-lg font-semibold leading-none">
                  {formatRUB(price)}
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <Chip>Конфигуратор</Chip>
              <Chip>Загрузка макета</Chip>
              <Chip>Проверка</Chip>
            </div>

            <Segmented
                value={tab}
                onChange={setTab}
                items={[
                  { value: "config", label: "Конфигуратор" },
                  { value: "upload", label: "Загрузка макета" },
                  { value: "proof", label: "Проверка" },
                ]}
            />

            {/* TAB: CONFIG */}
            {tab === "config" && (
                <div className="mt-4 space-y-3">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Тираж</div>
                    <div className="flex items-center gap-2">
                      <button
                          className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-700 active:scale-[0.99] transition"
                          onClick={() => setQty((q) => Math.max(100, q - 100))}
                      >
                        −
                      </button>

                      <input
                          className="w-full rounded-2xl border border-rose-100 px-4 py-3 text-sm bg-white/90"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value || 0))}
                          type="number"
                          min={1}
                      />

                      <button
                          className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-700 active:scale-[0.99] transition"
                          onClick={() => setQty((q) => q + 100)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Материал</div>
                      <select
                          className="w-full rounded-2xl border border-rose-100 px-3 py-3 text-sm bg-white/90"
                          value={material}
                          onChange={(e) => setMaterial(e.target.value)}
                      >
                        <option>По умолчанию</option>
                        <option>Плотнее</option>
                        <option>Премиум</option>
                      </select>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500 mb-1">Срок</div>
                      <select
                          className="w-full rounded-2xl border border-rose-100 px-3 py-3 text-sm bg-white/90"
                          value={term}
                          onChange={(e) => setTerm(e.target.value)}
                      >
                        <option>Обычный</option>
                        <option>Срочно</option>
                      </select>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-3 text-xs text-gray-600">
                    Пока это демо-расчёт. Потом заменим на REST:{" "}
                    <b>/api/price/estimate</b>.
                  </div>
                </div>
            )}

            {/* TAB: UPLOAD */}
            {tab === "upload" && (
                <div className="mt-4">
                  <div className="rounded-2xl border border-dashed border-rose-200 bg-rose-50/60 p-4">
                    <div className="text-sm font-semibold text-rose-800">Загрузить макет</div>
                    <div className="text-xs text-rose-700/80 mt-1">
                      Пока заглушка. Позже сделаем загрузку в API и хранение файлов.
                    </div>

                    <div className="mt-3">
                      <input
                          type="file"
                          className="block w-full text-sm"
                          onChange={(e) =>
                              setFileName(e.target.files?.[0]?.name || "")
                          }
                      />
                      {fileName && (
                          <div className="mt-2 text-xs text-gray-700">
                            Файл: <b>{fileName}</b>
                          </div>
                      )}
                    </div>
                  </div>
                </div>
            )}

            {/* TAB: PROOF */}
            {tab === "proof" && (
                <div className="mt-4 space-y-2">
                  {[
                    "Поля/вылеты/безопасные зоны",
                    "Шрифты в кривые / приложены",
                    "Цветовая модель, качество",
                    "Проверка орфографии (по запросу)",
                  ].map((t) => (
                      <div
                          key={t}
                          className="rounded-2xl bg-rose-50/70 border border-rose-100 p-3 text-sm text-rose-900 flex items-center gap-2"
                      >
                        <span>✅</span>
                        <span>{t}</span>
                      </div>
                  ))}
                  <div className="text-xs text-gray-500 mt-2">
                    Позже: чекбоксы, платная “проверка дизайнером”.
                  </div>
                </div>
            )}
          </div>
        </div>

        {/* FLOATING BUY BAR (над нижней навигацией) */}
        <div className="fixed left-0 right-0 z-50" style={{ bottom: "var(--bottom-nav-h)" }}>
          <div className="max-w-md mx-auto px-4">
            <div className="rounded-3xl bg-gradient-to-br from-rose-600 via-orange-600 to-amber-700 text-white backdrop-blur shadow-xl p-4 border border-white/30">
              <div className="flex items-center justify-between px-1 mb-3">
                <div className="text-xs text-white/80">Итого</div>
                <div className="text-lg font-semibold">{formatRUB(price)}</div>
              </div>

              <button
                  className="w-full rounded-2xl bg-white text-rose-700 py-3.5 text-sm font-semibold active:scale-[0.99] transition shadow-lg shadow-rose-900/10"
                  onClick={() => {
                    addItem({
                      slug,
                      title: p.title,
                      qty,
                      material,
                      term,
                      price,
                      priceFrom: p.priceFrom, // важно для пересчёта в корзине
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
