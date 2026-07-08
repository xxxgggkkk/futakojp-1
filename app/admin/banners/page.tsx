import { deleteBannerAction, saveBannerAction } from "@/app/admin/actions";
import { AdminShell } from "@/components/AdminShell";
import { ImageUploader } from "@/components/ImageUploader";
import { prisma } from "@/lib/prisma";

export default async function BannersPage() {
  const banners = await prisma.banner.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });

  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold text-ink">首頁 Banner</h1>
      <section className="mt-6 rounded-lg border border-line bg-white p-5">
        <h2 className="text-lg font-semibold text-ink">新增 Banner</h2>
        <BannerForm />
      </section>
      <div className="mt-6 space-y-4">
        {banners.map((banner) => (
          <section key={banner.id} className="rounded-lg border border-line bg-white p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-semibold text-ink">{banner.title}</h2>
                <p className="text-sm text-muted">{banner.isActive ? "顯示中" : "已隱藏"}</p>
              </div>
              <form action={deleteBannerAction}>
                <input type="hidden" name="id" value={banner.id} />
                <button className="rounded-md border border-red-200 px-3 py-2 text-sm text-red-600 hover:border-red-500">刪除</button>
              </form>
            </div>
            <BannerForm banner={banner} />
          </section>
        ))}
      </div>
    </AdminShell>
  );
}

function BannerForm({ banner }: { banner?: { id: string; title: string; subtitle: string | null; imageUrl: string; linkUrl: string | null; isActive: boolean; sortOrder: number } }) {
  return (
    <form action={saveBannerAction} className="mt-4 grid gap-4 lg:grid-cols-[1fr_320px]">
      <input type="hidden" name="id" value={banner?.id || ""} />
      <div className="space-y-4">
        <input name="title" defaultValue={banner?.title} placeholder="標題" required className="h-10 w-full rounded-md border border-line px-3 outline-none focus:border-ink" />
        <input name="subtitle" defaultValue={banner?.subtitle || ""} placeholder="副標題" className="h-10 w-full rounded-md border border-line px-3 outline-none focus:border-ink" />
        <input name="linkUrl" defaultValue={banner?.linkUrl || ""} placeholder="連結，例如 /category/beauty" className="h-10 w-full rounded-md border border-line px-3 outline-none focus:border-ink" />
        <input name="sortOrder" type="number" defaultValue={banner?.sortOrder || 0} placeholder="排序" className="h-10 w-full rounded-md border border-line px-3 outline-none focus:border-ink" />
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="isActive" defaultChecked={banner?.isActive ?? true} />
          顯示
        </label>
        <button className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-gold">儲存 Banner</button>
      </div>
      <div>
        <ImageUploader name="imageUrl" defaultValue={banner?.imageUrl || ""} />
      </div>
    </form>
  );
}
