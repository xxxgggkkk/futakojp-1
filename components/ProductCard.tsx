import Image from "next/image";
import Link from "next/link";
import { Product, Category, Image as ProductImage } from "@prisma/client";
import { formatJpy, stockLabel } from "@/lib/format";
import { fallbackImages } from "@/data/fallback";

type ProductWithRelations = Product & {
  category: Category;
  images: ProductImage[];
};

export function ProductCard({ product }: { product: ProductWithRelations }) {
  const image = product.images[0]?.url || fallbackImages[0];

  return (
    <article className="group overflow-hidden rounded-lg border border-line bg-white transition hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
          <Image
            src={image}
            alt={product.images[0]?.alt || product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-2 text-xs text-muted">
          <span className="rounded-full bg-neutral-100 px-2 py-1">{product.category.name}</span>
          <span className={product.stockStatus === "UNAVAILABLE" ? "text-muted" : "text-matcha"}>
            {stockLabel(product.stockStatus)}
          </span>
        </div>
        <div>
          <Link href={`/products/${product.slug}`} className="line-clamp-2 text-sm font-semibold text-ink hover:text-gold">
            {product.name}
          </Link>
          <p className="mt-1 line-clamp-1 text-xs text-muted">{product.brand}</p>
        </div>
        <div className="flex items-center justify-between">
          <strong className="text-base text-ink">{formatJpy(product.priceJpy)}</strong>
          <Link
            href={`/products/${product.slug}`}
            className="rounded-md bg-ink px-3 py-2 text-xs font-medium text-white transition hover:bg-gold"
          >
            查看详情
          </Link>
        </div>
      </div>
    </article>
  );
}
