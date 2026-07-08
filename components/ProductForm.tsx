import { Category, Product, Image as ProductImage } from "@prisma/client";
import { saveProductAction } from "@/app/admin/actions";
import { ImageUploader } from "@/components/ImageUploader";

type ProductWithImages = Product & { images: ProductImage[] };

export function ProductForm({ product, categories }: { product?: ProductWithImages; categories: Category[] }) {
  return (
    <form action={saveProductAction} className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <input type="hidden" name="id" value={product?.id || ""} />
      <section className="space-y-5 rounded-lg border border-line bg-white p-5">
        <Field label="商品名稱" name="name" defaultValue={product?.name} required />
        <Field label="Slug" name="slug" defaultValue={product?.slug} placeholder="留空會按商品名生成" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="品牌" name="brand" defaultValue={product?.brand} required />
          <Field label="台幣參考價格（NT$）" name="priceJpy" type="number" defaultValue={product?.priceJpy} required />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-ink">
            分類
            <select name="categoryId" defaultValue={product?.categoryId} className="mt-2 h-10 w-full rounded-md border border-line px-3 outline-none focus:border-ink" required>
              <option value="">請選擇</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </label>
          <Field label="到貨週期" name="deliveryCycle" defaultValue={product?.deliveryCycle || "7-14 天"} required />
        </div>
        <Field label="短介紹" name="shortIntro" defaultValue={product?.shortIntro} required />
        <TextArea label="商品介紹" name="description" defaultValue={product?.description} required />
        <TextArea label="商品規格" name="specs" defaultValue={product?.specs} required />
        <TextArea label="注意事項" name="notes" defaultValue={product?.notes || ""} />
      </section>
      <aside className="space-y-5">
        <section className="space-y-4 rounded-lg border border-line bg-white p-5">
          <label className="text-sm font-medium text-ink">
            上架狀態
            <select name="status" defaultValue={product?.status || "ACTIVE"} className="mt-2 h-10 w-full rounded-md border border-line px-3 outline-none focus:border-ink">
              <option value="ACTIVE">已上架</option>
              <option value="INACTIVE">已下架</option>
              <option value="DRAFT">草稿</option>
            </select>
          </label>
          <label className="text-sm font-medium text-ink">
            代購狀態
            <select name="stockStatus" defaultValue={product?.stockStatus || "AVAILABLE"} className="mt-2 h-10 w-full rounded-md border border-line px-3 outline-none focus:border-ink">
              <option value="AVAILABLE">可代購</option>
              <option value="LIMITED">少量可代購</option>
              <option value="PREORDER">可預訂</option>
              <option value="UNAVAILABLE">暫不可代購</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="checkbox" name="isRecommended" defaultChecked={product?.isRecommended} />
            推薦商品
          </label>
          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="checkbox" name="isHot" defaultChecked={product?.isHot} />
            熱門商品
          </label>
        </section>
        <section className="rounded-lg border border-line bg-white p-5">
          <h2 className="mb-3 text-sm font-semibold text-ink">商品圖片</h2>
          <ImageUploader defaultValue={product?.images.map((image) => image.url).join("\n") || ""} />
        </section>
        <button className="w-full rounded-md bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-gold">儲存商品</button>
      </aside>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  placeholder,
  required = false
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium text-ink">
      {label}
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="mt-2 h-10 w-full rounded-md border border-line px-3 outline-none focus:border-ink"
      />
    </label>
  );
}

function TextArea({ label, name, defaultValue, required = false }: { label: string; name: string; defaultValue?: string; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-ink">
      {label}
      <textarea
        name={name}
        defaultValue={defaultValue}
        required={required}
        rows={5}
        className="mt-2 w-full rounded-md border border-line px-3 py-2 outline-none focus:border-ink"
      />
    </label>
  );
}
