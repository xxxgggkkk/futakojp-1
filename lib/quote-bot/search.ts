import { calculateTwd } from "./quote";
import type { QuoteCandidate } from "./types";

type Match = {
  title?: string;
  link?: string;
  source?: string;
  thumbnail?: string;
  price?: string | { value?: string; extracted_value?: number; currency?: string };
  extracted_price?: number;
  snippet?: string;
};

const DEFAULT_DOMAINS = [
  "junonline.jp", "usagi-online.com", "zozo.jp", "amazon.co.jp", "rakuten.co.jp",
  "cosme.com", "lohaco.yahoo.co.jp", "matsukiyococokara-online.com",
];

function hostname(url: string): string {
  try { return new URL(url).hostname.toLowerCase().replace(/^www\./, ""); } catch { return ""; }
}

function extractJpy(match: Match): number | null {
  if (typeof match.price === "object") {
    const currency = match.price.currency?.toUpperCase();
    const raw = match.price.extracted_value;
    if (typeof raw === "number" && raw > 0 && (!currency || currency === "JPY")) return raw;
  }
  if (typeof match.extracted_price === "number" && match.extracted_price > 0) return match.extracted_price;
  const price = typeof match.price === "string" ? match.price : match.price?.value ?? "";
  const text = `${price} ${match.snippet ?? ""}`;
  const found = text.match(/(?:[¥￥]\s?|JPY\s?)([0-9][0-9,.]*)|([0-9][0-9,.]*)\s?円/i);
  const numeric = Number((found?.[1] ?? found?.[2] ?? "").replace(/,/g, ""));
  return Number.isFinite(numeric) && numeric > 0 ? numeric : null;
}

function relevance(query: string | undefined, text: string): number {
  if (!query) return 0;
  const haystack = text.toLowerCase().replace(/\s+/g, "");
  const terms = query.toLowerCase().split(/\s+/)
    .map((term) => term.replace(/[^\p{L}\p{N}]/gu, ""))
    .filter((term) => term.length >= 2)
    .slice(0, 8);
  if (!terms.length) return 0;
  const matched = terms.filter((term) => haystack.includes(term)).length;
  return matched / Math.min(terms.length, 4);
}

function normalize(matches: Match[], suppliedText?: string): QuoteCandidate[] {
  const allowed = (process.env.ALLOWED_DOMAINS ?? DEFAULT_DOMAINS.join(","))
    .split(",").map((item) => item.trim().toLowerCase()).filter(Boolean);

  return matches.map((match): QuoteCandidate | null => {
    if (!match.title || !match.link) return null;
    const domain = hostname(match.link);
    const approvedDomain = allowed.some((item) => domain === item || domain.endsWith(`.${item}`));
    const japaneseDomain = domain.endsWith(".jp");
    const officialSignal = /(?:公式|official)/i.test(`${match.title} ${match.source ?? ""}`);
    const trusted = approvedDomain || japaneseDomain || officialSignal;
    const jpyPrice = extractJpy(match);
    if (!trusted || !jpyPrice) return null;
    const matchScore = relevance(suppliedText, `${match.title} ${match.source ?? ""}`);
    const trustScore = approvedDomain ? 0.16 : officialSignal ? 0.14 : 0.12;
    const score = Math.min(0.98, 0.54 + trustScore + matchScore * 0.26);
    return { title: match.title.trim(), url: match.link, domain, imageUrl: match.thumbnail, jpyPrice, twdPrice: calculateTwd(jpyPrice), score };
  }).filter((item): item is QuoteCandidate => item !== null)
    .sort((a, b) => b.score - a.score)
    .filter((candidate, index, all) => all.findIndex((item) => item.url === candidate.url) === index)
    .slice(0, 3);
}

async function serp(params: URLSearchParams, apiKey: string) {
  params.set("api_key", apiKey);
  const response = await fetch(`https://serpapi.com/search.json?${params}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Search failed: ${response.status}`);
  const json = await response.json() as Record<string, unknown> & { error?: string };
  if (json.error) throw new Error(`Search failed: ${json.error}`);
  return json;
}

export async function searchByImage(imageUrl: string, query: string | undefined, apiKey: string) {
  const params = new URLSearchParams({ engine: "google_lens", url: imageUrl, hl: "ja", country: "jp" });
  if (query) params.set("q", query);
  const json = await serp(params, apiKey) as { visual_matches?: Match[] };
  return normalize(json.visual_matches ?? [], query);
}

export async function searchByText(query: string, apiKey: string) {
  const params = new URLSearchParams({ engine: "google", q: `${query} 日本 公式通販 価格 円`, hl: "ja", gl: "jp", num: "10" });
  const json = await serp(params, apiKey) as { shopping_results?: Match[]; organic_results?: Match[] };
  return normalize([...(json.shopping_results ?? []), ...(json.organic_results ?? [])], query);
}
