const USE_MOCK = true;

export const TOP_CATEGORIES = [
  { id: "poligrafiya", title: "Полиграфия" },
  { id: "banner-print", title: "Печать баннера" },
  { id: "stamps", title: "Печати и штампы" },
  { id: "outdoor", title: "Наружная реклама" },
  { id: "business", title: "Для вашего бизнеса" },
];

const DEFAULT_SLIDES = ["/images/products/slide-1.svg", "/images/products/slide-2.svg", "/images/products/slide-3.svg"];

// 👇 Главный массив товаров. Заполняй/редактируй его вручную.
// Структура: наименование, размеры, цена, изображения, характеристики и калькуляция.
const PRODUCTS = [
  {
    title: "Шаблон: Визитки",
    slug: "template-vizitki",
    category: "poligrafiya",
    description: "Заполни описание под свой товар.",
    sizes: [
      { label: "Стандарт", widthMm: 90, heightMm: 50 },
      { label: "Евро", widthMm: 85, heightMm: 55 },
    ],
    price: { from: 0, currency: "RUB" },
    images: DEFAULT_SLIDES,
    characteristics: {
      material: "",
      printType: "",
      density: "",
      color: "",
      extras: [],
    },
    calculation: {
      materials: {
        "Стандарт": 1,
        "Плотнее": 1.12,
        "Премиум": 1.25,
      },
      terms: {
        "Обычный": 1,
        "Срочно": 1.3,
      },
      tiers: [
        { from: 1, to: 50, unitPrice: 100 },
        { from: 51, to: 100, unitPrice: 80 },
        { from: 101, to: 200, unitPrice: 70 },
        { from: 201, to: 500, unitPrice: 60 },
      ],
    },
  },
  {
    title: "Шаблон: Баннер",
    slug: "template-banner",
    category: "banner-print",
    description: "Заполни описание под свой товар.",
    sizes: [
      { label: "Малый", widthMm: 1000, heightMm: 1000 },
      { label: "Средний", widthMm: 2000, heightMm: 1000 },
    ],
    price: { from: 0, currency: "RUB" },
    images: DEFAULT_SLIDES,
    characteristics: {
      material: "",
      printType: "",
      density: "",
      color: "",
      extras: [],
    },
    calculation: {
      materials: {
        "Стандарт": 1,
        "Плотнее": 1.12,
        "Премиум": 1.25,
      },
      terms: {
        "Обычный": 1,
        "Срочно": 1.3,
      },
      tiers: [
        { from: 1, to: 50, unitPrice: 500 },
        { from: 51, to: 100, unitPrice: 450 },
        { from: 101, to: 200, unitPrice: 420 },
        { from: 201, to: 500, unitPrice: 390 },
      ],
    },
  },
  {
    title: "Шаблон: Печать/штамп",
    slug: "template-stamp",
    category: "stamps",
    description: "Заполни описание под свой товар.",
    sizes: [{ label: "D40", widthMm: 40, heightMm: 40 }],
    price: { from: 0, currency: "RUB" },
    images: DEFAULT_SLIDES,
    characteristics: {
      material: "",
      printType: "",
      density: "",
      color: "",
      extras: [],
    },
    calculation: {
      materials: {
        "Стандарт": 1,
        "Плотнее": 1.12,
        "Премиум": 1.25,
      },
      terms: {
        "Обычный": 1,
        "Срочно": 1.3,
      },
      tiers: [
        { from: 1, to: 50, unitPrice: 700 },
        { from: 51, to: 100, unitPrice: 650 },
        { from: 101, to: 200, unitPrice: 620 },
        { from: 201, to: 500, unitPrice: 590 },
      ],
    },
  },
  {
    title: "Шаблон: Наружка",
    slug: "template-outdoor",
    category: "outdoor",
    description: "Заполни описание под свой товар.",
    sizes: [{ label: "1200x2000", widthMm: 1200, heightMm: 2000 }],
    price: { from: 0, currency: "RUB" },
    images: DEFAULT_SLIDES,
    characteristics: {
      material: "",
      printType: "",
      density: "",
      color: "",
      extras: [],
    },
    calculation: {
      materials: {
        "Стандарт": 1,
        "Плотнее": 1.12,
        "Премиум": 1.25,
      },
      terms: {
        "Обычный": 1,
        "Срочно": 1.3,
      },
      tiers: [
        { from: 1, to: 50, unitPrice: 1200 },
        { from: 51, to: 100, unitPrice: 1100 },
        { from: 101, to: 200, unitPrice: 1000 },
        { from: 201, to: 500, unitPrice: 900 },
      ],
    },
  },
  {
    title: "Шаблон: Для бизнеса",
    slug: "template-business",
    category: "business",
    description: "Заполни описание под свой товар.",
    sizes: [{ label: "A5", widthMm: 148, heightMm: 210 }],
    price: { from: 0, currency: "RUB" },
    images: DEFAULT_SLIDES,
    characteristics: {
      material: "",
      printType: "",
      density: "",
      color: "",
      extras: [],
    },
    calculation: {
      materials: {
        "Стандарт": 1,
        "Плотнее": 1.12,
        "Премиум": 1.25,
      },
      terms: {
        "Обычный": 1,
        "Срочно": 1.3,
      },
      tiers: [
        { from: 1, to: 50, unitPrice: 300 },
        { from: 51, to: 100, unitPrice: 260 },
        { from: 101, to: 200, unitPrice: 240 },
        { from: 201, to: 500, unitPrice: 220 },
      ],
    },
  },
];

