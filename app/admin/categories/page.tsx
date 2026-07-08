import { deleteCategoryAction, saveCategoryAction } from "@/app/admin/actions";
import { AdminShell } from "@/components/AdminShell";
import { prisma } from "@/lib/prisma";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: { _count: { select: { products: true } } }
  });

  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold text-ink">分類管理</h1>
      <section className="mt-6 rounded-lg border border-line bg-white p-5">
        <h2 className="text-lg font-semibold text-ink">新增分類</h2>
        <CategoryForm />
      </section>
      <div className="mt-6 space-y-3">
        {categories.map((category) => (
          <section key={category.id} className="rounded-lg border border-line bg-white p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-semibold text-ink">{category.name}</h2>
                <p className="text-sm text-muted">{category._count.products} 件商品</p>
              </div>
              <form action={deleteCategoryAction}>
                <input type="hidden" name="id" value={category.id} />
                <button className="rounded-md border border-red-200 px-3 py-2 text-sm text-red-600 hover:border-red-500">刪除</button>
              </form>
            </div>
            <CategoryForm category={category} />
          </section>
        ))}
      </div>
    </AdminShell>
  );
}

function CategoryForm({ category }: { category?: { id: string; name: string; slug: string; description: string | null; sortOrder: number } }) {
  return (
    <form action={saveCategoryAction} className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr_120px_auto]">
      <input type="hidden" name="id" value={category?.id || ""} />
      <input name="name" defaultValue={category?.name} placeholder="分類名稱" required className="h-10 rounded-md border border-line px-3 outline-none focus:border-ink" />
      <input name="slug" defaultValue={category?.slug} placeholder="slug" className="h-10 rounded-md border border-line px-3 outline-none focus:border-ink" />
      <input name="sortOrder" type="number" defaultValue={category?.sortOrder || 0} placeholder="排序" className="h-10 rounded-md border border-line px-3 outline-none focus:border-ink" />
      <button className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-gold">儲存</button>
      <input name="description" defaultValue={category?.description || ""} placeholder="分類描述" className="h-10 rounded-md border border-line px-3 outline-none focus:border-ink md:col-span-4" />
    </form>
  );
}
