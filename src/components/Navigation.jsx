import React from "react";

export default function Navigation({ active = "home", onNav }) {
  const Item = ({ id, icon, title }) => (
    <button
      className={
        "flex-1 py-2 btn-black " +
        (active === id ? "" : "opacity-80 hover:opacity-100")
      }
      onClick={() => (onNav ? onNav(id) : alert(`Раздел: ${title}`))}
    >
      <div className="text-lg leading-none">{icon}</div>
      <div className="text-[11px] mt-1 font-medium">{title}</div>
    </button>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-6px_24px_rgba(0,0,0,0.06)]">
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
