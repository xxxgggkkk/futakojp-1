import Image from "next/image";
import { notFound } from "next/navigation";
import { ContactPanel } from "@/components/ContactPanel";
import { SiteHeader } from "@/components/SiteHeader";
import { fallbackImages } from "@/data/fallback";
import { formatTwd, stockLabel } from "@/lib/format";
import { productInclude } from "@/lib/queries";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug }, include: { category: true } });
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortIntro,
    openGraph: {
      title: product.name,
      description: product.shortIntro
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findFirst({
    where: { slug, status: "ACTIVE" },
    include: productInclude
  });
  if (!product) notFound();
  const images = product.images.length ? product.images : fallbackImages.map((url, index) => ({ id: String(index), url, alt: product.name, sortOrder: index, productId: product.id, createdAt: new Date() }));

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
              <Image src={images[0].url} alt={images[0].alt || product.name} fill priority className="object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {images.slice(0, 4).map((image) => (
                <div key={image.id} className="relative aspect-square overflow-hidden rounded-md bg-neutral-100">
                  <Image src={image.url} alt={image.alt || product.name} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
          <section className="lg:pt-4">
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-muted">{product.category.name}</span>
              <span className="rounded-full bg-matcha/10 px-3 py-1 text-matcha">{stockLabel(product.stockStatus)}</span>
            </div>
            <h1 className="mt-5 text-3xl font-semibold leading-tight text-ink">{product.name}</h1>
            <p className="mt-3 text-sm text-muted">{product.shortIntro}</p>
            <div className="mt-6 grid gap-3 rounded-lg border border-line bg-neutral-50 p-5 sm:grid-cols-2">
              <Info label="品牌" value={product.brand} />
              <Info label="台幣參考價格" value={formatTwd(product.priceJpy)} />
              <Info label="到貨週期" value={product.deliveryCycle} />
              <Info label="是否可代購" value={stockLabel(product.stockStatus)} />
            </div>
            <a
              href="#contact"
              className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-gold sm:w-auto"
            >
              聯絡代購
            </a>
            <div className="mt-8 space-y-6 text-sm leading-7 text-ink">
              <DetailBlock title="商品介紹" content={product.description} />
              <DetailBlock title="商品規格" content={product.specs} />
              {product.notes && <DetailBlock title="注意事項" content={product.notes} />}
            </div>
          </section>
        </div>
      </main>
      <div id="contact">
        <ContactPanel />
      </div>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-semibold text-ink">{value}</p>
    </div>
  );
}

function DetailBlock({ title, content }: { title: string; content: string }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      <p className="mt-2 whitespace-pre-line text-muted">{content}</p>
    </section>
  );
}
