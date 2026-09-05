import type React from "react";
import {
  AlertTriangle,
  ArrowRight,
  Clock3,
  Instagram,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { lineProductPosts } from "@/data/line-products";

const lineCommunityUrl = "https://tinyurl.com/ndcfxdcw";
const lineOfficialUrl = "https://lin.ee/zJWlulk";
const instagramUrl = "https://www.instagram.com/futako_japan";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-[#fbf7f1]">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-12">
            <div className="flex flex-col rounded-lg border border-[#ead8c4] bg-white p-6 shadow-soft sm:p-8">
              <div>
                <div className="mb-8 flex items-center gap-3 text-sm font-semibold text-[#8c6f59]">
                  <Sparkles className="h-4 w-4" />
                  LINE 社群公告 / 私訊下單 / 日本代購
                </div>
                <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-ink sm:text-5xl lg:text-6xl">
                  雙子日本代購
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">
                  商品公告、收單時間、現貨與預購資訊以 LINE 社群貼文為主。想下單或詢問款式，請透過官方 Line 或 IG 私訊確認。
                </p>
              </div>

              <div className="mt-8 rounded-lg border border-[#ead8c4] bg-[#fffaf4] p-5">
                <p className="text-sm font-semibold text-[#8c6f59]">社群公告重點</p>
                <div className="mt-4 grid gap-3 text-sm leading-7 text-muted sm:grid-cols-2">
                  <p>現貨商品可快速出貨，數量有限，先搶先贏。</p>
                  <p>預購商品、熱門款式與熱門尺寸可能很快缺貨。</p>
                  <p>若想趕上出貨日，建議提早詢問及下單。</p>
                  <p>官方 Line 無法加入時，請私訊 IG 或搜尋 ID。</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <ContactLink
                  href={lineCommunityUrl}
                  icon={<MessageCircle className="mb-5 h-6 w-6" />}
                  title="加入 LINE 社群"
                  text="商品公告與收單資訊"
                  dark
                />
                <ContactLink
                  href={lineOfficialUrl}
                  icon={<ShoppingBag className="mb-5 h-6 w-6 text-[#8c6f59]" />}
                  title="私訊官方號"
                  text="@199fewmc"
                />
                <ContactLink
                  href={instagramUrl}
                  icon={<Instagram className="mb-5 h-6 w-6 text-[#a96a66]" />}
                  title="Instagram"
                  text="futako_japan"
                  rose
                />
              </div>
            </div>

            <div className="grid gap-4">
              <InfoPanel
                icon={<ShoppingBag className="h-6 w-6" />}
                title="下單流程"
                lines={[
                  "請私訊想購買的商品名稱、品牌、連結或圖片。",
                  "會先核對尺寸、款式、色號、數量等資訊。",
                  "確認無誤後登記採買，付款後請截圖保留交易記錄。"
                ]}
              />
              <InfoPanel
                icon={<PackageCheck className="h-6 w-6" />}
                title="付款與寄送"
                lines={[
                  "需先完成訂金或預付款匯款，才會安排採買。",
                  "餘款使用賣貨便貨到付款，賣貨便運費 NT$38。",
                  "商品價格若標示含國際運費，會以該貼文為準。"
                ]}
              />
              <InfoPanel
                icon={<Clock3 className="h-6 w-6" />}
                title="收單與出貨"
                lines={[
                  "每次收單時間以 LINE 社群內商品公告為準。",
                  "預購、限定、熱門尺寸與熱門款式可能很快缺貨。",
                  "日本寄出後，海關未查驗時約 3-5 天抵台並安排出貨。"
                ]}
              />
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
            <NoticeCard
              icon={<ShieldCheck className="h-6 w-6" />}
              title="下單前提醒"
              lines={[
                "訂單成立後，非賣家原因不可取消或退換貨。",
                "因買家個人原因取消，訂金不予退還。",
                "未取貨者訂金不退，請確認收貨意願再下單。"
              ]}
            />
            <NoticeCard
              icon={<AlertTriangle className="h-6 w-6" />}
              title="缺貨與責任"
              lines={[
                "若商品缺貨，會依實際情況協助退款。",
                "匯款或平台手續費需由買家承擔。",
                "代購僅提供代採服務，請先確認尺寸、色差、材質等商品資訊。"
              ]}
            />
            <NoticeCard
              icon={<MessageCircle className="h-6 w-6" />}
              title="不接品項"
              lines={[
                "菸酒類、電子煙與酒類不接。",
                "奢侈品或高端精品不接。",
                "違禁品、管制物品或需特殊資質的商品不接。"
              ]}
            />
          </div>
        </section>

        <section className="bg-[#fbf7f1]">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#8c6f59]">LINE 社群商品消息</p>
                <h2 className="mt-2 text-3xl font-semibold text-ink">社群已公告商品</h2>
              </div>
              <a
                href={lineCommunityUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#8c6f59] hover:text-ink"
              >
                查看 LINE 社群
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {lineProductPosts.map((post) => (
                <article key={post.id} className="flex min-h-[300px] flex-col rounded-lg border border-[#ead8c4] bg-white p-5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full bg-[#fff4e8] px-3 py-1 text-xs font-semibold text-[#8c6f59]">
                      {post.status}
                    </span>
                    <span className="text-xs text-muted">{post.date}</span>
                  </div>
                  <h3 className="mt-4 line-clamp-2 text-xl font-semibold leading-7 text-ink">{post.title}</h3>
                  {post.price ? <p className="mt-3 text-lg font-semibold text-[#8c6f59]">{post.price}</p> : null}
                  <p className="mt-4 line-clamp-6 flex-1 text-sm leading-7 text-muted">{post.body}</p>
                  <a
                    href={lineOfficialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-ink px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#6f533f]"
                  >
                    私訊詢問
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function ContactLink({
  href,
  icon,
  title,
  text,
  dark = false,
  rose = false
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  text: string;
  dark?: boolean;
  rose?: boolean;
}) {
  const className = dark
    ? "group rounded-lg bg-ink p-5 text-white transition hover:bg-[#6f533f]"
    : rose
      ? "group rounded-lg border border-[#ead1d2] bg-[#fff6f4] p-5 text-ink transition hover:border-[#a96a66]"
      : "group rounded-lg border border-[#e5d4c1] bg-[#fff8ef] p-5 text-ink transition hover:border-[#8c6f59]";

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {icon}
      <p className="text-lg font-semibold">{title}</p>
      <p className={dark ? "mt-2 text-sm leading-6 text-white/72" : "mt-2 text-sm leading-6 text-muted"}>{text}</p>
      <ArrowRight
        className={
          dark
            ? "mt-5 h-5 w-5 transition group-hover:translate-x-1"
            : rose
              ? "mt-5 h-5 w-5 text-[#a96a66] transition group-hover:translate-x-1"
              : "mt-5 h-5 w-5 text-[#8c6f59] transition group-hover:translate-x-1"
        }
      />
    </a>
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

function NoticeCard({
  icon,
  title,
  lines
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}) {
  return (
    <div className="rounded-lg border border-line bg-neutral-50 p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-lg bg-white text-[#8c6f59]">{icon}</span>
        <h2 className="text-xl font-semibold text-ink">{title}</h2>
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
