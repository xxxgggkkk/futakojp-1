import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { getSiteSetting } from "@/lib/queries";

export async function ContactPanel() {
  const setting = await getSiteSetting();
  const instagram = setting.wechatId?.trim();
  const instagramUrl = instagram
    ? instagram.startsWith("http")
      ? instagram
      : `https://www.instagram.com/${instagram.replace(/^@/, "")}`
    : "";

  return (
    <section className="border-t border-line bg-neutral-50">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_2fr] lg:px-8">
        <div>
          <h2 className="text-2xl font-semibold text-ink">聯絡代購</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            本站僅展示可諮詢商品，不提供線上下單和付款。請透過 Instagram、LINE 或 Email 確認價格、庫存和到貨週期。
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {instagram && (
            <a className="rounded-lg border border-line bg-white p-4 hover:border-ink" href={instagramUrl} target="_blank" rel="noreferrer">
              <Instagram className="mb-3 h-5 w-5 text-matcha" />
              <p className="text-sm font-semibold text-ink">Instagram</p>
              <p className="mt-1 break-all text-xs text-muted">{instagram}</p>
            </a>
          )}
          {setting.lineId && (
            <a className="rounded-lg border border-line bg-white p-4 hover:border-ink" href={`https://line.me/R/ti/p/${setting.lineId}`}>
              <MessageCircle className="mb-3 h-5 w-5 text-matcha" />
              <p className="text-sm font-semibold text-ink">LINE</p>
              <p className="mt-1 break-all text-xs text-muted">{setting.lineId}</p>
            </a>
          )}
          {setting.whatsapp && (
            <a className="rounded-lg border border-line bg-white p-4 hover:border-ink" href={`https://wa.me/${setting.whatsapp}`}>
              <Phone className="mb-3 h-5 w-5 text-matcha" />
              <p className="text-sm font-semibold text-ink">WhatsApp</p>
              <p className="mt-1 break-all text-xs text-muted">{setting.whatsapp}</p>
            </a>
          )}
          {setting.email && (
            <a className="rounded-lg border border-line bg-white p-4 hover:border-ink" href={`mailto:${setting.email}`}>
              <Mail className="mb-3 h-5 w-5 text-matcha" />
              <p className="text-sm font-semibold text-ink">Email</p>
              <p className="mt-1 break-all text-xs text-muted">{setting.email}</p>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
