import React from "react";

export default function Header({
  cartCount = 0,
  onCartClick,
}) {
  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className="max-w-md mx-auto px-4 pt-4 pb-3">
        <div className="glass-card p-3 shadow-lg">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src="/images/domino-logo.svg"
                alt="Домино рекламная группа"
                className="h-10 w-auto object-contain shrink-0"
              />
              <div className="min-w-0">
                <div className="text-base font-semibold leading-tight text-red-600 truncate">Домино</div>
                <div className="text-xs text-slate-500 truncate">Улан-Удэ • +7 (3012) 222-333</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="relative btn-brand px-4 py-2 text-sm"
                onClick={onCartClick}
                aria-label="Корзина"
              >
                🛒 Корзина
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-black text-white text-[10px] font-semibold grid place-items-center shadow">
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
