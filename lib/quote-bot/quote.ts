export function calculateTwd(jpy: number): number {
  if (!Number.isFinite(jpy) || jpy <= 0) throw new Error("JPY price must be positive");
  return Math.round(((jpy + 440) * 0.202 * 1.015) + 500);
}

