export function formatJpy(value: number) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(value);
}

export function stockLabel(status: string) {
  const labels: Record<string, string> = {
    AVAILABLE: "可代购",
    LIMITED: "少量可代购",
    PREORDER: "可预订",
    UNAVAILABLE: "暂不可代购"
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
