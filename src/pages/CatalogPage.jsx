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
                        "whitespace-nowrap px-4 py-2 text-sm shadow-sm " +
                        (active ? "btn-black" : "btn-ghost text-slate-700")
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
          className="text-left rounded-3xl bg-white shadow-[0_16px_40px_rgba(0,0,0,0.08)] border border-slate-200 overflow-hidden active:scale-[0.99] transition"
      >
        <div className="aspect-[4/3] bg-gradient-to-br from-white via-slate-50 to-slate-100 relative">
          <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_20%_20%,rgba(15,23,42,0.05),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(15,23,42,0.04),transparent_50%)]" />
          <div className="absolute inset-0 grid place-items-center text-slate-400">
            <div className="text-center">
              <IconPrinter className="w-11 h-11 mx-auto text-slate-400" />
              <div className="mt-1 text-[11px] text-slate-500">Превью</div>
            </div>
          </div>

          <div className="absolute top-3 left-3">
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-black text-white shadow whitespace-nowrap">
              от {formatRUB(item.priceFrom ?? 900)}
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="text-sm font-semibold leading-snug line-clamp-2">
            {item.title}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="text-xs text-slate-600 font-semibold">Открыть конфигуратор</div>
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

        <div className="mt-4 glass-card p-5 bg-gradient-to-br from-white to-slate-50 text-slate-900 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_10%_10%,rgba(15,23,42,0.05),transparent_35%),radial-gradient(circle_at_90%_20%,rgba(15,23,42,0.04),transparent_40%)]" />
          <div className="relative">
            <div className="text-xs uppercase tracking-wide text-slate-500">{title}</div>
            <div className="text-2xl font-semibold mt-1 leading-tight">
              Каталог продукции
            </div>
            <div className="text-sm text-slate-600 mt-2">
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
                        className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm"
                    >
                      <div className="aspect-[4/3] bg-slate-100 animate-pulse" />
                      <div className="p-4 space-y-2">
                        <div className="h-4 bg-slate-100 rounded animate-pulse" />
                        <div className="h-3 bg-slate-100 rounded w-2/3 animate-pulse" />
                      </div>
                    </div>
                ))}
              </div>
          )}

          {!loadingItems && filtered.length === 0 && (
              <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-200 text-sm text-slate-600">
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
