import React from "react";

export default function Header({ query, setQuery, cartCount = 0, onCartClick }) {
  return (
    <div className="sticky top-0 z-50 bg-gray-50/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-md mx-auto px-4 pt-4 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-black text-white grid place-items-center text-sm">
              D
            </div>
            <div>
              <div className="text-base font-semibold leading-tight">Домино</div>
              <div className="text-xs text-gray-500">Полиграфия • Улан-Удэ</div>
            </div>
          </div>

          <button
            className="relative rounded-2xl bg-white px-3 py-2 text-sm shadow-sm border border-gray-100 active:scale-[0.99] transition"
            onClick={onCartClick}
            aria-label="Корзина"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-black text-white text-[10px] grid place-items-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <div className="mt-3">
          <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-sm border border-gray-100">
            <span className="text-gray-400">🔎</span>
            <input
              className="w-full bg-transparent text-sm outline-none"
              placeholder="Поиск: визитки, баннер 12×4…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                className="text-xs text-gray-500 px-2 py-1 rounded-xl hover:bg-gray-100"
                onClick={() => setQuery("")}
              >
                Сброс
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
