const USE_MOCK = true;

export const TOP_CATEGORIES = [
  { id: "poligrafiya", title: "Полиграфия" },
  { id: "banner-print", title: "Печать баннера" },
  { id: "stamps", title: "Печати и штампы" },
  { id: "outdoor", title: "Наружная реклама" },
  { id: "business", title: "Для вашего бизнеса" },
];

const DEFAULT_SLIDES = [
  "/images/products/slide-1.svg",
  "/images/products/slide-2.svg",
  "/images/products/slide-3.svg",
];

const DEFAULT_CHARACTERISTICS = {
  material: "",
  printType: "",
  density: "",
  color: "",
  extras: [],
};

const DEFAULT_MATERIALS = {
  "Стандарт": 1,
  "Плотнее": 1.12,
  "Премиум": 1.25,
};

const DEFAULT_TERMS = {
  "Обычный": 1,
  "Срочно": 1.3,
};

// Главный массив товаров
export const PRODUCTS = [
  { title: "Визитки", slug: "vizitki-pechat", category: "poligrafiya", description: "Печать визиток — быстро и качественно для вашего бизнеса.", priceFrom: 262, sourceUrl: "https://domline.ru/produkciya/vizitki-pechat", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS, calculation: { tiers: [{ from: 1, to: 50, unitPrice: 30 }, { from: 51, to: 100, unitPrice: 20 }, { from: 101, to: 200, unitPrice: 15 }, { from: 201, to: 500, unitPrice: 12 }], materials: DEFAULT_MATERIALS, terms: DEFAULT_TERMS } },
  { title: "Листовки", slug: "listovki-pechat", category: "poligrafiya", description: "Печать рекламных листовок для акций, событий и промо-кампаний.", priceFrom: 1995, sourceUrl: "https://domline.ru/produkciya/listovki-pechat", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS, calculation: { tiers: [{ from: 1, to: 50, unitPrice: 45 }, { from: 51, to: 100, unitPrice: 30 }, { from: 101, to: 200, unitPrice: 22 }, { from: 201, to: 500, unitPrice: 18 }], materials: DEFAULT_MATERIALS, terms: DEFAULT_TERMS } },
  { title: "Буклеты", slug: "buklety-pechat", category: "poligrafiya", description: "Печать буклетов для презентации услуг и товаров.", priceFrom: 2037, sourceUrl: "https://domline.ru/produkciya/buklety-pechat", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS },
  { title: "Квартальный календарь — Люкс", slug: "kvartal-nyy-kalendar-luks", category: "poligrafiya", description: "Премиальный квартальный календарь для офиса и корпоративных подарков.", priceFrom: 511, sourceUrl: "https://domline.ru/produkciya/kvartal-nyy-kalendar-luks", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS },
  { title: "Календарь — домик", slug: "kalendar--domik", category: "poligrafiya", description: "Настольный календарь-домик с брендированием.", priceFrom: 84, sourceUrl: "https://domline.ru/produkciya/kalendar--domik", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS },
  { title: "Календарь настольный перекидной", slug: "kalendar-nastol-nyy-perekidnoy", category: "poligrafiya", description: "Перекидной настольный календарь с индивидуальным дизайном.", priceFrom: 315, sourceUrl: "https://domline.ru/produkciya/kalendar-nastol-nyy-perekidnoy", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS },
  { title: "Пакет бумажный", slug: "paket-bumazhnyy", category: "poligrafiya", description: "Бумажные пакеты с фирменной печатью.", priceFrom: 43575, sourceUrl: "https://domline.ru/produkciya/paket-bumazhnyy", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS },
  { title: "Пакет крафт", slug: "paket-kraft", category: "poligrafiya", description: "Крафтовые пакеты для экологичной упаковки и брендинга.", priceFrom: 6825, sourceUrl: "https://domline.ru/produkciya/paket-kraft", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS },
  { title: "Печать баннера", slug: "pechat-bannera", category: "banner-print", description: "Печать баннеров для наружной рекламы и мероприятий.", priceFrom: 3200, sourceUrl: "https://domline.ru/produkciya/pechat-bannera", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS, calculation: { tiers: [{ from: 1, to: 50, unitPrice: 3200 }, { from: 51, to: 100, unitPrice: 3000 }, { from: 101, to: 200, unitPrice: 2800 }, { from: 201, to: 500, unitPrice: 2500 }], materials: DEFAULT_MATERIALS, terms: DEFAULT_TERMS } },
  { title: "Пресс волл из хромированных труб", slug: "pechat-press-voll", category: "banner-print", description: "Изготовление пресс-воллов с баннерной печатью.", priceFrom: 11164, sourceUrl: "https://domline.ru/produkciya/pechat-press-voll", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS },
  { title: "Пресс волл из бруска", slug: "zakazat-press-voll-iz-bruska", category: "banner-print", description: "Пресс-волл на каркасе из бруска для фотозон и презентаций.", priceFrom: 22296, sourceUrl: "https://domline.ru/produkciya/zakazat-press-voll-iz-bruska", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS },
  { title: "Баннерная сетка", slug: "bannernaya-setka", category: "banner-print", description: "Печать на баннерной сетке для больших фасадных размещений.", priceFrom: 176, sourceUrl: "https://domline.ru/produkciya/bannernaya-setka", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS },
  { title: "Печать рекламного материала на щит 6×3", slug: "pechat-bannera-na-schit-statika-6h3", category: "banner-print", description: "Баннеры для щитов 6×3 с подготовкой под монтаж.", priceFrom: 4347, sourceUrl: "https://domline.ru/produkciya/pechat-bannera-na-schit-statika-6h3", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS },
  { title: "Печать баннеров на суперборды", slug: "pechat-reklamnogo-materiala-na-superbordy", category: "banner-print", description: "Крупноформатная печать баннеров для супербордов.", priceFrom: 18070, sourceUrl: "https://domline.ru/produkciya/pechat-reklamnogo-materiala-na-superbordy", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS },
  { title: "Плёнка для суперсайтов", slug: "plenka-dlya-supersaytov", category: "banner-print", description: "Печать на плёнке для световых конструкций и суперсайтов.", priceFrom: 8259, sourceUrl: "https://domline.ru/produkciya/plenka-dlya-supersaytov", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS },
  { title: "Печати", slug: "pechati", category: "stamps", description: "Изготовление печатей для ИП и организаций.", priceFrom: 1300, sourceUrl: "https://domline.ru/produkciya/pechati", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS, calculation: { tiers: [{ from: 1, to: 50, unitPrice: 1300 }, { from: 51, to: 100, unitPrice: 1150 }, { from: 101, to: 200, unitPrice: 1000 }, { from: 201, to: 500, unitPrice: 900 }], materials: DEFAULT_MATERIALS, terms: DEFAULT_TERMS } },
  { title: "Оттиск D 40", slug: "ottisk-d-40", category: "stamps", description: "Сменный оттиск D40 для печати диаметром 40 мм.", priceFrom: 472, sourceUrl: "https://domline.ru/produkciya/ottisk-d-40", sizes: [{ label: "D40", widthMm: 40, heightMm: 40 }], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS },
  { title: "Штампы", slug: "stampi", category: "stamps", description: "Изготовление штампов под задачи документооборота.", priceFrom: 987, sourceUrl: "https://domline.ru/produkciya/stampi", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS },
  { title: "Печать на холсте", slug: "kartina-inter-er-pechat-na-holste", category: "outdoor", description: "Интерьерная печать на холсте.", priceFrom: 2206, sourceUrl: "https://domline.ru/produkciya/kartina-inter-er-pechat-na-holste", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS },
  { title: "Рекламный паук", slug: "reklamnyy-pauk", category: "outdoor", description: "Мобильная рекламная конструкция «паук» с печатью.", priceFrom: 8093, sourceUrl: "https://domline.ru/produkciya/reklamnyy-pauk", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS },
  { title: "Ролл-ап", slug: "roll-ap", category: "outdoor", description: "Ролл-ап стенды для выставок, презентаций и промо-точек.", priceFrom: 16370, sourceUrl: "https://domline.ru/produkciya/roll-ap", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS },
  { title: "Печать постера", slug: "pechat-postera", category: "outdoor", description: "Печать постеров разных форматов.", priceFrom: 534, sourceUrl: "https://domline.ru/produkciya/pechat-postera", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS },
  { title: "Баннерные вывески", slug: "bannernye-vyveski", category: "outdoor", description: "Изготовление баннерных вывесок для бизнеса.", priceFrom: 1830, sourceUrl: "https://domline.ru/produkciya/bannernye-vyveski", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS },
  { title: "Бейджи с гравировкой", slug: "beydzhi", category: "business", description: "Именные и корпоративные бейджи с гравировкой.", priceFrom: 463, sourceUrl: "https://domline.ru/produkciya/beydzhi", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS },
  { title: "Бейджи с УФ печатью", slug: "beydzhi-uf-pechat", category: "business", description: "Бейджи с полноцветной УФ-печатью.", priceFrom: 565, sourceUrl: "https://domline.ru/produkciya/beydzhi-uf-pechat", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS },
  { title: "Режимы работы", slug: "rezhimy-raboty", category: "business", description: "Таблички с режимом работы и фирменным стилем.", priceFrom: 821, sourceUrl: "https://domline.ru/produkciya/rezhimy-raboty", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS },
  { title: "Адресные таблички", slug: "adresnye-tablichki", category: "business", description: "Адресные таблички для дома и офиса.", priceFrom: 677, sourceUrl: "https://domline.ru/produkciya/adresnye-tablichki", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS },
  { title: "Пакет ПВД", slug: "paket-pvd", category: "business", description: "ПВД пакеты с нанесением логотипа.", priceFrom: 6300, sourceUrl: "https://domline.ru/produkciya/paket-pvd", sizes: [], images: DEFAULT_SLIDES, characteristics: DEFAULT_CHARACTERISTICS },
];

