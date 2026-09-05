import Link from "next/link";
import { Instagram, MessageCircle, ShoppingBag } from "lucide-react";
import { getSiteSetting } from "@/lib/queries";

export async function SiteHeader() {
  const setting = await getSiteSetting();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-ink text-white">
            <ShoppingBag className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold tracking-normal text-ink">{setting.siteName}</span>
        </Link>
        <nav className="flex items-center gap-2">
          <a
            href="https://lin.ee/zJWlulk"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-md border border-line px-3 text-sm text-ink hover:border-ink"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">官方 Line</span>
          </a>
          <a
            href="https://www.instagram.com/futako_japan"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-md border border-line px-3 text-sm text-ink hover:border-ink"
          >
            <Instagram className="h-4 w-4" />
            <span className="hidden sm:inline">IG</span>
          </a>
          <Link href="/admin" className="inline-flex h-10 items-center rounded-md border border-line px-3 text-sm text-ink hover:border-ink">
            後台
          </Link>
        </nav>
      </div>
    </header>
  );
}
