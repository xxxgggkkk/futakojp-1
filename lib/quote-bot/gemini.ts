import type { ProductClues } from "./types";

type GeminiResponse = {
  candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
};

const responseSchema = {
  type: "OBJECT",
  properties: {
    isProduct: { type: "BOOLEAN" },
    confidence: { type: "NUMBER" },
    brand: { type: "STRING" },
    productName: { type: "STRING" },
    category: { type: "STRING" },
    keywords: { type: "ARRAY", items: { type: "STRING" }, maxItems: 6 },
  },
  required: ["isProduct", "confidence", "brand", "productName", "category", "keywords"],
};

function clean(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const result = value.trim().slice(0, 120);
  return result || undefined;
}

function parseClues(text: string | undefined): ProductClues {
  if (!text) return { isProduct: true, confidence: 0, keywords: [] };

  try {
    const parsed = JSON.parse(text) as Record<string, unknown>;
    return {
      isProduct: parsed.isProduct !== false,
      confidence: typeof parsed.confidence === "number" ? Math.max(0, Math.min(1, parsed.confidence)) : 0,
      brand: clean(parsed.brand),
      productName: clean(parsed.productName),
      category: clean(parsed.category),
      keywords: Array.isArray(parsed.keywords)
        ? parsed.keywords.map(clean).filter((item): item is string => Boolean(item)).slice(0, 6)
        : [],
    };
  } catch {
    return { isProduct: true, confidence: 0, keywords: [] };
  }
}

async function askGemini(parts: Array<Record<string, unknown>>, apiKey: string, model: string) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema,
          temperature: 0.1,
        },
      }),
    },
  );

  if (!response.ok) throw new Error(`Gemini identification failed: ${response.status}`);
  const result = await response.json() as GeminiResponse;
  return parseClues(result.candidates?.[0]?.content?.parts?.find((part) => part.text)?.text);
}

export async function identifyProduct(
  image: ArrayBuffer,
  contentType: string,
  apiKey: string,
  model: string,
): Promise<ProductClues> {
  return askGemini([
    {
      text: "Judge whether this image primarily shows a retail product. Identify the exact product from visible text, logos, model numbers, color and design. Never invent a brand or model. Return isProduct, confidence (0-1), brand, productName, category, and up to 6 Japanese or English search keywords for finding the exact product in Japan.",
    },
    { inlineData: { mimeType: contentType, data: Buffer.from(image).toString("base64") } },
  ], apiKey, model);
}

export async function identifyProductText(text: string, apiKey: string, model: string): Promise<ProductClues> {
  return askGemini([{
    text: `Decide whether the following customer message is asking to identify, find, or price a specific retail product. Shipping, payment, greetings, customer service, and general questions are not product searches. Extract only details explicitly present and never invent a brand or model. Return isProduct, confidence (0-1), brand, productName, category, and up to 6 Japanese or English search keywords. Customer message: ${JSON.stringify(text)}`,
  }], apiKey, model);
}

export function productSearchQuery(clues: ProductClues, suppliedText?: string): string | undefined {
  const terms = [suppliedText, clues.brand, clues.productName, ...clues.keywords]
    .map(clean)
    .filter((item): item is string => Boolean(item));
  return [...new Set(terms.map((term) => term.toLowerCase()))].join(" ").slice(0, 240) || undefined;
}