function normalizeTiers(tiers = []) {
  if (!Array.isArray(tiers) || tiers.length === 0) {
    return [{ from: 1, to: Number.MAX_SAFE_INTEGER, unitPrice: 1000 }];
  }

  return tiers.map((tier, index) => {
    const from = Math.max(1, Number(tier.from ?? 1));
    const nextFrom = Number(tiers[index + 1]?.from);
    const fallbackTo = Number.isFinite(nextFrom) ? nextFrom - 1 : Number.MAX_SAFE_INTEGER;
    const to = Math.max(from, Number(tier.to ?? fallbackTo));

    return {
      from,
      to,
      unitPrice: Math.max(0, Number(tier.unitPrice ?? 0)),
    };
  });
}

function toPublicProduct(item, index) {
  const pricingProfile = {
    tiers: normalizeTiers(item.calculation?.tiers),
    materials: item.calculation?.materials || { "Стандарт": 1, "Плотнее": 1.12, "Премиум": 1.25 },
    terms: item.calculation?.terms || { "Обычный": 1, "Срочно": 1.3 },
  };

  const minTier = pricingProfile.tiers[0];
  const minQty = Math.max(1, Number(minTier?.from ?? 1));
  const minBatchPrice = Math.round(minQty * Math.max(0, Number(minTier?.unitPrice ?? 0)));

  return {
    id: index + 1,
    title: item.title,
    slug: item.slug,
    category: item.category,
    description: item.description || "Краткое описание товара.",
    sizes: item.sizes || [],
    priceFrom: Number(item.price?.from ?? minBatchPrice),
    currency: item.price?.currency || "RUB",
    images: item.images?.length ? item.images : DEFAULT_SLIDES,
    characteristics: item.characteristics || {},
    pricingProfile,
    minQty,
    minBatchPrice,
  };
}

export function calculateProductPrice({ qty, material, term, pricingProfile }) {
  const safeQty = Math.max(1, Number(qty || 1));
  const profile = pricingProfile || { tiers: [{ from: 1, to: Number.MAX_SAFE_INTEGER, unitPrice: 1000 }] };

  const tiers = normalizeTiers(profile.tiers);
  const activeTier = tiers.find((tier) => safeQty >= tier.from && safeQty <= tier.to) || tiers[tiers.length - 1];
  const subtotal = safeQty * Math.max(0, Number(activeTier?.unitPrice || 0));

  const termMap = profile.terms || { "Обычный": 1, "Срочно": 1.3 };
  const materialMap = profile.materials || { "Стандарт": 1, "Плотнее": 1.12, "Премиум": 1.25 };

  const kTerm = Number(termMap[term] ?? 1);
  const kMat = Number(materialMap[material] ?? 1);

  return Math.round(subtotal * kTerm * kMat);
}

const PRODUCTS_BY_CATEGORY = PRODUCTS.reduce((acc, item, index) => {
  if (!acc[item.category]) acc[item.category] = [];
  acc[item.category].push(toPublicProduct(item, index));
  return acc;
}, {});

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
      return p;
    }
  },

  async estimatePrice({ slug, qty, material, term, pricingProfile }) {
    await sleep(50);

    const all = Object.values(PRODUCTS_BY_CATEGORY).flat();
    const p = all.find((x) => x.slug === slug);
    const profile = pricingProfile || p?.pricingProfile;

    return calculateProductPrice({ qty, material, term, pricingProfile: profile });
  },
};
