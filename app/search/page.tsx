import { ContactPanel } from "@/components/ContactPanel";
import { ProductCard } from "@/components/ProductCard";
import { SearchBox } from "@/components/SearchBox";
import { SiteHeader } from "@/components/SiteHeader";
import { getActiveProducts } from "@/lib/queries";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const products = await getActiveProducts({ query: q });

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold text-ink">搜尋商品</h1>
          <p className="mt-2 text-sm text-muted">可按商品名稱、品牌、分類搜尋。</p>
          <div className="mt-5">
            <SearchBox defaultValue={q} />
          </div>
        </div>
        <p className="mt-8 text-sm text-muted">{q ? `「${q}」找到 ${products.length} 件商品` : `全部商品 ${products.length} 件`}</p>
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <ContactPanel />
    </>
  );
}
