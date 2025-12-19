import React from "react";

export default function Navigation({ active = "home", onNav }) {
  const Item = ({ id, icon, title }) => (
    <button
      className={
        "flex-1 py-2 rounded-2xl active:scale-[0.99] transition bg-white/60 backdrop-blur border " +
        (active === id
          ? "border-rose-200 text-rose-700 shadow-[0_10px_30px_rgba(244,63,94,0.25)]"
          : "border-white/70 text-slate-500 hover:border-rose-100")
      }
      onClick={() => (onNav ? onNav(id) : alert(`Раздел: ${title}`))}
    >
      <div className="text-lg leading-none">{icon}</div>
      <div className="text-[11px] mt-1 font-medium">{title}</div>
    </button>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-white via-white/80 to-white/50 backdrop-blur-xl border-t border-white/70">
      <div className="max-w-md mx-auto p-4">
        <div className="grid grid-cols-4 gap-3">
          <Item id="home" icon="🏠" title="Главная" />
          <Item id="catalog" icon="🗂️" title="Каталог" />
          <Item id="orders" icon="📦" title="Заказы" />
          <Item id="profile" icon="👤" title="Профиль" />
        </div>
      </div>
    </div>
  );
}
