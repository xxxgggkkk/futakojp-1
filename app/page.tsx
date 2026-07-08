import Link from "next/link";
import { HomeCarousel } from "@/components/HomeCarousel";
import { ProductCard } from "@/components/ProductCard";
import { SiteHeader } from "@/components/SiteHeader";
import { ContactPanel } from "@/components/ContactPanel";
import { getActiveProducts, getBanners, getCategories } from "@/lib/queries";

export default async function HomePage() {
  const [banners, latest, recommended, hot, categories] = await Promise.all([
    getBanners(),
    getActiveProducts({ take: 12 }),
    getActiveProducts({ recommended: true, take: 8 }),
    getActiveProducts({ hot: true, take: 8 }),
    getCategories()
  ]);
  const carouselBanners = banners.map((banner) => ({
    id: banner.id,
    title: banner.title,
    subtitle: banner.subtitle,
    imageUrl: banner.imageUrl,
    linkUrl: banner.linkUrl
  }));

  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:px-8">
            <HomeCarousel banners={carouselBanners} />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {categories.slice(0, 4).map((category, index) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="flex items-center justify-between rounded-lg border border-line bg-neutral-50 p-5 hover:border-ink"
                >
                  <div>
                    <p className="text-lg font-semibold text-ink">{category.name}</p>
                    <p className="mt-1 text-sm text-muted">{category._count.products} 件商品</p>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-sm font-semibold text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ProductSection id="recommended" title="推薦商品" subtitle="適合作為首次諮詢的熱門選擇" products={recommended} />
        <ProductSection id="hot" title="熱門商品" subtitle="近期瀏覽和諮詢較多的日本好物" products={hot} muted />
        <ProductSection id="latest" title="最新商品" subtitle="後台新上架商品會優先顯示在這裡" products={latest} />
      </main>
      <ContactPanel />
    </>
  );
}

function ProductSection({
  id,
  title,
  subtitle,
  products,
  muted = false
}: {
  id: string;
  title: string;
  subtitle: string;
  products: Awaited<ReturnType<typeof getActiveProducts>>;
  muted?: boolean;
}) {
  if (products.length === 0) return null;

  return (
    <section id={id} className={muted ? "bg-neutral-50" : "bg-white"}>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-ink">{title}</h2>
            <p className="mt-1 text-sm text-muted">{subtitle}</p>
          </div>
          <Link href="/search" className="text-sm font-medium text-gold hover:text-ink">
            查看全部
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
