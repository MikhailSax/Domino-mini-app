import React from "react";

const iconClass = "w-6 h-6";

const HomeIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={`${iconClass} ${className}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m3 10.5 8.454-6.14a1 1 0 0 1 1.092 0L21 10.5V19a1 1 0 0 1-1 1h-4.5v-4.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5V20H5a1 1 0 0 1-1-1z"
    />
  </svg>
);

const GridIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={`${iconClass} ${className}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.25 4.75H5.5a.75.75 0 0 0-.75.75v3.75a.75.75 0 0 0 .75.75h3.75a.75.75 0 0 0 .75-.75V5.5a.75.75 0 0 0-.75-.75zm9 0h-3.75a.75.75 0 0 0-.75.75v3.75a.75.75 0 0 0 .75.75h3.75a.75.75 0 0 0 .75-.75V5.5a.75.75 0 0 0-.75-.75zm-9 9H5.5a.75.75 0 0 0-.75.75v3.75a.75.75 0 0 0 .75.75h3.75a.75.75 0 0 0 .75-.75v-3.75a.75.75 0 0 0-.75-.75zm9 0h-3.75a.75.75 0 0 0-.75.75v3.75a.75.75 0 0 0 .75.75h3.75a.75.75 0 0 0 .75-.75v-3.75a.75.75 0 0 0-.75-.75z"
    />
  </svg>
);

const NAV_ITEMS = [
  { id: "home", title: "Главная", Icon: HomeIcon },
  { id: "catalog", title: "Каталог", Icon: GridIcon },
];

export default function Navigation({ active = "home", onNav }) {
  const handleNav = (id, title) => {
    if (onNav) {
      onNav(id);
      return;
    }

    alert(`Раздел: ${title}`);
  };

  const Item = ({ id, Icon: ItemIcon, title }) => {
    const isActive = active === id;
    return (
      <button
        type="button"
        className={
          "flex flex-col items-center gap-1 py-2 rounded-2xl border text-[11px] font-semibold transition active:scale-[0.98] " +
          (isActive
            ? "bg-slate-900 text-white border-slate-900 shadow-[0_8px_24px_rgba(15,23,42,0.3)]"
            : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:text-slate-900 shadow-sm")
        }
        onPointerUp={() => handleNav(id, title)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleNav(id, title);
          }
        }}
      >
        <ItemIcon className={isActive ? "text-white" : "text-slate-500"} />
        <div className="leading-none">{title}</div>
      </button>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-6px_24px_rgba(0,0,0,0.06)]">
      <div className="max-w-md mx-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {NAV_ITEMS.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
