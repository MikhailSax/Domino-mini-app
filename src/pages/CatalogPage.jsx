import React, { useEffect, useMemo, useState } from "react";
import { api } from "../app/api.js";
import { formatRUB } from "../app/ui.js";

function TopTabs({ items, activeId, onChange }) {
  return (
      <div className="mt-3">
        <div className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((c) => {
            const active = c.id === activeId;
            return (
                <button
                    key={c.id}
                    onClick={() => onChange(c.id)}
                    className={
                        "whitespace-nowrap px-4 py-2 rounded-2xl text-sm border active:scale-[0.99] transition shadow-sm " +
                        (active
                            ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white border-transparent shadow-[0_12px_30px_rgba(244,63,94,0.3)]"
                            : "bg-white/80 text-slate-700 border-white/70 hover:border-rose-100")
                    }
                >
                  {c.title}
                </button>
            );
          })}
        </div>
      </div>
  );
}

function ProductCard({ item, onOpen }) {
  return (
      <button
          onClick={onOpen}
          className="text-left rounded-3xl bg-white/90 shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-white/70 overflow-hidden active:scale-[0.99] transition backdrop-blur"
      >
        <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative">
          <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.08),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(0,0,0,0.06),transparent_50%)]" />
          <div className="absolute inset-0 grid place-items-center text-gray-600">
            <div className="text-center">
              <div className="text-2xl">🖨️</div>
              <div className="mt-1 text-[11px]">Превью</div>
            </div>
          </div>

          <div className="absolute top-3 left-3">
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/90 backdrop-blur border border-white text-gray-700 shadow whitespace-nowrap">
            от {formatRUB(item.priceFrom ?? 900)}
          </span>
          </div>
        </div>

        <div className="p-4">
          <div className="text-sm font-semibold leading-snug line-clamp-2">
            {item.title}
          </div>

          <div className="mt-3 flex items-center justify-between">
          <div className="text-xs text-rose-600 font-medium">Открыть конфигуратор</div>
            <div className="text-rose-400">↗</div>
          </div>
        </div>
      </button>
  );
}

export default function CatalogPage({ onOpenProduct }) {
  const [cats, setCats] = useState([]);
  const [active, setActive] = useState("poligrafiya");
  const [items, setItems] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingItems, setLoadingItems] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let ok = true;
    setLoadingCats(true);

    api
        .getTopCategories()
        .then((x) => {
          if (!ok) return;
          setCats(x || []);
          if (x?.[0] && !x.find((c) => c.id === active)) setActive(x[0].id);
        })
        .finally(() => ok && setLoadingCats(false));

    return () => {
      ok = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let ok = true;
    setLoadingItems(true);

    api
        .getProductsByTopCategory(active)
        .then((x) => ok && setItems(x || []))
        .finally(() => ok && setLoadingItems(false));

    return () => {
      ok = false;
    };
  }, [active]);

  const filtered = useMemo(() => {
    const s = (query || "").trim().toLowerCase();
    if (!s) return items;
    return items.filter((x) => x.title.toLowerCase().includes(s));
  }, [items, query]);

  const title = cats.find((c) => c.id === active)?.title || "Каталог";

  return (
      <div className="max-w-md mx-auto px-4 pb-28 pt-2">
        <TopTabs
            items={cats.length ? cats : [{ id: active, title }]}
            activeId={active}
            onChange={(id) => {
              setActive(id);
              setQuery("");
            }}
        />

        <div className="mt-4 glass-card p-5 bg-gradient-to-br from-rose-600/90 via-orange-500/90 to-amber-600/90 text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.9),transparent_35%),radial-gradient(circle_at_90%_20%,rgba(255,255,255,0.6),transparent_40%)]" />
          <div className="relative">
            <div className="text-xs uppercase tracking-wide text-white/80">{title}</div>
            <div className="text-2xl font-semibold mt-1 leading-tight">
              Каталог продукции
            </div>
            <div className="text-sm text-white/80 mt-2">
              Выбирай товар, настраивай детали, добавляй в корзину — без лишних кликов.
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="glass-card p-3 shadow-lg border border-white/80 relative">
            <div className="flex items-center gap-2 rounded-2xl bg-white/90 px-3 py-3 shadow-inner border border-white/80">
              <span className="text-rose-500">🔎</span>
              <input
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="Поиск в каталоге"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                  <button
                      className="text-xs text-rose-600 px-2 py-1 rounded-xl hover:bg-rose-50"
                      onClick={() => setQuery("")}
                  >
                    Сброс
                  </button>
              )}
            </div>

            <div className="mt-2 flex flex-wrap gap-2 text-[12px] text-slate-600">
              {["Визитки", "Баннер 3×6", "Каталог", "Печать этикеток"].map((item) => (
                  <button
                      key={item}
                      type="button"
                      className="px-3 py-1 rounded-full border border-white/80 bg-white/90 shadow-sm hover:border-rose-100 active:scale-[0.99] transition"
                      onClick={() => setQuery(item)}
                  >
                    {item}
                  </button>
              ))}
              <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-100">Поиск по товарам</span>
            </div>

            {query && (
                <div className="absolute inset-x-3 mt-3 rounded-2xl bg-white shadow-xl border border-rose-50 max-h-64 overflow-y-auto z-10">
                  {filtered.length === 0 && (
                      <div className="px-4 py-3 text-sm text-slate-600">Нет результатов</div>
                  )}
                  {filtered.slice(0, 6).map((item) => (
                      <button
                          key={item.slug}
                          className="w-full text-left px-4 py-3 text-sm hover:bg-rose-50 flex items-center justify-between gap-2"
                          onClick={() => onOpenProduct?.(item.slug)}
                      >
                        <span className="font-medium text-slate-800">{item.title}</span>
                        <span className="text-[11px] text-rose-500">Открыть ↗</span>
                      </button>
                  ))}
                </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          {(loadingCats || loadingItems) && (
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="rounded-3xl bg-white border border-gray-100 overflow-hidden"
                    >
                      <div className="aspect-[4/3] bg-gray-100 animate-pulse" />
                      <div className="p-4 space-y-2">
                        <div className="h-4 bg-gray-100 rounded animate-pulse" />
                        <div className="h-3 bg-gray-100 rounded w-2/3 animate-pulse" />
                      </div>
                    </div>
                ))}
              </div>
          )}

          {!loadingItems && filtered.length === 0 && (
              <div className="rounded-3xl bg-white p-4 shadow-sm border border-gray-100 text-sm text-gray-600">
                Ничего не найдено.
              </div>
          )}

          {!loadingItems && filtered.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {filtered.map((it) => (
                    <ProductCard
                        key={it.slug}
                        item={it}
                        onOpen={() => onOpenProduct?.(it.slug)}
                    />
                ))}
              </div>
          )}
        </div>
      </div>
  );
}
