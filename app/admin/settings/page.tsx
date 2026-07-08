import { saveSettingsAction } from "@/app/admin/actions";
import { AdminShell } from "@/components/AdminShell";
import { ImageUploader } from "@/components/ImageUploader";
import { getSiteSetting } from "@/lib/queries";

export default async function SettingsPage() {
  const setting = await getSiteSetting();

  return (
    <AdminShell>
      <h1 className="text-2xl font-semibold text-ink">網站設定</h1>
      <form action={saveSettingsAction} className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="space-y-5 rounded-lg border border-line bg-white p-5">
          <Field label="網站名稱" name="siteName" defaultValue={setting.siteName} />
          <Field label="SEO 標題" name="metaTitle" defaultValue={setting.metaTitle} />
          <label className="block text-sm font-medium text-ink">
            Meta Description
            <textarea name="metaDescription" defaultValue={setting.metaDescription} rows={4} className="mt-2 w-full rounded-md border border-line px-3 py-2 outline-none focus:border-ink" />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="微信號" name="wechatId" defaultValue={setting.wechatId || ""} />
            <Field label="LINE ID" name="lineId" defaultValue={setting.lineId || ""} />
            <Field label="WhatsApp" name="whatsapp" defaultValue={setting.whatsapp || ""} />
            <Field label="Email" name="email" defaultValue={setting.email || ""} />
          </div>
          <button className="rounded-md bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-gold">儲存設定</button>
        </section>
        <aside className="space-y-5">
          <section className="rounded-lg border border-line bg-white p-5">
            <h2 className="mb-3 text-sm font-semibold text-ink">Logo 圖片</h2>
            <ImageUploader name="logoUrl" defaultValue={setting.logoUrl || ""} />
          </section>
          <section className="rounded-lg border border-line bg-white p-5">
            <h2 className="mb-3 text-sm font-semibold text-ink">微信 QR Code</h2>
            <ImageUploader name="wechatQrUrl" defaultValue={setting.wechatQrUrl || ""} />
          </section>
          <section className="rounded-lg border border-line bg-white p-5">
            <h2 className="mb-3 text-sm font-semibold text-ink">LINE QR Code</h2>
            <ImageUploader name="lineQrUrl" defaultValue={setting.lineQrUrl || ""} />
          </section>
        </aside>
      </form>
    </AdminShell>
  );
}

function Field({ label, name, defaultValue }: { label: string; name: string; defaultValue: string }) {
  return (
    <label className="block text-sm font-medium text-ink">
      {label}
      <input name={name} defaultValue={defaultValue} className="mt-2 h-10 w-full rounded-md border border-line px-3 outline-none focus:border-ink" />
    </label>
  );
}
