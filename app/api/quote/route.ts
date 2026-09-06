import { del, put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { identifyProduct, identifyProductText, productSearchQuery } from "@/lib/quote-bot/gemini";
import { searchByImage, searchByText } from "@/lib/quote-bot/search";
import type { QuoteCandidate } from "@/lib/quote-bot/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const recentRequests = new Map<string, number[]>();
const generalMessages = /^(?:(?:你|您)?好(?:呀|啊)?|嗨|哈囉|hello|hi|謝謝|感謝|在嗎|有人嗎|請問|怎么了|怎麼了)[!！?？。\s]*$/i;

function limited(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (recentRequests.get(ip) ?? []).filter((time) => now - time < 10 * 60_000);
  recent.push(now);
  recentRequests.set(ip, recent);
  return recent.length > 8;
}

function mergeCandidates(...groups: QuoteCandidate[][]) {
  return groups.flat().sort((a, b) => b.score - a.score)
    .filter((item, index, all) => all.findIndex((candidate) => candidate.url === item.url) === index)
    .slice(0, 3);
}

export async function POST(request: Request) {
  if (limited(request)) return NextResponse.json({ error: "查詢次數過多，請稍後再試。" }, { status: 429 });

  const formData = await request.formData();
  const rawText = formData.get("text");
  const text = typeof rawText === "string" ? rawText.trim().slice(0, 180) : "";
  const rawImage = formData.get("image");
  const image = rawImage instanceof File && rawImage.size > 0 ? rawImage : null;

  if (!image && text.length < 2) return NextResponse.json({ error: "請上傳商品圖片，或輸入商品名稱與品牌。" }, { status: 400 });
  if (!image && generalMessages.test(text)) {
    return NextResponse.json({ status: "not-product", message: "這裡只處理商品查價。請輸入品牌、商品名稱或型號；其他問題請聯絡官方 LINE。" });
  }
  if (image && (!allowedTypes.has(image.type) || image.size > 8 * 1024 * 1024)) {
    return NextResponse.json({ error: "圖片僅支援 JPG、PNG、WEBP，且不可超過 8MB。" }, { status: 400 });
  }

  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  const serpKey = process.env.SERPAPI_API_KEY?.trim();
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN?.trim() || process.env.QUOTE_BLOB_READ_WRITE_TOKEN?.trim();
  if (!geminiKey || !serpKey) return NextResponse.json({ error: "報價服務尚未完成設定。" }, { status: 503 });

  let blobUrl: string | undefined;
  try {
    const model = process.env.GEMINI_MODEL?.trim() || "gemini-2.5-flash";
    let query = text || undefined;
    let identified;
    let imageCandidates: QuoteCandidate[] = [];

    if (image) {
      if (!blobToken) return NextResponse.json({ error: "圖片辨識服務尚未完成設定。" }, { status: 503 });
      const bytes = await image.arrayBuffer();
      identified = await identifyProduct(bytes, image.type, geminiKey, model);
      if (!identified.isProduct && identified.confidence >= 0.7) {
        return NextResponse.json({ status: "not-product", message: "這張圖片不像商品圖片。請改傳能清楚看到商品、品牌標誌或型號的照片。" });
      }
      query = productSearchQuery(identified, text);
      const blob = await put(`quote-temp/${crypto.randomUUID()}.${image.type.split("/")[1] || "jpg"}`, Buffer.from(bytes), {
        access: "public", contentType: image.type, token: blobToken,
      });
      blobUrl = blob.url;
      const rawMatches = await searchByImage(blob.url, undefined, serpKey);
      const refinedMatches = query ? await searchByImage(blob.url, query, serpKey) : [];
      imageCandidates = mergeCandidates(rawMatches, refinedMatches);
    } else {
      identified = await identifyProductText(text, geminiKey, model);
      if (!identified.isProduct && identified.confidence >= 0.6) {
        return NextResponse.json({ status: "not-product", message: "報價機器人只處理商品查價。請輸入品牌、商品名稱或型號。" });
      }
      query = productSearchQuery(identified, text);
    }

    const textCandidates = query ? await searchByText(query, serpKey) : [];
    const candidates = mergeCandidates(imageCandidates, textCandidates);
    if (!candidates.length) {
      return NextResponse.json({ status: "no-match", identified, message: "目前找不到可可靠確認的日本商品與價格。請補充品牌、完整商品名稱或型號，再試一次。" });
    }

    const auto = candidates[0].score >= Number(process.env.AUTO_QUOTE_MIN_SCORE ?? "0.82")
      && (!candidates[1] || candidates[0].score - candidates[1].score >= 0.08);
    return NextResponse.json({
      status: auto ? "quote" : "candidates",
      identified,
      candidates: auto ? candidates.slice(0, 1) : candidates,
    });
  } catch (error) {
    console.error("Website quote failed", error);
    return NextResponse.json({ error: "查價服務暫時無法使用，請稍後再試或聯絡官方 LINE。" }, { status: 500 });
  } finally {
    if (blobUrl && blobToken) await del(blobUrl, { token: blobToken }).catch(() => undefined);
  }
}
