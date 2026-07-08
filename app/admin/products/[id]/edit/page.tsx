import { notFound } from "next/navigation";
import { AdminShell } from "@/components/AdminShell";
import { ProductForm } from "@/components/ProductForm";
import { prisma } from "@/lib/prisma";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id }, include: { images: { orderBy: { sortOrder: "asc" } } } }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } })
  ]);
  if (!product) notFound();
  return (
    <AdminShell>
      <h1 className="mb-6 text-2xl font-semibold text-ink">編輯商品</h1>
      <ProductForm product={product} categories={categories} />
    </AdminShell>
  );
}
