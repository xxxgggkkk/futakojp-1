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
      <h1 className="text-2xl font-semibold text-ink">后台概览</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat label="商品总数" value={products} />
        <Stat label="分类数量" value={categories} />
        <Stat label="Banner 数量" value={banners} />
      </div>
      <section className="mt-8 rounded-lg border border-line bg-white p-5">
        <h2 className="text-lg font-semibold text-ink">使用提示</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          这里维护的商品只会作为展示目录出现。客户在商品详情页点击“联系代购”后，通过你设置的微信、LINE、WhatsApp 或邮箱咨询。
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
