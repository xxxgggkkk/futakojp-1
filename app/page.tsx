import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { SiteHeader } from "@/components/SiteHeader";
import { ContactPanel } from "@/components/ContactPanel";
import { fallbackImages } from "@/data/fallback";
import { getActiveProducts, getBanners, getCategories } from "@/lib/queries";

export default async function HomePage() {
  const [banners, latest, recommended, hot, categories] = await Promise.all([
    getBanners(),
    getActiveProducts({ take: 12 }),
    getActiveProducts({ recommended: true, take: 8 }),
    getActiveProducts({ hot: true, take: 8 }),
    getCategories()
  ]);
  const hero = banners[0];

  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:px-8">
            <Link href={hero?.linkUrl || "#latest"} className="relative min-h-[340px] overflow-hidden rounded-lg bg-neutral-100">
              <Image
                src={hero?.imageUrl || fallbackImages[0]}
                alt={hero?.title || "日本代购精选商品"}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 max-w-xl p-8 text-white">
                <p className="text-sm font-medium">日本现货与可预约商品</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-normal sm:text-5xl">{hero?.title || "GAO代购"}</h1>
                <p className="mt-4 text-sm leading-6 text-white/85">
                  {hero?.subtitle || "精选日本美妆、药妆、零食、数码与生活好物。仅展示目录，咨询后确认代购。"}
                </p>
              </div>
            </Link>
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

        <ProductSection id="recommended" title="推荐商品" subtitle="适合作为首次咨询的热门选择" products={recommended} />
        <ProductSection id="hot" title="热门商品" subtitle="近期浏览和咨询较多的日本好物" products={hot} muted />
        <ProductSection id="latest" title="最新商品" subtitle="后台新上架商品会优先显示在这里" products={latest} />
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
