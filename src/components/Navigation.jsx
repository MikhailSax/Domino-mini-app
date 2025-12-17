import React from "react";

export default function Navigation({ active = "home", onNav }) {
  const Item = ({ id, icon, title }) => (
    <button
      className={
        "flex-1 py-2 rounded-2xl active:scale-[0.99] transition " +
        (active === id ? "bg-white shadow-sm border border-gray-100" : "text-gray-500")
      }
      onClick={() => (onNav ? onNav(id) : alert(`Раздел: ${title}`))}
    >
      <div className="text-lg leading-none">{icon}</div>
      <div className="text-[11px] mt-1">{title}</div>
    </button>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-50/80 backdrop-blur border-t border-gray-100">
      <div className="max-w-md mx-auto p-3">
        <div className="grid grid-cols-4 gap-2">
          <Item id="home" icon="🏠" title="Главная" />
          <Item id="catalog" icon="🗂️" title="Каталог" />
          <Item id="orders" icon="📦" title="Заказы" />
          <Item id="profile" icon="👤" title="Профиль" />
        </div>
      </div>
    </div>
  );
}
