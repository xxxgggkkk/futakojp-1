import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { requireAdmin } from "@/lib/auth";

const allowed = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  await requireAdmin();
  const formData = await request.formData();
  const files = formData.getAll("files").filter((file): file is File => file instanceof File);

  if (!files.length) {
    return NextResponse.json({ error: "请选择图片" }, { status: 400 });
  }

  const urls: string[] = [];
  for (const file of files) {
    if (!allowed.has(file.type)) {
      return NextResponse.json({ error: "仅支持 JPG、PNG、WEBP 图片" }, { status: 400 });
    }
    const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const bytes = await file.arrayBuffer();

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import("@vercel/blob");
      const blob = await put(`uploads/${filename}`, Buffer.from(bytes), {
        access: "public",
        contentType: file.type
      });
      urls.push(blob.url);
    } else {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });
      await writeFile(path.join(uploadDir, filename), Buffer.from(bytes));
      urls.push(`/uploads/${filename}`);
    }
  }

  return NextResponse.json({ urls });
}
