const REMOTE_PRODUCTS_URL = String(import.meta.env.VITE_PRODUCTS_FEED_URL || "").trim();
const USE_MOCK = !REMOTE_PRODUCTS_URL;

// Категории и продукция синхронизированы с разделом https://domline.ru/produkciya
// (снимок структуры и названий на 2026-03-06).
export const TOP_CATEGORIES = [
  { id: "poligrafiya", title: "Полиграфия" },
  { id: "banner-print", title: "Печать баннера" },
  { id: "stamps", title: "Печати и штампы" },
  { id: "outdoor", title: "Наружная реклама" },
  { id: "business", title: "Для вашего бизнеса" },
];

// 👇 Основной массив для редактирования цен и фото товаров.
// Часть цен синхронизирована по schema.org price со страниц /produkciya (2026-03-06).
// Можно менять priceFrom, pricing и images под актуальный прайс/контент.
// pricing.tiers — стоимость за 1 шт в диапазоне тиража.
// По умолчанию поддерживаются диапазоны: 1–50, 51–100, 101–200, 201–500.
const PRODUCT_SETTINGS = [
  {
    slug: "vizitki-pechat",
    priceFrom: 262,
    pricing: {
      tiers: [
        { from: 1, to: 50, unitPrice: 30 },
        { from: 51, to: 100, unitPrice: 20 },
        { from: 101, to: 200, unitPrice: 15 },
        { from: 201, to: 500, unitPrice: 12 },
      ],
    },
    images: ["/images/products/slide-1.svg", "/images/products/slide-2.svg", "/images/products/slide-3.svg"],
  },
  {
    slug: "listovki-pechat",
    priceFrom: 1995,
    pricing: {
      tiers: [
        { from: 1, to: 50, unitPrice: 45 },
        { from: 51, to: 100, unitPrice: 30 },
        { from: 101, to: 200, unitPrice: 22 },
        { from: 201, to: 500, unitPrice: 18 },
      ],
    },
    images: ["/images/products/slide-2.svg", "/images/products/slide-3.svg", "/images/products/slide-1.svg"],
  },
  {
    slug: "buklety-pechat",
    priceFrom: 2037,
  },
  {
    slug: "kvartal-nyy-kalendar-luks",
    priceFrom: 511,
  },
  {
    slug: "kalendar--domik",
    priceFrom: 84,
  },
  {
    slug: "kalendar-nastol-nyy-perekidnoy",
    priceFrom: 315,
  },
  {
    slug: "paket-bumazhnyy",
    priceFrom: 43575,
  },
  {
    slug: "pechat-bannera",
    priceFrom: 3200,
    pricing: {
      tiers: [
        { from: 1, to: 50, unitPrice: 3200 },
        { from: 51, to: 100, unitPrice: 3000 },
        { from: 101, to: 200, unitPrice: 2800 },
        { from: 201, to: 500, unitPrice: 2500 },
      ],
    },
    images: ["/images/products/slide-3.svg", "/images/products/slide-1.svg", "/images/products/slide-2.svg"],
  },
  {
    slug: "pechati",
    priceFrom: 1300,
    pricing: {
      tiers: [
        { from: 1, to: 50, unitPrice: 1300 },
        { from: 51, to: 100, unitPrice: 1150 },
        { from: 101, to: 200, unitPrice: 1000 },
        { from: 201, to: 500, unitPrice: 900 },
      ],
    },
    images: ["/images/products/slide-1.svg", "/images/products/slide-2.svg", "/images/products/slide-3.svg"],
  },
];


const REMOTE_CATEGORY_MAP = {
  poligrafiya: "poligrafiya",
  "banner-print": "banner-print",
  stamps: "stamps",
  outdoor: "outdoor",
  business: "business",
};

function normalizeRemoteTier(tier, nextTier) {
  const from = Math.max(1, Number(tier?.from ?? tier?.minQty ?? 1));
  const nextFrom = Number(nextTier?.from ?? nextTier?.minQty);
  const toCandidate = Number(tier?.to ?? tier?.maxQty ?? (Number.isFinite(nextFrom) ? nextFrom - 1 : Number.MAX_SAFE_INTEGER));
  const unitPrice = Math.max(0, Number(tier?.unitPrice ?? tier?.price ?? tier?.value ?? 0));

  return {
    from,
    to: Number.isFinite(toCandidate) && toCandidate >= from ? toCandidate : Number.MAX_SAFE_INTEGER,
    unitPrice,
  };
}

