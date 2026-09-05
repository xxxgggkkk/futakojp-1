import Link from "next/link";
import type React from "react";
import { ArrowRight, Clock3, Instagram, MessageCircle, ShoppingBag, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { SiteHeader } from "@/components/SiteHeader";
import { ContactPanel } from "@/components/ContactPanel";
import { getActiveProducts, getCategories } from "@/lib/queries";

const lineCommunityUrl = "https://tinyurl.com/ndcfxdcw";
const lineOfficialUrl = "https://lin.ee/zJWlulk";
const instagramUrl = "https://www.instagram.com/futako_japan";

export default async function HomePage() {
  const [latest, recommended, hot, categories] = await Promise.all([
    getActiveProducts({ take: 12 }),
    getActiveProducts({ recommended: true, take: 8 }),
    getActiveProducts({ hot: true, take: 8 }),
    getCategories()
  ]);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-[#fbf7f1]">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-12">
            <div className="flex min-h-[520px] flex-col justify-between rounded-lg border border-[#ead8c4] bg-white p-6 shadow-soft sm:p-8">
              <div>
                <div className="mb-8 flex items-center gap-3 text-sm font-semibold text-[#8c6f59]">
                  <Sparkles className="h-4 w-4" />
                  日本連線 / 預購 / 現貨公告以 LINE 社群為主
                </div>
                <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-ink sm:text-5xl lg:text-6xl">
                  雙子日本代購
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">
                  最新商品、收單時間與連線公告都會優先發布在 LINE 社群。網站保留代購流程、出貨說明與精選商品，方便新客快速了解。
                </p>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                <a
                  href={lineCommunityUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-lg bg-ink p-5 text-white transition hover:bg-[#6f533f]"
                >
                  <MessageCircle className="mb-5 h-6 w-6" />
                  <p className="text-lg font-semibold">加入 LINE 社群</p>
                  <p className="mt-2 text-sm leading-6 text-white/72">新品公告與收單資訊</p>
                  <ArrowRight className="mt-5 h-5 w-5 transition group-hover:translate-x-1" />
                </a>
                <a
                  href={lineOfficialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-lg border border-[#e5d4c1] bg-[#fff8ef] p-5 text-ink transition hover:border-[#8c6f59]"
                >
                  <ShoppingBag className="mb-5 h-6 w-6 text-[#8c6f59]" />
                  <p className="text-lg font-semibold">私訊官方號</p>
                  <p className="mt-2 text-sm leading-6 text-muted">詢問商品與下單</p>
                  <ArrowRight className="mt-5 h-5 w-5 text-[#8c6f59] transition group-hover:translate-x-1" />
                </a>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-lg border border-[#ead1d2] bg-[#fff6f4] p-5 text-ink transition hover:border-[#a96a66]"
                >
                  <Instagram className="mb-5 h-6 w-6 text-[#a96a66]" />
                  <p className="text-lg font-semibold">Instagram</p>
                  <p className="mt-2 text-sm leading-6 text-muted">商品照片與日常分享</p>
                  <ArrowRight className="mt-5 h-5 w-5 text-[#a96a66] transition group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="grid gap-4">
              <InfoPanel
                icon={<ShoppingBag className="h-6 w-6" />}
                title="代購流程"
                lines={[
                  "私訊商品連結或圖片，確認尺寸、款式、色號與數量。",
                  "商品價格皆包含國際運費，滿 NT$2000 免賣貨便運費 38。",
                  "確認後支付 50% 訂金，收到訂金後安排登記採買。"
                ]}
              />
              <InfoPanel
                icon={<Clock3 className="h-6 w-6" />}
                title="出貨時間"
                lines={[
                  "日本端每月約 2 次寄出，確切時間會另行通知。",
                  "貨物抵台後通常 2～3 天內安排賣貨便寄出。",
                  "預購、限定、缺貨商品會依實際到貨狀況調整。"
                ]}
              />
              <div className="rounded-lg border border-[#ead8c4] bg-white p-6">
                <p className="text-sm font-semibold text-[#8c6f59]">商品分類</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {categories.slice(0, 8).map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.slug}`}
                      className="rounded-full border border-line px-4 py-2 text-sm text-ink hover:border-[#8c6f59] hover:bg-[#fff8ef]"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProductSection id="recommended" title="精選商品" subtitle="網站商品作為參考展示，最新收單請以 LINE 社群公告為準" products={recommended} />
        <ProductSection id="hot" title="熱門諮詢" subtitle="近期較多人詢問的日本好物" products={hot} muted />
        <ProductSection id="latest" title="商品目錄" subtitle="可先瀏覽參考，實際庫存與價格請私訊確認" products={latest} />
      </main>
      <ContactPanel />
    </>
  );
}

function InfoPanel({
  icon,
  title,
  lines
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}) {
  return (
    <div className="rounded-lg border border-[#ead8c4] bg-white p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-lg bg-[#fff4e8] text-[#8c6f59]">{icon}</span>
        <h2 className="text-2xl font-semibold text-ink">{title}</h2>
      </div>
      <ul className="mt-5 space-y-3 text-sm leading-7 text-muted">
        {lines.map((line) => (
          <li key={line} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b98b43]" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductSection({
  id,
  title,
  subtitle,
  products,
  muted = false
}: {
  id: string;
  title: string;
  subtitle: string;
  products: Awaited<ReturnType<typeof getActiveProducts>>;
  muted?: boolean;
}) {
  if (products.length === 0) return null;

  return (
    <section id={id} className={muted ? "bg-neutral-50" : "bg-white"}>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-ink">{title}</h2>
            <p className="mt-1 text-sm text-muted">{subtitle}</p>
          </div>
          <Link href="/search" className="text-sm font-medium text-gold hover:text-ink">
            查看全部
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
