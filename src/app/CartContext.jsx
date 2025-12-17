import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { loadCart, saveCart } from "./cartStorage.js";
import { uid } from "./ui.js";
import { api } from "./api.js";

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadCart());
  const versionsRef = useRef({}); // защита от гонки async пересчёта

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const updateItem = (id, patch) => {
    setItems((prev) => prev.map((x) => (x._id === id ? { ...x, ...patch } : x)));
  };

  const updateAndRecalc = async (id, patch) => {
    let nextItem = null;

    // 1) обновляем item синхронно
    setItems((prev) =>
        prev.map((x) => {
          if (x._id !== id) return x;
          nextItem = { ...x, ...patch };
          return nextItem;
        })
    );

    if (!nextItem) return;

    // 2) запускаем пересчёт (анти-гонка)
    const v = (versionsRef.current[id] || 0) + 1;
    versionsRef.current[id] = v;

    try {
      const newPrice = await api.estimatePrice({
        slug: nextItem.slug,
        qty: nextItem.qty,
        material: nextItem.material,
        term: nextItem.term,
        priceFrom: nextItem.priceFrom,
      });

      // если после этого пользователь уже поменял ещё раз — игнорируем старый ответ
      if (versionsRef.current[id] !== v) return;

      updateItem(id, { price: newPrice });
    } catch {
      // пока молча — позже покажем toast
    }
  };

  const value = useMemo(
      () => ({
        items,

        addItem: (item) => setItems((prev) => [...prev, { ...item, _id: uid() }]),

        removeItem: (id) => setItems((prev) => prev.filter((x) => x._id !== id)),

        clear: () => setItems([]),

        // старое оставим для совместимости
        setQty: (id, qty) =>
            setItems((prev) =>
                prev.map((x) =>
                    x._id === id ? { ...x, qty: Math.max(1, Number(qty || 1)) } : x
                )
            ),

        updateItem,
        updateAndRecalc,
      }),
      [items]
  );

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const v = useContext(CartCtx);
  if (!v) throw new Error("CartProvider missing");
  return v;
}
