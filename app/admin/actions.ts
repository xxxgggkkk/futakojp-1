"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearSession, createSession, requireAdmin, verifyPassword } from "@/lib/auth";
import { toSlug } from "@/lib/format";
import { prisma } from "@/lib/prisma";

function getString(formData: FormData, key: string, fallback = "") {
  return String(formData.get(key) || fallback).trim();
}

function getBool(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function imageUrls(formData: FormData) {
  return getString(formData, "images")
    .split(/\n|,/)
    .map((url) => url.trim())
    .filter(Boolean);
}

export async function loginAction(formData: FormData) {
  const email = getString(formData, "email").toLowerCase();
  const password = getString(formData, "password");
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin || !(await verifyPassword(password, admin.passwordHash))) {
    redirect("/admin/login?error=1");
  }
  await createSession(admin.id);
  redirect("/admin");
}

export async function logoutAction() {
  await clearSession();
  redirect("/admin/login");
}

export async function saveProductAction(formData: FormData) {
  await requireAdmin();
  const id = getString(formData, "id");
  const name = getString(formData, "name");
  const slug = getString(formData, "slug", toSlug(name)) || toSlug(name);
  const urls = imageUrls(formData);
  const data = {
    name,
    slug,
    brand: getString(formData, "brand"),
    categoryId: getString(formData, "categoryId"),
    priceJpy: Number(getString(formData, "priceJpy", "0")),
    deliveryCycle: getString(formData, "deliveryCycle"),
    stockStatus: getString(formData, "stockStatus", "AVAILABLE"),
    status: getString(formData, "status", "ACTIVE"),
    isRecommended: getBool(formData, "isRecommended"),
    isHot: getBool(formData, "isHot"),
    shortIntro: getString(formData, "shortIntro"),
    description: getString(formData, "description"),
    specs: getString(formData, "specs"),
    notes: getString(formData, "notes")
  };

  if (id) {
    await prisma.product.update({
      where: { id },
      data: {
        ...data,
        images: {
          deleteMany: {},
          create: urls.map((url, index) => ({ url, alt: name, sortOrder: index }))
        }
      }
    });
  } else {
    await prisma.product.create({
      data: {
        ...data,
        images: {
          create: urls.map((url, index) => ({ url, alt: name, sortOrder: index }))
        }
      }
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProductAction(formData: FormData) {
  await requireAdmin();
  await prisma.product.delete({ where: { id: getString(formData, "id") } });
  revalidatePath("/");
  revalidatePath("/admin/products");
}

export async function toggleProductStatusAction(formData: FormData) {
  await requireAdmin();
  const id = getString(formData, "id");
  const status = getString(formData, "status") === "ACTIVE" ? "INACTIVE" : "ACTIVE";
  await prisma.product.update({ where: { id }, data: { status } });
  revalidatePath("/");
  revalidatePath("/admin/products");
}

export async function saveCategoryAction(formData: FormData) {
  await requireAdmin();
  const id = getString(formData, "id");
  const name = getString(formData, "name");
  const data = {
    name,
    slug: getString(formData, "slug", toSlug(name)) || toSlug(name),
    description: getString(formData, "description"),
    sortOrder: Number(getString(formData, "sortOrder", "0"))
  };
  if (id) {
    await prisma.category.update({ where: { id }, data });
  } else {
    await prisma.category.create({ data });
  }
  revalidatePath("/");
  revalidatePath("/admin/categories");
}

export async function deleteCategoryAction(formData: FormData) {
  await requireAdmin();
  await prisma.category.delete({ where: { id: getString(formData, "id") } });
  revalidatePath("/");
  revalidatePath("/admin/categories");
}

export async function saveBannerAction(formData: FormData) {
  await requireAdmin();
  const id = getString(formData, "id");
  const data = {
    title: getString(formData, "title"),
    subtitle: getString(formData, "subtitle"),
    imageUrl: getString(formData, "imageUrl"),
    linkUrl: getString(formData, "linkUrl"),
    isActive: getBool(formData, "isActive"),
    sortOrder: Number(getString(formData, "sortOrder", "0"))
  };
  if (id) {
    await prisma.banner.update({ where: { id }, data });
  } else {
    await prisma.banner.create({ data });
  }
  revalidatePath("/");
  revalidatePath("/admin/banners");
}

export async function deleteBannerAction(formData: FormData) {
  await requireAdmin();
  await prisma.banner.delete({ where: { id: getString(formData, "id") } });
  revalidatePath("/");
  revalidatePath("/admin/banners");
}

export async function saveSettingsAction(formData: FormData) {
  await requireAdmin();
  await prisma.siteSetting.upsert({
    where: { id: "site" },
    update: {
      siteName: getString(formData, "siteName"),
      logoUrl: getString(formData, "logoUrl"),
      metaTitle: getString(formData, "metaTitle"),
      metaDescription: getString(formData, "metaDescription"),
      wechatId: getString(formData, "wechatId"),
      wechatQrUrl: getString(formData, "wechatQrUrl"),
      lineId: getString(formData, "lineId"),
      lineQrUrl: getString(formData, "lineQrUrl"),
      whatsapp: getString(formData, "whatsapp"),
      email: getString(formData, "email")
    },
    create: {
      id: "site",
      siteName: getString(formData, "siteName"),
      logoUrl: getString(formData, "logoUrl"),
      metaTitle: getString(formData, "metaTitle"),
      metaDescription: getString(formData, "metaDescription"),
      wechatId: getString(formData, "wechatId"),
      wechatQrUrl: getString(formData, "wechatQrUrl"),
      lineId: getString(formData, "lineId"),
      lineQrUrl: getString(formData, "lineQrUrl"),
      whatsapp: getString(formData, "whatsapp"),
      email: getString(formData, "email")
    }
  });
  revalidatePath("/");
  revalidatePath("/admin/settings");
}
