import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadOrders, saveOrders } from "./ordersStorage.js";
import { uid } from "./ui.js";

const OrdersCtx = createContext(null);

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() => loadOrders());

  useEffect(() => {
    saveOrders(orders);
  }, [orders]);

  const value = useMemo(() => ({
    orders,
    addOrder: (order) =>
      setOrders((prev) => [
        { id: uid(), createdAt: new Date().toISOString(), status: "Новый", ...order },
        ...prev,
      ]),
    clearOrders: () => setOrders([]),
  }), [orders]);

  return <OrdersCtx.Provider value={value}>{children}</OrdersCtx.Provider>;
}

export function useOrders() {
  const v = useContext(OrdersCtx);
  if (!v) throw new Error("OrdersProvider missing");
  return v;
}
