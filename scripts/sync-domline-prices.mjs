import fs from "node:fs/promises";
import path from "node:path";

const API_FILE = path.resolve("src/app/api.js");

function extractProducts(source) {
  const re = /\{\s*title:\s*"([^"]+)",\s*slug:\s*"([^"]+)",[\s\S]*?sourceUrl:\s*"([^"]+)"\s*\}/g;
  const items = [];
  let match;
  while ((match = re.exec(source))) {
    items.push({ title: match[1], slug: match[2], sourceUrl: match[3] });
  }
  return items;
}

function parseNumericPrice(raw) {
  if (typeof raw === "number") return Math.round(raw);
  const m = String(raw ?? "").match(/[\d\s]+(?:[.,]\d+)?/);
  if (!m) return null;
  const normalized = m[0].replace(/\s+/g, "").replace(",", ".");
  const value = Number.parseFloat(normalized);
  return Number.isFinite(value) ? Math.round(value) : null;
}

async function extractPriceFromPage(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36",
      accept: "text/html,application/xhtml+xml",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const html = await response.text();
  const scripts = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);

  for (const script of scripts) {
    const cleaned = script.replace("/*<![CDATA[*/", "").replace("/*]]>*/", "").trim();
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      continue;
    }

    const nodes = Array.isArray(parsed) ? parsed : [parsed];
    for (const node of nodes) {
      if (!node || typeof node !== "object") continue;
      const offers = Array.isArray(node.offers) ? node.offers : node.offers ? [node.offers] : [];
      for (const offer of offers) {
        const price = parseNumericPrice(offer?.price);
        if (price) return price;
      }
    }
  }

  return null;
}

function renderMap(mapObject) {
  const entries = Object.entries(mapObject)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([slug, price]) => `  "${slug}": ${price},`)
    .join("\n");

  return `const PRICE_FROM_BY_SLUG = {\n${entries}\n};`;
}

function replacePriceMap(source, mapObject) {
  const block = renderMap(mapObject);
  return source.replace(/const PRICE_FROM_BY_SLUG = \{[\s\S]*?\n\};/, block);
}

async function main() {
  const source = await fs.readFile(API_FILE, "utf8");
  const products = extractProducts(source);

  const prices = {};
  for (const product of products) {
    try {
      const price = await extractPriceFromPage(product.sourceUrl);
      if (price) {
        prices[product.slug] = price;
        console.log(`✓ ${product.slug}: ${price}`);
      } else {
        console.log(`- ${product.slug}: price not found`);
      }
    } catch (error) {
      console.log(`x ${product.slug}: ${error.message}`);
    }
  }

  const foundCount = Object.keys(prices).length;
  if (!foundCount) {
    throw new Error("Не удалось получить ни одной цены. Файл не изменён.");
  }

  const updated = replacePriceMap(source, prices);
  await fs.writeFile(API_FILE, updated, "utf8");
  console.log(`\nUpdated ${foundCount} prices in src/app/api.js`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
