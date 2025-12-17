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
                        "whitespace-nowrap px-4 py-2 rounded-2xl text-sm border active:scale-[0.99] transition " +
                        (active
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-700 border-gray-100 shadow-sm")
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
          className="text-left rounded-3xl bg-white shadow-sm border border-gray-100 overflow-hidden active:scale-[0.99] transition"
      >
        <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative">
          <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.08),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(0,0,0,0.06),transparent_50%)]" />
          <div className="absolute inset-0 grid place-items-center text-gray-500">
            <div className="text-center">
              <div className="text-2xl">🖨️</div>
              <div className="mt-1 text-[11px]">Превью</div>
            </div>
          </div>

          <div className="absolute top-3 left-3">
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/80 backdrop-blur border border-white text-gray-700">
            от {formatRUB(item.priceFrom ?? 900)}
          </span>
          </div>
        </div>

        <div className="p-4">
          <div className="text-sm font-semibold leading-snug line-clamp-2">
            {item.title}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="text-xs text-gray-500">Открыть</div>
            <div className="text-gray-400">›</div>
          </div>
        </div>
      </button>
  );
}

export default function CatalogPage({ query, setQuery, onOpenProduct }) {
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
              setQuery?.("");
            }}
        />

        <div className="mt-4 rounded-3xl bg-black text-white p-5 shadow-sm">
          <div className="text-sm opacity-90">{title}</div>
          <div className="text-2xl font-semibold mt-1 leading-tight">
            Каталог продукции
          </div>
          <div className="text-xs opacity-80 mt-2">
            Выбирай товар — внутри конфигуратор и корзина.
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
