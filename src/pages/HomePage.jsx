import React, { useEffect, useState } from "react";
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

function ProductRow({ item, onClick }) {
  return (
    <button
      className="w-full text-left rounded-3xl bg-white px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.08)] border border-slate-200 active:scale-[0.99] transition"
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold leading-snug">{item.title}</div>
          <div className="text-[11px] text-slate-500 mt-1">Конфигуратор • Превью макета</div>
        </div>
        <div className="text-slate-600 text-lg">↗</div>
      </div>
    </button>
  );
}

function ServiceChecklist({ onNeedHelp }) {
  const items = [
    "Менеджер подключится и проверит макет перед печатью",
    "Уточним доставку: самовывоз, курьер или выдача в пункте",
    "Дадим прогноз срока и сразу покажем стоимость",
  ];

  return (
    <div className="mt-4 rounded-3xl bg-white border border-slate-200 shadow-[0_16px_40px_rgba(0,0,0,0.08)] p-4">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="text-sm font-semibold">Поможем собрать заказ без ошибок</div>
          <div className="mt-2 space-y-2">
            {items.map((text) => (
              <div key={text} className="flex items-start gap-2 text-[13px] text-slate-600 leading-snug">
                <span className="mt-0.5 text-black">✔</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              className="px-4 py-2 text-sm font-semibold btn-black"
              onClick={onNeedHelp}
            >
              Нужна помощь с заказом
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-semibold btn-ghost"
              onClick={() => window?.open?.("tel:+73012222333")}
            >
              Позвонить: +7 (3012) 222-333
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage({ onOpenProduct }) {
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

  const topTitle = topCategories.find((x) => x.id === top)?.title || "Категория";

  return (
    <div className="max-w-md mx-auto px-4 pb-28 pt-2">
      <TopTabs
        items={topCategories.length ? topCategories : [{ id: top, title: topTitle }]}
        activeId={top}
        onChange={(id) => setTop(id)}
      />

      <div className="mt-4 glass-card p-5 bg-gradient-to-br from-white to-slate-50 text-slate-900 shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_20%_20%,rgba(15,23,42,0.05),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(15,23,42,0.04),transparent_40%)]" />
        <div className="relative">
          <div className="text-xs uppercase tracking-wide text-slate-500">{topTitle}</div>
          <div className="text-2xl font-semibold mt-1 leading-tight">Создай идеальный тираж</div>
          <div className="text-sm text-slate-600 mt-2">Конфигуратор, загрузка макета и проверка в одном клике.</div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              className="btn-black px-4 py-2 text-sm font-semibold"
              onClick={() => alert("Позже: промокоды")}
            >
              Промокод
            </button>
            <button
              className="btn-ghost px-4 py-2 text-sm font-semibold"
              onClick={() => alert("Позже: консультация")}
            >
              Консультация
            </button>
          </div>
        </div>
      </div>

      <ServiceChecklist onNeedHelp={() => alert("Менеджер свяжется с вами для уточнения деталей.")} />

      <div className="mt-4 space-y-2">
        {loading && (
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200 text-sm text-slate-600">
            Загрузка…
          </div>
        )}

        {!loading &&
          items.map((it) => (
            <ProductRow key={it.slug} item={it} onClick={() => onOpenProduct?.(it.slug)} />
          ))}

        {!loading && items.length === 0 && (
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200 text-sm text-slate-600">
            Ничего не найдено.
          </div>
        )}
      </div>
    </div>
  );
}
