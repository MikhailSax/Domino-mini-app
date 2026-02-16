import React from "react";

function AuthBadge({ authStatus, userLabel }) {
  if (authStatus === "loading") {
    return <div className="text-[11px] text-slate-500">Авторизация…</div>;
  }

  if (authStatus === "authenticated") {
    return <div className="text-[11px] text-emerald-600">Telegram: {userLabel}</div>;
  }

  return <div className="text-[11px] text-amber-600">Без Telegram-авторизации</div>;
}

export default function Header({
  cartCount = 0,
  onCartClick,
  authStatus = "idle",
  authError = "",
  userLabel = "",
}) {
  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className="max-w-md mx-auto px-4 pt-4 pb-3">
        <div className="glass-card p-3 shadow-lg">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white border border-black text-red-600 grid place-items-center font-semibold shadow-md">
                D
              </div>
              <div>
                <div className="text-base font-semibold leading-tight">Домино</div>
                <div className="text-xs text-slate-400">Полиграфия • Улан-Удэ</div>
                <AuthBadge authStatus={authStatus} userLabel={userLabel} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="relative btn-black px-4 py-2 text-sm"
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

          {authError && <div className="mt-2 text-xs text-rose-600">{authError}</div>}
        </div>
      </div>
    </div>
  );
}
