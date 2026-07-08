import Link from "next/link";
import { Box, ImageIcon, LayoutDashboard, LogOut, Settings, Tags } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";

const nav = [
  { href: "/admin", label: "概覽", icon: LayoutDashboard },
  { href: "/admin/products", label: "商品管理", icon: Box },
  { href: "/admin/categories", label: "分類管理", icon: Tags },
  { href: "/admin/banners", label: "首页 Banner", icon: ImageIcon },
  { href: "/admin/settings", label: "網站設定", icon: Settings }
];

export async function AdminShell({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  return (
    <div className="min-h-screen bg-neutral-50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-line bg-white p-5 lg:block">
        <Link href="/" className="text-xl font-semibold text-ink">GAO代購後台</Link>
        <nav className="mt-8 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-ink hover:bg-neutral-100">
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <form action={logoutAction} className="absolute bottom-5 left-5 right-5">
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted hover:bg-neutral-100">
            <LogOut className="h-4 w-4" />
            登出
          </button>
        </form>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-line bg-white px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
            <p className="text-xs text-muted">目前管理員</p>
              <p className="text-sm font-semibold text-ink">{admin.email}</p>
            </div>
            <Link href="/" className="rounded-md border border-line px-3 py-2 text-sm text-ink hover:border-ink">查看網站</Link>
          </div>
          <nav className="mt-4 flex gap-2 overflow-x-auto lg:hidden">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="whitespace-nowrap rounded-full bg-neutral-100 px-3 py-2 text-xs text-ink">
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
