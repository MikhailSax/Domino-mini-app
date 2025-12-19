import React from "react";

export default function Header({ query, setQuery, cartCount = 0, onCartClick }) {
  return (
    <div className="sticky top-0 z-50 bg-gradient-to-b from-white/80 via-white/70 to-transparent backdrop-blur-xl">
      <div className="max-w-md mx-auto px-4 pt-4 pb-3">
        <div className="glass-card p-3 shadow-lg">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 text-white grid place-items-center font-semibold shadow-md">
                D
              </div>
              <div>
                <div className="text-base font-semibold leading-tight">Домино</div>
                <div className="text-xs text-slate-500">Полиграфия • Улан-Удэ</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-100">
                <span className="text-xs">⭐</span>
                <span>Премиум сервис</span>
              </div>
              <button
                className="relative rounded-2xl bg-gradient-to-br from-rose-600 to-amber-600 px-4 py-2 text-sm text-white shadow-md active:scale-[0.99] transition"
                onClick={onCartClick}
                aria-label="Корзина"
              >
                🛒 Корзина
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-amber-400 text-slate-900 text-[10px] font-semibold grid place-items-center shadow">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-center gap-2 rounded-2xl bg-white/90 px-3 py-3 shadow-inner border border-white/80">
              <span className="text-rose-500">🔎</span>
              <input
                className="w-full bg-transparent text-sm outline-none"
                placeholder="Поиск: визитки, баннер 12×4…"
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
            <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-500">
              <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200">Сроки от 1 дня</span>
              <span className="px-2 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-100">Свежие макеты</span>
              <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">Доставка по городу</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
