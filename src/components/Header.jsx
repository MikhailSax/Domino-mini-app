import React from "react";

export default function Header({ cartCount = 0, onCartClick }) {
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
        </div>
      </div>
    </div>
  );
}