function normalizeTiers(tiers = [], basePrice = 1000) {
  if (!Array.isArray(tiers) || tiers.length === 0) {
    return [{ from: 1, to: Number.MAX_SAFE_INTEGER, unitPrice: basePrice }];
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
  const safePriceFrom = Math.max(0, Number(item.priceFrom ?? 0));
  const pricingProfile = {
    tiers: normalizeTiers(item.calculation?.tiers, safePriceFrom || 1000),
    materials: item.calculation?.materials || DEFAULT_MATERIALS,
    terms: item.calculation?.terms || DEFAULT_TERMS,
  };

  const firstTier = pricingProfile.tiers[0];
  const minQty = Math.max(1, Number(firstTier?.from ?? 1));
  const minBatchPrice = Math.round(minQty * Math.max(0, Number(firstTier?.unitPrice ?? 0)));

  return {
    id: index + 1,
    title: item.title,
    slug: item.slug,
    category: item.category,
    description: item.description || "Краткое описание товара.",
    sizes: Array.isArray(item.sizes) ? item.sizes : [],
    priceFrom: safePriceFrom || minBatchPrice,
    images: Array.isArray(item.images) && item.images.length ? item.images : DEFAULT_SLIDES,
    characteristics: item.characteristics || DEFAULT_CHARACTERISTICS,
    pricingProfile,
    sourceUrl: item.sourceUrl,
    minQty,
    minBatchPrice,
  };
}

export function calculateProductPrice({ qty, material, term, pricingProfile }) {
  const safeQty = Math.max(1, Number(qty || 1));
  const profile = pricingProfile || { tiers: [{ from: 1, to: Number.MAX_SAFE_INTEGER, unitPrice: 1000 }], materials: DEFAULT_MATERIALS, terms: DEFAULT_TERMS };

  const tiers = normalizeTiers(profile.tiers);
  const activeTier = tiers.find((tier) => safeQty >= tier.from && safeQty <= tier.to) || tiers[tiers.length - 1];
  const subtotal = safeQty * Math.max(0, Number(activeTier?.unitPrice || 0));

  const kMat = Number((profile.materials || DEFAULT_MATERIALS)[material] ?? 1);
  const kTerm = Number((profile.terms || DEFAULT_TERMS)[term] ?? 1);

  return Math.round(subtotal * kMat * kTerm);
}

const PRODUCTS_BY_CATEGORY = PRODUCTS.reduce((acc, item, index) => {
  if (!acc[item.category]) acc[item.category] = [];
  acc[item.category].push(toPublicProduct(item, index));
  return acc;
}, {});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
      const product = all.find((x) => x.slug === slug);
      if (!product) throw new Error("Not found");
      return product;
    }
  },

  async estimatePrice({ slug, qty, material, term, pricingProfile }) {
    await sleep(50);

    const all = Object.values(PRODUCTS_BY_CATEGORY).flat();
    const product = all.find((x) => x.slug === slug);