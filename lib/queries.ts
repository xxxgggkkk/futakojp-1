import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const productInclude = {
  category: true,
  images: { orderBy: { sortOrder: "asc" } }
} satisfies Prisma.ProductInclude;

export async function getSiteSetting() {
  return prisma.siteSetting.upsert({
    where: { id: "site" },
    update: {},
    create: {
      id: "site",
      siteName: "GAO代购",
      wechatId: "gao-daigou",
      lineId: "gao-daigou"
    }
  });
}

export async function getActiveProducts(options?: {
  take?: number;
  categorySlug?: string;
  recommended?: boolean;
  hot?: boolean;
  query?: string;
}) {
  const where: Prisma.ProductWhereInput = {
    status: "ACTIVE",
    ...(options?.recommended ? { isRecommended: true } : {}),
    ...(options?.hot ? { isHot: true } : {}),
    ...(options?.categorySlug ? { category: { slug: options.categorySlug } } : {})
  };

  if (options?.query) {
    where.OR = [
      { name: { contains: options.query } },
      { brand: { contains: options.query } },
      { category: { name: { contains: options.query } } }
    ];
  }

  return prisma.product.findMany({
    where,
    include: productInclude,
    orderBy: { createdAt: "desc" },
    take: options?.take
  });
}

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: { _count: { select: { products: true } } }
  });
}

export async function getBanners() {
  return prisma.banner.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
  });
}
