import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadCart, saveCart } from "./cartStorage.js";
import { uid } from "./ui.js";

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadCart());

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const value = useMemo(() => ({
    items,
    addItem: (item) => setItems((prev) => [...prev, { ...item, _id: uid() }]),
    removeItem: (id) => setItems((prev) => prev.filter((x) => x._id !== id)),
    clear: () => setItems([]),
    setQty: (id, qty) =>
      setItems((prev) =>
        prev.map((x) =>
          x._id === id ? { ...x, qty: Math.max(1, Number(qty || 1)) } : x
        )
      ),
  }), [items]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const v = useContext(CartCtx);
  if (!v) throw new Error("CartProvider missing");
  return v;
}
