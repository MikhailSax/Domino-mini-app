import React, { useMemo, useState } from "react";
import Header from "../components/Header.jsx";
import Navigation from "../components/Navigation.jsx";

import { CartProvider, useCart } from "../app/CartContext.jsx";
import { OrdersProvider } from "../app/OrdersContext.jsx";
import { ProfileProvider } from "../app/ProfileContext.jsx";

import HomePage from "./HomePage.jsx";
import CatalogPage from "./CatalogPage.jsx";
import ProductPage from "./ProductPage.jsx";
import CartPage from "./CartPage.jsx";
import CheckoutPage from "./CheckoutPage.jsx";
import OrdersPage from "./OrdersPage.jsx";
import ProfilePage from "./ProfilePage.jsx";

function ShellInner() {
  const [query, setQuery] = useState("");
  const [route, setRoute] = useState({ name: "home" }); 
  // home | catalog | orders | profile | product | cart | checkout

  const { items } = useCart();
  const cartCount = useMemo(() => items.length, [items]);

  const openProduct = (slug) => setRoute({ name: "product", slug });
  const openCart = () => setRoute({ name: "cart" });
  const openCheckout = () => setRoute({ name: "checkout" });

  const screen = route.name;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header query={query} setQuery={setQuery} cartCount={cartCount} onCartClick={openCart} />

      {screen === "home" && (
        <HomePage query={query} setQuery={setQuery} onOpenProduct={openProduct} />
      )}

      {screen === "catalog" && (
        <CatalogPage query={query} setQuery={setQuery} onOpenProduct={openProduct} />
      )}

      {screen === "product" && (
        <ProductPage
          slug={route.slug}
          onBack={() => setRoute({ name: "catalog" })}
          onGoCart={openCart}
        />
      )}

      {screen === "cart" && (
        <CartPage
          onBack={() => setRoute({ name: "catalog" })}
          onCheckout={openCheckout}
        />
      )}

      {screen === "checkout" && (
        <CheckoutPage
          onBack={openCart}
          onDone={() => setRoute({ name: "orders" })}
        />
      )}

      {screen === "orders" && <OrdersPage />}

      {screen === "profile" && <ProfilePage />}

      <Navigation
        active={
          screen === "product" || screen === "cart" || screen === "checkout"
            ? "catalog"
            : screen
        }
        onNav={(id) => setRoute({ name: id })}
      />
    </div>
  );
}

export default function Shell() {
  return (
    <ProfileProvider>
      <OrdersProvider>
        <CartProvider>
          <ShellInner />
        </CartProvider>
      </OrdersProvider>
    </ProfileProvider>
  );
}
