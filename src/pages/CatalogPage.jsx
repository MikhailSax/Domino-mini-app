import React from "react";
import HomePage from "./HomePage.jsx";

export default function CatalogPage(props) {
  // Каталог сейчас = главная (в твоём стиле).
  // Позже при рефакторинге разделим.
  return <HomePage {...props} />;
}
