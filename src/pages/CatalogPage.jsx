import React, { useEffect, useMemo, useState } from "react";
import { api } from "../app/api.js";
import { formatRUB } from "../app/ui.js";

function IconPrinter({ className = "w-12 h-12" }) {
  return (
      <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          className={"text-indigo-300 " + className}
      >
        <path
            d="M7 9V4.5A1.5 1.5 0 0 1 8.5 3h7A1.5 1.5 0 0 1 17 4.5V9"
            strokeLinecap="round"
        />
        <rect x="4" y="8" width="16" height="8.5" rx="2" ry="2" />
        <path d="M7 15h10v5H7z" />
        <path d="M8.5 12h7" strokeLinecap="round" />
        <circle cx="17.5" cy="11" r="0.8" fill="currentColor" stroke="none" />
      </svg>
  );
}

function IconArrow({ className = "w-4 h-4" }) {
  return (
      <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={"text-indigo-300 " + className}
      >
        <path d="M7 17 17 7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
  );
}

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
                            ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-[0_12px_30px_rgba(99,102,241,0.35)]"
                            : "bg-slate-800/70 text-slate-200 border-slate-700 hover:border-indigo-500/60")
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
          className="text-left rounded-3xl bg-slate-900/70 shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-slate-700/70 overflow-hidden active:scale-[0.99] transition backdrop-blur"
      >
        <div className="aspect-[4/3] bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950 relative">
          <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.16),transparent_50%)]" />
          <div className="absolute inset-0 grid place-items-center text-slate-300">
            <div className="text-center">
              <IconPrinter className="w-11 h-11 mx-auto" />
              <div className="mt-1 text-[11px] text-indigo-200/80">Превью</div>
            </div>
          </div>

          <div className="absolute top-3 left-3">
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur border border-indigo-900 text-indigo-100 shadow whitespace-nowrap">
              от {formatRUB(item.priceFrom ?? 900)}
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="text-sm font-semibold leading-snug line-clamp-2">
            {item.title}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="text-xs text-indigo-200 font-semibold">Открыть конфигуратор</div>
            <IconArrow />
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

  const filtered = useMemo(() => items, [items]);

  const title = cats.find((c) => c.id === active)?.title || "Каталог";

  return (
      <div className="max-w-md mx-auto px-4 pb-28 pt-2">
        <TopTabs
            items={cats.length ? cats : [{ id: active, title }]}
            activeId={active}
            onChange={(id) => {
              setActive(id);
            }}
        />

        <div className="mt-4 glass-card p-5 bg-gradient-to-br from-indigo-700/90 via-blue-600/90 to-purple-700/90 text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.25),transparent_35%),radial-gradient(circle_at_90%_20%,rgba(255,255,255,0.2),transparent_40%)]" />
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
          {(loadingCats || loadingItems) && (
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="rounded-3xl bg-slate-900/70 border border-slate-700 overflow-hidden"
                    >
                      <div className="aspect-[4/3] bg-slate-800 animate-pulse" />
                      <div className="p-4 space-y-2">
                        <div className="h-4 bg-slate-800 rounded animate-pulse" />
                        <div className="h-3 bg-slate-800 rounded w-2/3 animate-pulse" />
                      </div>
                    </div>
                ))}
              </div>
          )}

          {!loadingItems && filtered.length === 0 && (
              <div className="rounded-3xl bg-slate-900/70 p-4 shadow-sm border border-slate-700 text-sm text-slate-300">
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
