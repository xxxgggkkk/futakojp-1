import { AdminShell } from "@/components/AdminShell";
import { ProductForm } from "@/components/ProductForm";
import { prisma } from "@/lib/prisma";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <AdminShell>
      <h1 className="mb-6 text-2xl font-semibold text-ink">新增商品</h1>
      <ProductForm categories={categories} />
    </AdminShell>
  );
}
