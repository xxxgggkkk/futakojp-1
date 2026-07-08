import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "gao_admin_session";

function getSecret() {
  return process.env.AUTH_SECRET || "local-development-secret-change-me";
}

async function sign(value: string) {
  const data = new TextEncoder().encode(value);
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, data);
  return Buffer.from(signature).toString("base64url");
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSession(adminId: string) {
  const expires = Date.now() + 1000 * 60 * 60 * 24 * 7;
  const payload = `${adminId}.${expires}`;
  const token = `${payload}.${await sign(payload)}`;
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(expires),
    path: "/"
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const [adminId, expires, signature] = token.split(".");
  if (!adminId || !expires || !signature) return null;
  if (Number(expires) < Date.now()) return null;

  const payload = `${adminId}.${expires}`;
  if ((await sign(payload)) !== signature) return null;

  return prisma.admin.findUnique({ where: { id: adminId } });
}

export async function requireAdmin() {
  const admin = await getAdminSession();
  if (!admin) redirect("/admin/login");
  return admin;
}
