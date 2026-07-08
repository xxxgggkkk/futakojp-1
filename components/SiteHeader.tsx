import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { getCategories, getSiteSetting } from "@/lib/queries";
import { SearchBox } from "@/components/SearchBox";

export async function SiteHeader() {
  const [setting, categories] = await Promise.all([getSiteSetting(), getCategories()]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-ink text-white">
              <ShoppingBag className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold tracking-normal text-ink">{setting.siteName}</span>
          </Link>
          <div className="hidden flex-1 md:block">
            <SearchBox />
          </div>
          <Link href="/admin" className="rounded-md border border-line px-3 py-2 text-sm text-ink hover:border-ink">
            管理后台
          </Link>
        </div>
        <div className="md:hidden">
          <SearchBox />
        </div>
        <nav className="flex gap-2 overflow-x-auto pb-1 text-sm">
          <Link href="/" className="whitespace-nowrap rounded-full bg-ink px-4 py-2 text-white">
            全部
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="whitespace-nowrap rounded-full bg-neutral-100 px-4 py-2 text-ink hover:bg-neutral-200"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
