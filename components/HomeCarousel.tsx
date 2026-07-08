"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type HomeBanner = {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  linkUrl: string | null;
};

const fallbackBanner: HomeBanner = {
  id: "fallback-home-order-guide",
  title: "雙子日本代購",
  subtitle: "私訊確認商品後安排登記採買，訂金與餘額流程清楚透明。",
  imageUrl: "/images/home-order-guide.jpg",
  linkUrl: "/search"
};

export function HomeCarousel({ banners }: { banners: HomeBanner[] }) {
  const slides = banners.length ? banners : [fallbackBanner];
  const [active, setActive] = useState(0);
  const current = slides[active];

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  function goTo(index: number) {
    setActive((index + slides.length) % slides.length);
  }

  return (
    <div className="relative min-h-[340px] overflow-hidden rounded-lg bg-neutral-100">
      {slides.map((slide, index) => (
        <Link
          key={slide.id}
          href={slide.linkUrl || "/search"}
          className={`absolute inset-0 transition-opacity duration-700 ${index === active ? "opacity-100" : "pointer-events-none opacity-0"}`}
          aria-hidden={index !== active}
        >
          <Image
            src={slide.imageUrl}
            alt={slide.title || "雙子日本代購"}
            fill
            priority={index === 0}
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover"
          />
        </Link>
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 max-w-xl p-8 text-white">
        <p className="text-sm font-medium">日本現貨與可預約商品</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-normal sm:text-5xl">{current.title}</h1>
        <p className="mt-4 text-sm leading-6 text-white/85">
          {current.subtitle || "精選日本美妝、藥妝、零食、3C 與生活好物。僅展示目錄，諮詢後確認代購。"}
        </p>
      </div>
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-soft transition hover:bg-white"
            aria-label="上一張"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-soft transition hover:bg-white"
            aria-label="下一張"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-4 right-5 flex gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(index)}
                className={`h-2.5 rounded-full transition-all ${index === active ? "w-8 bg-white" : "w-2.5 bg-white/60 hover:bg-white"}`}
                aria-label={`切換到第 ${index + 1} 張`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
