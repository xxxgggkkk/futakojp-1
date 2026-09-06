"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, ImagePlus, LoaderCircle, MessageCircle, Send, X } from "lucide-react";
import { usePathname } from "next/navigation";
import type { QuoteCandidate } from "@/lib/quote-bot/types";

type BotResponse = {
  status?: "quote" | "candidates" | "no-match" | "not-product";
  message?: string;
  error?: string;
  identified?: { brand?: string; productName?: string };
  candidates?: QuoteCandidate[];
};

export function QuoteBot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BotResponse>();
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!image) { setPreview(undefined); return; }
    const url = URL.createObjectURL(image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!image && text.trim().length < 2) return;
    setLoading(true);
    setResult(undefined);
    try {
      const body = new FormData();
      body.set("text", text);
      if (image) body.set("image", image);
      const response = await fetch("/api/quote", { method: "POST", body });
      const data = await response.json() as BotResponse;
      setResult(data);
    } catch {
      setResult({ error: "網路連線失敗，請稍後再試。" });
    } finally {
      setLoading(false);
    }
  }

  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-5 right-4 z-50 sm:bottom-6 sm:right-6">
      {open && (
        <section className="mb-3 flex h-[min(650px,calc(100vh-110px))] w-[calc(100vw-32px)] max-w-[390px] flex-col overflow-hidden rounded-lg border border-line bg-white shadow-2xl" aria-label="自動報價機器人">
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-ink text-white"><Bot className="h-5 w-5" /></span>
              <div><h2 className="font-semibold text-ink">自動報價機器人</h2><p className="text-xs text-gray-500">商品辨識與日本價格查詢</p></div>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-md hover:bg-gray-100" aria-label="關閉"><X className="h-5 w-5" /></button>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto bg-[#faf9f7] p-4">
            <div className="max-w-[88%] rounded-md bg-white p-3 text-sm leading-6 shadow-sm">
              請傳商品圖片，並可補充品牌、商品名稱或型號；也可以直接輸入文字查價。
            </div>
            {preview && <div className="ml-auto max-w-[78%] overflow-hidden rounded-md bg-white p-2 shadow-sm"><img src={preview} alt="待查詢商品" className="max-h-52 w-full rounded object-contain" /></div>}
            {loading && <div className="flex max-w-[88%] items-center gap-2 rounded-md bg-white p-3 text-sm shadow-sm"><LoaderCircle className="h-4 w-4 animate-spin" />正在辨識並搜尋日本商品...</div>}
            {result && <ResultBubble result={result} />}
          </div>

          <form onSubmit={submit} className="shrink-0 border-t border-line bg-white p-3">
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(event) => setImage(event.target.files?.[0] ?? null)} />
            <div className="flex items-end gap-2">
              <button type="button" onClick={() => fileRef.current?.click()} className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-line hover:border-ink" aria-label="上傳商品圖片"><ImagePlus className="h-5 w-5" /></button>
              <textarea value={text} onChange={(event) => setText(event.target.value)} rows={2} maxLength={180} placeholder="品牌、商品名稱或型號" className="min-h-10 flex-1 resize-none rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-ink" />
              <button disabled={loading || (!image && text.trim().length < 2)} className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-ink text-white disabled:cursor-not-allowed disabled:opacity-40" aria-label="送出查價"><Send className="h-4 w-4" /></button>
            </div>
            {image && <button type="button" onClick={() => setImage(null)} className="mt-2 text-xs text-gray-500 hover:text-ink">移除已選圖片：{image.name}</button>}
          </form>
        </section>
      )}
      <button type="button" onClick={() => setOpen((value) => !value)} className="ml-auto flex h-14 items-center gap-2 rounded-full bg-ink px-5 font-medium text-white shadow-xl hover:bg-black" aria-expanded={open}>
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        <span>{open ? "關閉" : "自動報價"}</span>
      </button>
    </div>
  );
}

function ResultBubble({ result }: { result: BotResponse }) {
  if (result.error || result.message) {
    return <div className="max-w-[92%] rounded-md bg-white p-3 text-sm leading-6 shadow-sm">{result.error || result.message}</div>;
  }
  const candidates = result.candidates ?? [];
  return (
    <div className="max-w-[96%] rounded-md bg-white p-3 text-sm shadow-sm">
      <p className="mb-1 font-medium text-ink">
        {result.status === "quote" ? "已找到最可能的商品" : "請確認最接近的商品"}
      </p>
      {result.identified?.productName && <p className="mb-3 text-xs leading-5 text-gray-500">辨識：{[result.identified.brand, result.identified.productName].filter(Boolean).join(" ")}</p>}
      <div className="space-y-3">
        {candidates.map((candidate) => (
          <a key={candidate.url} href={candidate.url} target="_blank" rel="noreferrer" className="block rounded-md border border-line p-3 hover:border-ink">
            <div className="flex gap-3">
              {candidate.imageUrl && <img src={candidate.imageUrl} alt="" className="h-20 w-16 shrink-0 rounded object-contain" />}
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 font-medium leading-5 text-ink">{candidate.title}</p>
                <p className="mt-2 text-xs text-gray-500">日本售價 ¥{Math.round(candidate.jpyPrice).toLocaleString("ja-JP")}</p>
                <p className="mt-1 text-base font-semibold text-[#b45f4d]">代購報價 NT${candidate.twdPrice.toLocaleString("zh-TW")}</p>
                <p className="mt-1 truncate text-xs text-gray-400">{candidate.domain}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-gray-500">報價依目前頁面售價計算，實際庫存與價格請以下單確認為準。</p>
    </div>
  );
}
