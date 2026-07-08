"use client";

import { UploadCloud } from "lucide-react";
import { useState } from "react";

export function ImageUploader({ name = "images", defaultValue = "" }: { name?: string; defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue);
  const [busy, setBusy] = useState(false);

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));
    const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = (await response.json()) as { urls?: string[]; error?: string };
    setBusy(false);
    const uploadedUrls = data.urls || [];
    if (uploadedUrls.length) {
      setValue((current) => [current, ...uploadedUrls].filter(Boolean).join("\n"));
    } else if (data.error) {
      alert(data.error);
    }
  }

  return (
    <div className="space-y-3">
      <label
        className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-line bg-white p-6 text-center hover:border-ink"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          upload(event.dataTransfer.files);
        }}
      >
        <UploadCloud className="h-8 w-8 text-muted" />
        <span className="mt-3 text-sm font-medium text-ink">{busy ? "上传中..." : "点击或拖拽上传 JPG / PNG / WEBP"}</span>
        <input type="file" accept="image/jpeg,image/png,image/webp" multiple className="sr-only" onChange={(event) => upload(event.target.files)} />
      </label>
      <textarea
        name={name}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        rows={5}
        className="w-full rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-ink"
        placeholder="也可以粘贴图片 URL，每行一张"
      />
      {value && (
        <div className="grid grid-cols-4 gap-2">
          {value.split(/\n|,/).filter(Boolean).slice(0, 8).map((url) => (
            <div key={url} className="aspect-square overflow-hidden rounded-md bg-neutral-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
