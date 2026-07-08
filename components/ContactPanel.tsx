import { Mail, MessageCircle, Phone } from "lucide-react";
import { getSiteSetting } from "@/lib/queries";

export async function ContactPanel() {
  const setting = await getSiteSetting();

  return (
    <section className="border-t border-line bg-neutral-50">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_2fr] lg:px-8">
        <div>
          <h2 className="text-2xl font-semibold text-ink">联系代购</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            本站仅展示可咨询商品，不提供在线下单和支付。请通过微信、LINE 或邮箱确认价格、库存和到货周期。
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {setting.wechatId && (
            <a className="rounded-lg border border-line bg-white p-4 hover:border-ink" href={`weixin://`}>
              <MessageCircle className="mb-3 h-5 w-5 text-matcha" />
              <p className="text-sm font-semibold text-ink">微信</p>
              <p className="mt-1 break-all text-xs text-muted">{setting.wechatId}</p>
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
              <p className="text-sm font-semibold text-ink">邮箱</p>
              <p className="mt-1 break-all text-xs text-muted">{setting.email}</p>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
