import { notFound } from "next/navigation";
import { ContactPanel } from "@/components/ContactPanel";
import { ProductCard } from "@/components/ProductCard";
import { SiteHeader } from "@/components/SiteHeader";
import { getActiveProducts, getCategories } from "@/lib/queries";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const products = await getActiveProducts({ categorySlug: slug });

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-ink">{category.name}</h1>
        <p className="mt-2 text-sm text-muted">{category.description || "日本好物分類展示，可聯絡確認庫存和到貨週期。"}</p>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <ContactPanel />
    </>
  );
}