function normalizeRemoteProduct(item, index, fallbackCategory = "poligrafiya") {
  const slug = String(item?.slug || item?.id || `remote-product-${index + 1}`);
  const title = String(item?.title || item?.name || `Товар ${index + 1}`);
  const description = String(item?.description || item?.shortDescription || "Краткое описание товара.");

  const categoryRaw = String(item?.category || item?.topCategory || fallbackCategory);
  const category = REMOTE_CATEGORY_MAP[categoryRaw] || fallbackCategory;

  const priceFrom = Number(
    item?.priceFrom
    ?? item?.price_from
    ?? item?.minPrice
    ?? item?.price
    ?? CATEGORY_PRICING[category]?.priceFrom
    ?? CATEGORY_PRICING.poligrafiya.priceFrom
  );

  const imageCandidates = Array.isArray(item?.images)
    ? item.images
    : Array.isArray(item?.gallery)
      ? item.gallery
      : item?.image
        ? [item.image]
        : [];

  const images = imageCandidates.filter(Boolean).length
    ? imageCandidates.filter(Boolean).map(String)
    : DEFAULT_SLIDES;

  const rawTiers = Array.isArray(item?.pricing?.tiers)
    ? item.pricing.tiers
    : Array.isArray(item?.tiers)
      ? item.tiers
      : [];

  const tiers = rawTiers
    .map((tier, tierIndex) => normalizeRemoteTier(tier, rawTiers[tierIndex + 1]))
    .filter((tier) => tier.unitPrice > 0);

  const pricingProfile = tiers.length
    ? { tiers }
    : getPricingProfile({ category, slug });

  return {
    id: index + 1,
    title,
    slug,
    category,
    priceFrom: Number.isFinite(priceFrom) ? priceFrom : CATEGORY_PRICING[category]?.priceFrom || 0,
    pricingProfile,
    images,
    description,
    sourceUrl: String(item?.sourceUrl || item?.url || ""),
  };
}

