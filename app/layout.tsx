import type { Metadata } from "next";
import "./globals.css";
import { getSiteSetting } from "@/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await getSiteSetting();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    title: {
      default: setting.metaTitle,
      template: `%s｜${setting.siteName}`
    },
    description: setting.metaDescription,
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: setting.metaTitle,
      description: setting.metaDescription,
      type: "website",
      locale: "zh_CN",
      siteName: setting.siteName
    }
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
