"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

async function compressImage(file: File, maxDimension = 1600, quality = 0.75): Promise<Blob> {
  if (typeof createImageBitmap !== "function") {
    throw new Error("createImageBitmap unsupported");
  }

  const bitmap = await createImageBitmap(file);
  let { width, height } = bitmap;
  if (width > maxDimension || height > maxDimension) {
    const scale = maxDimension / Math.max(width, height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unsupported");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/jpeg", quality);
  });
  if (!blob) throw new Error("toBlob failed");
  return blob;
}

export default function UploadForm({ uploadedToday }: { uploadedToday: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const fileInput = form.elements.namedItem("screenshot") as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (!file) return;

    setBusy(true);
    try {
      let toUpload: Blob = file;
      let filename = file.name;

      try {
        toUpload = await compressImage(file);
        filename = file.name.replace(/\.[^.]+$/, "") + ".jpg";
      } catch (compressErr) {
        console.error("Compression failed, uploading original:", compressErr);
      }

      const formData = new FormData();
      formData.set("screenshot", toUpload, filename);

      const res = await fetch("/api/upload-nutrition-screenshot", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      form.reset();
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Не вдалося завантажити скрін. Спробуй ще раз або напиши тренеру.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="authForm">
      <input type="file" name="screenshot" accept="image/*" required className="authInput" />
      {error && <p className="authNote">{error}</p>}
      <button type="submit" className="authButton" disabled={busy} style={{ justifySelf: "start" }}>
        {busy ? "Завантажую..." : uploadedToday ? "Замінити сьогоднішній скрін" : "Завантажити за сьогодні"}
      </button>
    </form>
  );
}