function parseRemotePayload(payload) {
  const categoriesRaw = Array.isArray(payload?.categories) ? payload.categories : null;

  const categories = categoriesRaw?.length
    ? categoriesRaw
        .map((category, index) => ({
          id: String(category?.id || category?.slug || TOP_CATEGORIES[index]?.id || `category-${index + 1}`),
          title: String(category?.title || category?.name || TOP_CATEGORIES[index]?.title || `Категория ${index + 1}`),
        }))
        .filter((category) => category.id && category.title)
    : TOP_CATEGORIES;

  const productsRaw = Array.isArray(payload?.products)
    ? payload.products
    : Array.isArray(payload?.items)
      ? payload.items
      : [];

  const productsByCategory = productsRaw.reduce((acc, item, index) => {
    const product = normalizeRemoteProduct(item, index);
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  categories.forEach((category) => {
    if (!productsByCategory[category.id]) productsByCategory[category.id] = [];
  });

  return { categories, productsByCategory };
}

let remoteCache = null;
let remoteCacheAt = 0;
const REMOTE_CACHE_TTL_MS = 60_000;

async function loadRemoteProductsData() {
  const now = Date.now();
  if (remoteCache && now - remoteCacheAt < REMOTE_CACHE_TTL_MS) {
    return remoteCache;
  }

  const response = await fetch(REMOTE_PRODUCTS_URL, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Remote products fetch failed: ${response.status}`);
  }

  const payload = await response.json();
  const normalized = parseRemotePayload(payload);
  remoteCache = normalized;
  remoteCacheAt = now;
  return normalized;
}
const CATEGORY_PRICING = {
  poligrafiya: {
    priceFrom: 1400,
    tiers: [
      { from: 1, to: 50, unitPrice: 35 },
      { from: 51, to: 100, unitPrice: 22 },
      { from: 101, to: 200, unitPrice: 16 },
      { from: 201, to: 500, unitPrice: 12 },
    ],
  },
  "banner-print": {
    priceFrom: 3200,
    tiers: [
      { from: 1, to: 50, unitPrice: 3200 },
      { from: 51, to: 100, unitPrice: 3000 },
      { from: 101, to: 200, unitPrice: 2800 },
      { from: 201, to: 500, unitPrice: 2500 },
    ],
  },
  stamps: {
    priceFrom: 1200,
    tiers: [
      { from: 1, to: 50, unitPrice: 1200 },
      { from: 51, to: 100, unitPrice: 1100 },
      { from: 101, to: 200, unitPrice: 980 },
      { from: 201, to: 500, unitPrice: 880 },
    ],
  },
  outdoor: {
    priceFrom: 2600,
    tiers: [
      { from: 1, to: 50, unitPrice: 2600 },
      { from: 51, to: 100, unitPrice: 2400 },
      { from: 101, to: 200, unitPrice: 2200 },
      { from: 201, to: 500, unitPrice: 2000 },
    ],
  },
  business: {
    priceFrom: 1600,
    tiers: [
      { from: 1, to: 50, unitPrice: 1600 },
      { from: 51, to: 100, unitPrice: 1450 },
      { from: 101, to: 200, unitPrice: 1300 },
      { from: 201, to: 500, unitPrice: 1150 },
    ],
  },
};

const DEFAULT_SLIDES = ["/images/products/slide-1.svg", "/images/products/slide-2.svg", "/images/products/slide-3.svg"];

const RAW_PRODUCTS = [
  { title: "Визитки", slug: "vizitki-pechat", category: "poligrafiya", description: "Печать визиток — быстро и качественно для вашего бизнеса.", sourceUrl: "https://domline.ru/produkciya/vizitki-pechat" },
  { title: "Листовки", slug: "listovki-pechat", category: "poligrafiya", description: "Печать рекламных листовок для акций, событий и промо-кампаний.", sourceUrl: "https://domline.ru/produkciya/listovki-pechat" },
  { title: "Буклеты", slug: "buklety-pechat", category: "poligrafiya", description: "Печать буклетов для презентации услуг и товаров.", sourceUrl: "https://domline.ru/produkciya/buklety-pechat" },
  { title: "Квартальный календарь — Люкс", slug: "kvartal-nyy-kalendar-luks", category: "poligrafiya", description: "Премиальный квартальный календарь для офиса и корпоративных подарков.", sourceUrl: "https://domline.ru/produkciya/kvartal-nyy-kalendar-luks" },
  { title: "Календарь — домик", slug: "kalendar--domik", category: "poligrafiya", description: "Настольный календарь-домик с брендированием.", sourceUrl: "https://domline.ru/produkciya/kalendar--domik" },
  { title: "Календарь настольный перекидной", slug: "kalendar-nastol-nyy-perekidnoy", category: "poligrafiya", description: "Перекидной настольный календарь с индивидуальным дизайном.", sourceUrl: "https://domline.ru/produkciya/kalendar-nastol-nyy-perekidnoy" },
  { title: "Пакет бумажный", slug: "paket-bumazhnyy", category: "poligrafiya", description: "Бумажные пакеты с фирменной печатью.", sourceUrl: "https://domline.ru/produkciya/paket-bumazhnyy" },
  { title: "Пакет крафт", slug: "paket-kraft", category: "poligrafiya", description: "Крафтовые пакеты для экологичной упаковки и брендинга.", sourceUrl: "https://domline.ru/produkciya/paket-kraft" },

  { title: "Печать баннера", slug: "pechat-bannera", category: "banner-print", description: "Печать баннеров для наружной рекламы и мероприятий.", sourceUrl: "https://domline.ru/produkciya/pechat-bannera" },
  { title: "Пресс волл из хромированных труб", slug: "pechat-press-voll", category: "banner-print", description: "Изготовление пресс-воллов с баннерной печатью.", sourceUrl: "https://domline.ru/produkciya/pechat-press-voll" },
  { title: "Пресс волл из бруска", slug: "zakazat-press-voll-iz-bruska", category: "banner-print", description: "Пресс-волл на каркасе из бруска для фотозон и презентаций.", sourceUrl: "https://domline.ru/produkciya/zakazat-press-voll-iz-bruska" },
  { title: "Баннерная сетка", slug: "bannernaya-setka", category: "banner-print", description: "Печать на баннерной сетке для больших фасадных размещений.", sourceUrl: "https://domline.ru/produkciya/bannernaya-setka" },
  { title: "Печать рекламного материала на щит 6×3", slug: "pechat-bannera-na-schit-statika-6h3", category: "banner-print", description: "Баннеры для щитов 6×3 с подготовкой под монтаж.", sourceUrl: "https://domline.ru/produkciya/pechat-bannera-na-schit-statika-6h3" },
  { title: "Печать баннеров на суперборды", slug: "pechat-reklamnogo-materiala-na-superbordy", category: "banner-print", description: "Крупноформатная печать баннеров для супербордов.", sourceUrl: "https://domline.ru/produkciya/pechat-reklamnogo-materiala-na-superbordy" },
  { title: "Плёнка для суперсайтов", slug: "plenka-dlya-supersaytov", category: "banner-print", description: "Печать на плёнке для световых конструкций и суперсайтов.", sourceUrl: "https://domline.ru/produkciya/plenka-dlya-supersaytov" },

  { title: "Печати", slug: "pechati", category: "stamps", description: "Изготовление печатей для ИП и организаций.", sourceUrl: "https://domline.ru/produkciya/pechati" },
  { title: "Оттиск D 40", slug: "ottisk-d-40", category: "stamps", description: "Сменный оттиск D40 для печати диаметром 40 мм.", sourceUrl: "https://domline.ru/produkciya/ottisk-d-40" },
  { title: "Штампы", slug: "stampi", category: "stamps", description: "Изготовление штампов под задачи документооборота.", sourceUrl: "https://domline.ru/produkciya/stampi" },

  { title: "Печать на холсте", slug: "kartina-inter-er-pechat-na-holste", category: "outdoor", description: "Интерьерная печать на холсте.", sourceUrl: "https://domline.ru/produkciya/kartina-inter-er-pechat-na-holste" },
  { title: "Рекламный паук", slug: "reklamnyy-pauk", category: "outdoor", description: "Мобильная рекламная конструкция «паук» с печатью.", sourceUrl: "https://domline.ru/produkciya/reklamnyy-pauk" },
  { title: "Ролл-ап", slug: "roll-ap", category: "outdoor", description: "Ролл-ап стенды для выставок, презентаций и промо-точек.", sourceUrl: "https://domline.ru/produkciya/roll-ap" },
  { title: "Печать постера", slug: "pechat-postera", category: "outdoor", description: "Печать постеров разных форматов.", sourceUrl: "https://domline.ru/produkciya/pechat-postera" },
  { title: "Баннерные вывески", slug: "bannernye-vyveski", category: "outdoor", description: "Изготовление баннерных вывесок для бизнеса.", sourceUrl: "https://domline.ru/produkciya/bannernye-vyveski" },

  { title: "Бейджи с гравировкой", slug: "beydzhi", category: "business", description: "Именные и корпоративные бейджи с гравировкой.", sourceUrl: "https://domline.ru/produkciya/beydzhi" },
  { title: "Бейджи с УФ печатью", slug: "beydzhi-uf-pechat", category: "business", description: "Бейджи с полноцветной УФ-печатью.", sourceUrl: "https://domline.ru/produkciya/beydzhi-uf-pechat" },
  { title: "Режимы работы", slug: "rezhimy-raboty", category: "business", description: "Таблички с режимом работы и фирменным стилем.", sourceUrl: "https://domline.ru/produkciya/rezhimy-raboty" },
  { title: "Адресные таблички", slug: "adresnye-tablichki", category: "business", description: "Адресные таблички для дома и офиса.", sourceUrl: "https://domline.ru/produkciya/adresnye-tablichki" },
  { title: "Пакет ПВД", slug: "paket-pvd", category: "business", description: "ПВД пакеты с нанесением логотипа.", sourceUrl: "https://domline.ru/produkciya/paket-pvd" },
];

const SETTINGS_BY_SLUG = PRODUCT_SETTINGS.reduce((acc, item) => {
  acc[item.slug] = item;
  return acc;
}, {});

function getPricingProfile(product) {
  const category = CATEGORY_PRICING[product.category] || CATEGORY_PRICING.poligrafiya;
  const custom = SETTINGS_BY_SLUG[product.slug]?.pricing;
  const tiers = custom?.tiers || category.tiers;
  return {
    tiers: Array.isArray(tiers) && tiers.length
      ? tiers.map((tier, index) => {
          const from = Math.max(1, Number(tier.from ?? 1));
          const nextFrom = Number(tiers[index + 1]?.from);
          const to = Number(tier.to ?? (Number.isFinite(nextFrom) ? nextFrom - 1 : Number.MAX_SAFE_INTEGER));

          return {
            from,
            to: to >= from ? to : from,
            unitPrice: Math.max(0, Number(tier.unitPrice ?? 0)),
          };
        })
      : [
          { from: 1, to: 50, unitPrice: 1000 },
          { from: 51, to: 100, unitPrice: 900 },
          { from: 101, to: 200, unitPrice: 800 },
          { from: 201, to: 500, unitPrice: 700 },
        ],
  };
}

export function calculateProductPrice({ qty, material, term, pricingProfile }) {
  const safeQty = Math.max(1, Number(qty || 1));
  const profile = pricingProfile || {
    tiers: [
      { from: 1, to: 50, unitPrice: 1000 },
      { from: 51, to: 100, unitPrice: 900 },
      { from: 101, to: 200, unitPrice: 800 },
      { from: 201, to: 500, unitPrice: 700 },
    ],
  };

  const tiers = Array.isArray(profile.tiers) && profile.tiers.length ? profile.tiers : [{ from: 1, to: Number.MAX_SAFE_INTEGER, unitPrice: 1000 }];
  const activeTier = tiers.find((tier) => safeQty >= tier.from && safeQty <= tier.to) || tiers[tiers.length - 1];
  const subtotal = safeQty * Math.max(0, Number(activeTier?.unitPrice || 0));

  const kTerm = term === "Срочно" ? 1.3 : 1;
  const kMat = material === "Премиум" ? 1.25 : material === "Плотнее" ? 1.12 : 1;

  return Math.round(subtotal * kTerm * kMat);
}

const PRODUCTS_BY_CATEGORY = RAW_PRODUCTS.reduce((acc, item, index) => {
  if (!acc[item.category]) acc[item.category] = [];

  const customSettings = SETTINGS_BY_SLUG[item.slug] || {};
  const categoryPricing = CATEGORY_PRICING[item.category] || CATEGORY_PRICING.poligrafiya;
  const pricingProfile = getPricingProfile(item);

  acc[item.category].push({
    id: index + 1,
    title: item.title,
    slug: item.slug,
    priceFrom: Number(customSettings.priceFrom ?? categoryPricing.priceFrom ?? pricingProfile.tiers?.[0]?.unitPrice ?? 0),
    pricingProfile,
    images: customSettings.images?.length ? customSettings.images : DEFAULT_SLIDES,
    description: item.description,
    sourceUrl: item.sourceUrl,
  });
  return acc;
}, {});

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export const api = {
  async getTopCategories() {
    await sleep(80);

    if (USE_MOCK) {
      return TOP_CATEGORIES;
    }

    const { categories } = await loadRemoteProductsData();
    return categories;
  },

  async getProductsByTopCategory(topCategoryId) {
    await sleep(80);

    if (USE_MOCK) {
      return PRODUCTS_BY_CATEGORY[topCategoryId] || [];
    }

    const { productsByCategory } = await loadRemoteProductsData();
    return productsByCategory[topCategoryId] || [];
  },

  async getProductBySlug(slug) {
    await sleep(80);

    const all = USE_MOCK
      ? Object.values(PRODUCTS_BY_CATEGORY).flat()
      : Object.values((await loadRemoteProductsData()).productsByCategory).flat();

    const p = all.find((x) => x.slug === slug);
    if (!p) throw new Error("Not found");

    return {
      ...p,
      description: p.description || "Краткое описание товара.",
    };
  },

  async estimatePrice({ slug, qty, material, term, priceFrom, pricingProfile }) {
    await sleep(50);

    const all = USE_MOCK
      ? Object.values(PRODUCTS_BY_CATEGORY).flat()
      : Object.values((await loadRemoteProductsData()).productsByCategory).flat();
    const p = all.find((x) => x.slug === slug);
    const profile = pricingProfile || p?.pricingProfile || {
      tiers: [
        { from: 1, to: 50, unitPrice: Number(priceFrom || 1000) },
        { from: 51, to: 100, unitPrice: Number(priceFrom || 1000) },
        { from: 101, to: 200, unitPrice: Number(priceFrom || 1000) },
        { from: 201, to: 500, unitPrice: Number(priceFrom || 1000) },
      ],
    };

    return calculateProductPrice({ qty, material, term, pricingProfile: profile });
  },
};
