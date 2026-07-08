import { AdminShell } from "@/components/AdminShell";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const [products, categories, banners] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.banner.count()
  ]);

  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold text-ink">後台概覽</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat label="商品總數" value={products} />
        <Stat label="分類數量" value={categories} />
        <Stat label="Banner 数量" value={banners} />
      </div>
      <section className="mt-8 rounded-lg border border-line bg-white p-5">
        <h2 className="text-lg font-semibold text-ink">使用提示</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          這裡維護的商品只會作為展示目錄出現。客人在商品詳情頁點擊「聯絡代購」後，會透過你設定的微信、LINE、WhatsApp 或 Email 諮詢。
        </p>
      </section>
    </AdminShell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-line bg-white p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-ink">{value}</p>
    </div>
  );
}
