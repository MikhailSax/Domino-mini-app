import React, { useEffect, useMemo, useState } from "react";
import { api } from "../app/api.js";

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
                (active ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-100 shadow-sm")
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

function ProductRow({ item, onClick }) {
  return (
    <button
      className="w-full text-left rounded-2xl bg-white px-4 py-3 shadow-sm border border-gray-100 active:scale-[0.99] transition"
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-medium">{item.title}</div>
        <div className="text-gray-400">›</div>
      </div>
    </button>
  );
}

export default function HomePage({ query, setQuery, onOpenProduct }) {
  const [topCategories, setTopCategories] = useState([]);
  const [top, setTop] = useState("poligrafiya");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);

    api.getTopCategories()
      .then((cats) => {
        if (!alive) return;
        setTopCategories(cats);
        if (cats?.[0] && !cats.find((x) => x.id === top)) setTop(cats[0].id);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let alive = true;
    api.getProductsByTopCategory(top).then((list) => {
      if (!alive) return;
      setItems(list || []);
    });
    return () => { alive = false; };
  }, [top]);

  const filtered = useMemo(() => {
    const s = (query || "").trim().toLowerCase();
    if (!s) return items;
    return items.filter((x) => x.title.toLowerCase().includes(s));
  }, [items, query]);

  const topTitle = topCategories.find((x) => x.id === top)?.title || "Категория";

  return (
    <div className="max-w-md mx-auto px-4 pb-28 pt-2">
      <TopTabs
        items={topCategories.length ? topCategories : [{ id: top, title: topTitle }]}
        activeId={top}
        onChange={(id) => { setTop(id); setQuery(""); }}
      />

      <div className="mt-4 rounded-3xl bg-black text-white p-5 shadow-sm">
        <div className="text-sm opacity-90">{topTitle}</div>
        <div className="text-2xl font-semibold mt-1 leading-tight">Выберите продукцию</div>
        <div className="text-xs opacity-80 mt-2">Дальше откроем конфигуратор и добавим в корзину.</div>

        <div className="mt-4 flex gap-2">
          <button
            className="rounded-2xl bg-white text-black px-4 py-2 text-sm font-medium active:scale-[0.99] transition"
            onClick={() => alert("Позже: промокоды")}
          >
            Промокод
          </button>
          <button
            className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-medium active:scale-[0.99] transition"
            onClick={() => alert("Позже: консультация")}
          >
            Консультация
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {loading && (
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100 text-sm text-gray-600">
            Загрузка…
          </div>
        )}

        {!loading && filtered.map((it) => (
          <ProductRow key={it.slug} item={it} onClick={() => onOpenProduct?.(it.slug)} />
        ))}

        {!loading && filtered.length === 0 && (
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100 text-sm text-gray-600">
            Ничего не найдено.
          </div>
        )}
      </div>
    </div>
  );
}
