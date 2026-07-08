import Image from "next/image";
import Link from "next/link";
import { deleteProductAction, toggleProductStatusAction } from "@/app/admin/actions";
import { AdminShell } from "@/components/AdminShell";
import { fallbackImages } from "@/data/fallback";
import { formatTwd, statusLabel, stockLabel } from "@/lib/format";
import { productInclude } from "@/lib/queries";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({ include: productInclude, orderBy: { createdAt: "desc" } });

  return (
    <AdminShell>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-ink">商品管理</h1>
        <Link href="/admin/products/new" className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-gold">新增商品</Link>
      </div>
      <div className="mt-6 overflow-hidden rounded-lg border border-line bg-white">
        {products.map((product) => (
          <div key={product.id} className="grid gap-4 border-b border-line p-4 last:border-0 md:grid-cols-[80px_1fr_auto]">
            <div className="relative h-20 w-20 overflow-hidden rounded-md bg-neutral-100">
              <Image src={product.images[0]?.url || fallbackImages[0]} alt={product.name} fill className="object-cover" />
            </div>
            <div>
              <h2 className="font-semibold text-ink">{product.name}</h2>
              <p className="mt-1 text-sm text-muted">{product.brand} / {product.category.name} / {formatTwd(product.priceJpy)}</p>
              <p className="mt-2 text-xs text-muted">{statusLabel(product.status)} · {stockLabel(product.stockStatus)}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link href={`/admin/products/${product.id}/edit`} className="rounded-md border border-line px-3 py-2 text-sm text-ink hover:border-ink">編輯</Link>
              <form action={toggleProductStatusAction}>
                <input type="hidden" name="id" value={product.id} />
                <input type="hidden" name="status" value={product.status} />
                <button className="rounded-md border border-line px-3 py-2 text-sm text-ink hover:border-ink">{product.status === "ACTIVE" ? "下架" : "上架"}</button>
              </form>
              <form action={deleteProductAction}>
                <input type="hidden" name="id" value={product.id} />
                <button className="rounded-md border border-red-200 px-3 py-2 text-sm text-red-600 hover:border-red-500">刪除</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
