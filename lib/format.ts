export function formatTwd(value: number) {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    maximumFractionDigits: 0
  }).format(value);
}

export function stockLabel(status: string) {
  const labels: Record<string, string> = {
    AVAILABLE: "可代購",
    LIMITED: "少量可代購",
    PREORDER: "可預訂",
    UNAVAILABLE: "暫不可代購"
  };
  return labels[status] ?? status;
}

export function statusLabel(status: string) {
  const labels: Record<string, string> = {
    ACTIVE: "已上架",
    INACTIVE: "已下架",
    DRAFT: "草稿"
  };
  return labels[status] ?? status;
}

export function toSlug(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9\u4e00-\u9fa5-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
