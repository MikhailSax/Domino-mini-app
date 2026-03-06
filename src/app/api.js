const USE_MOCK = true;

// Категории и продукция синхронизированы с разделом https://domline.ru/produkciya
// (снимок структуры и названий на момент обновления).
export const TOP_CATEGORIES = [
  { id: "poligrafiya", title: "Полиграфия" },
  { id: "banner-print", title: "Печать баннера" },
  { id: "stamps", title: "Печати и штампы" },
  { id: "outdoor", title: "Наружная реклама" },
  { id: "business", title: "Для вашего бизнеса" },
];

// 👇 Основной массив для редактирования цен и фото товаров.
// Можно менять priceFrom, pricing и images под актуальный прайс/контент.
const PRODUCT_SETTINGS = [
  {
    slug: "vizitki-pechat",
    priceFrom: 1500,
    pricing: { baseQty: 100, basePrice: 1500, extraUnitPrice: 8 },
    images: ["/images/products/slide-1.svg", "/images/products/slide-2.svg", "/images/products/slide-3.svg"],
  },
  {
    slug: "listovki-pechat",
    priceFrom: 2100,
    pricing: { baseQty: 100, basePrice: 2100, extraUnitPrice: 12 },
    images: ["/images/products/slide-2.svg", "/images/products/slide-3.svg", "/images/products/slide-1.svg"],
  },
  {
    slug: "pechat-bannera",
    priceFrom: 3200,
    pricing: { baseQty: 1, basePrice: 3200, extraUnitPrice: 950 },
    images: ["/images/products/slide-3.svg", "/images/products/slide-1.svg", "/images/products/slide-2.svg"],
  },
  {
    slug: "pechati",
    priceFrom: 1300,
    pricing: { baseQty: 1, basePrice: 1300, extraUnitPrice: 450 },
    images: ["/images/products/slide-1.svg", "/images/products/slide-2.svg", "/images/products/slide-3.svg"],
  },
];

const CATEGORY_PRICING = {
  poligrafiya: { priceFrom: 1400, baseQty: 100, basePrice: 1400, extraUnitPrice: 8 },
  "banner-print": { priceFrom: 3200, baseQty: 1, basePrice: 3200, extraUnitPrice: 920 },
  stamps: { priceFrom: 1200, baseQty: 1, basePrice: 1200, extraUnitPrice: 420 },
  outdoor: { priceFrom: 2600, baseQty: 1, basePrice: 2600, extraUnitPrice: 780 },
  business: { priceFrom: 1600, baseQty: 50, basePrice: 1600, extraUnitPrice: 20 },
};

const DEFAULT_SLIDES = ["/images/products/slide-1.svg", "/images/products/slide-2.svg", "/images/products/slide-3.svg"];

const RAW_PRODUCTS = [
  { title: "Визитки", slug: "vizitki-pechat", category: "poligrafiya", description: "Печать визиток — быстро и качественно для вашего бизнеса.", sourceUrl: "https://domline.ru/produkciya/vizitki-pechat" },
  { title: "Визитки с ламинацией", slug: "vizitki-pechat-s-laminaciei", category: "poligrafiya", description: "Визитки с дополнительной ламинацией для более презентабельного вида и защиты.", sourceUrl: "https://domline.ru/produkciya/vizitki-pechat-s-laminaciei" },
  { title: "Листовки", slug: "listovki-pechat", category: "poligrafiya", description: "Печать рекламных листовок для акций, событий и промо-кампаний.", sourceUrl: "https://domline.ru/produkciya/listovki-pechat" },
  { title: "Буклеты", slug: "buklety-pechat", category: "poligrafiya", description: "Печать буклетов для презентации услуг и товаров.", sourceUrl: "https://domline.ru/produkciya/buklety-pechat" },
  { title: "Квартальный календарь — Люкс", slug: "kvartal-nyy-kalendar-luks", category: "poligrafiya", description: "Премиальный квартальный календарь для офиса и корпоративных подарков.", sourceUrl: "https://domline.ru/produkciya/kvartal-nyy-kalendar-luks" },
  { title: "Календарь — домик", slug: "kalendar--domik", category: "poligrafiya", description: "Настольный календарь-домик с брендированием.", sourceUrl: "https://domline.ru/produkciya/kalendar--domik" },
  { title: "Календарь настольный перекидной", slug: "kalendar-nastol-nyy-perekidnoy", category: "poligrafiya", description: "Перекидной настольный календарь с индивидуальным дизайном.", sourceUrl: "https://domline.ru/produkciya/kalendar-nastol-nyy-perekidnoy" },
  { title: "Пакет бумажный", slug: "paket-bumazhnyy", category: "poligrafiya", description: "Бумажные пакеты с фирменной печатью.", sourceUrl: "https://domline.ru/produkciya/paket-bumazhnyy" },
  { title: "Пакет крафт", slug: "paket-kraft", category: "poligrafiya", description: "Крафтовые пакеты для экологичной упаковки и брендинга.", sourceUrl: "https://domline.ru/produkciya/paket-kraft" },
  { title: "Дипломы", slug: "diplom", category: "poligrafiya", description: "Изготовление дипломов и наградной полиграфии.", sourceUrl: "https://domline.ru/produkciya/diplom" },
  { title: "Печать грамот", slug: "gramota", category: "poligrafiya", description: "Печать грамот на заказ с выбором форматов и материалов.", sourceUrl: "https://domline.ru/produkciya/gramota" },

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
  return {
    baseQty: Number(custom?.baseQty ?? category.baseQty ?? 100),
    basePrice: Number(custom?.basePrice ?? category.basePrice ?? 1000),
    extraUnitPrice: Number(custom?.extraUnitPrice ?? category.extraUnitPrice ?? 10),
  };
}

export function calculateProductPrice({ qty, material, term, pricingProfile }) {
  const safeQty = Math.max(1, Number(qty || 1));
  const profile = pricingProfile || { baseQty: 100, basePrice: 1000, extraUnitPrice: 10 };

  const baseQty = Math.max(1, Number(profile.baseQty || 100));
  const basePrice = Math.max(0, Number(profile.basePrice || 1000));
  const extraUnitPrice = Math.max(0, Number(profile.extraUnitPrice || 10));

  const extraQty = Math.max(0, safeQty - baseQty);
  const subtotal = basePrice + extraQty * extraUnitPrice;

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
    priceFrom: Number(customSettings.priceFrom ?? categoryPricing.priceFrom ?? pricingProfile.basePrice),
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
        description: p.description || "Краткое описание товара.",
      };
    }
  },

  async estimatePrice({ slug, qty, material, term, priceFrom, pricingProfile }) {
    await sleep(50);

    const all = Object.values(PRODUCTS_BY_CATEGORY).flat();
    const p = all.find((x) => x.slug === slug);
    const profile = pricingProfile || p?.pricingProfile || { baseQty: 100, basePrice: Number(priceFrom || 1000), extraUnitPrice: 10 };

    return calculateProductPrice({ qty, material, term, pricingProfile: profile });
  },
};
