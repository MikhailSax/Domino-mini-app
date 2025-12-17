const USE_MOCK = true;

// верхние категории (как меню)
export const TOP_CATEGORIES = [
  { id: "poligrafiya", title: "Полиграфия" },
  { id: "banners", title: "Печать баннера" },
  { id: "stamps", title: "Печати и штампы" },
  { id: "calendars", title: "Календари" },
  { id: "outdoor", title: "Наружная реклама" },
];

// товары внутри категории
const PRODUCTS_BY_CATEGORY = {
  poligrafiya: [
    { id: 1, title: "Визитки", slug: "business-cards", priceFrom: 900 },
    { id: 2, title: "Листовки", slug: "flyers", priceFrom: 1500 },
    { id: 3, title: "Буклеты", slug: "booklets", priceFrom: 1900 },
    { id: 4, title: "Пакет бумажный", slug: "paper-bag", priceFrom: 3500 },
    { id: 5, title: "Пакет крафт", slug: "kraft-bag", priceFrom: 4200 },
    { id: 6, title: "Пакет ПВД", slug: "pvd-bag", priceFrom: 4800 },
  ],
  banners: [
    { id: 10, title: "Баннер 12×3", slug: "banner-12x3", priceFrom: 8280 },
    { id: 11, title: "Баннер 12×4", slug: "banner-12x4", priceFrom: 17210 },
    { id: 12, title: "Баннер 15×5", slug: "banner-15x5", priceFrom: 25289 },
  ],
  stamps: [
    { id: 20, title: "Печать ИП", slug: "stamp-ip", priceFrom: 900 },
    { id: 21, title: "Печать ООО", slug: "stamp-ooo", priceFrom: 1200 },
    { id: 22, title: "Штампы", slug: "stamps", priceFrom: 800 },
  ],
  calendars: [
    { id: 30, title: "Квартальный календарь — Стандарт", slug: "calendar-quarter-standard", priceFrom: 1900 },
    { id: 31, title: "Квартальный календарь — Люкс", slug: "calendar-quarter-lux", priceFrom: 2900 },
  ],
  outdoor: [
    { id: 40, title: "Билборды", slug: "billboards", priceFrom: 10000 },
    { id: 41, title: "Суперборды", slug: "superboards", priceFrom: 20000 },
    { id: 42, title: "Суперсайты / видеоэкраны", slug: "supersites", priceFrom: 30000 },
  ],
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export const api = {
  async getTopCategories() {
    if (USE_MOCK) {
      await sleep(80);
      return TOP_CATEGORIES;
    }
  },

  async getProductsByTopCategory(topCategoryId) {
    if (USE_MOCK) {
      await sleep(80);
      return PRODUCTS_BY_CATEGORY[topCategoryId] || [];
    }
  },

  async getProductBySlug(slug) {
    if (USE_MOCK) {
      await sleep(80);
      const all = Object.values(PRODUCTS_BY_CATEGORY).flat();
      const p = all.find((x) => x.slug === slug);
      if (!p) throw new Error("Not found");
      return {
        ...p,
        description: "Описание добавим позже. Здесь будет конфигуратор и загрузка макета.",
      };
    }
  },

  async estimatePrice({ slug, qty, material, term, priceFrom }) {
    await sleep(50);
    const base = Number(priceFrom || (slug?.includes("banner") ? 8000 : 900));
    const kQty = Math.max(1, Number(qty || 1) / 100);
    const kTerm = term === "Срочно" ? 1.3 : 1;
    const kMat = material === "Премиум" ? 1.25 : material === "Плотнее" ? 1.12 : 1;
    return Math.round(base * kQty * kTerm * kMat);
  },
};
