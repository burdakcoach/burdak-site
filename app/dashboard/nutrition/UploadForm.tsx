"use client";

import { useState } from "react";
import { uploadNutritionScreenshot } from "./actions";

async function compressImage(file: File, maxDimension = 1600, quality = 0.75): Promise<File> {
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

  const filename = file.name.replace(/\.[^.]+$/, "") + ".jpg";
  return new File([blob], filename, { type: "image/jpeg" });
}

export default function UploadForm({ uploadedToday }: { uploadedToday: boolean }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    setError("");
    setBusy(true);
    try {
      const compressed = await compressImage(file);
      const dt = new DataTransfer();
      dt.items.add(compressed);
      input.files = dt.files;
    } catch (err) {
      // Стиснення не вдалось (непідтримуваний браузер тощо) — надсилаємо оригінал як є.
      console.error("Compression failed, uploading original file:", err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form action={uploadNutritionScreenshot} className="authForm">
      <input
        type="file"
        name="screenshot"
        accept="image/*"
        required
        className="authInput"
        onChange={handleFileChange}
      />
      {error && <p className="authNote">{error}</p>}
      <button type="submit" className="authButton" disabled={busy} style={{ justifySelf: "start" }}>
        {busy ? "Готую фото..." : uploadedToday ? "Замінити сьогоднішній скрін" : "Завантажити за сьогодні"}
      </button>
    </form>
  );
}
