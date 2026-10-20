"use client";

import { useState } from "react";
import { uploadNutritionScreenshot } from "./actions";

async function compressImage(file: File, maxDimension = 1600, quality = 0.75): Promise<Blob> {
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

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("toBlob failed"))),
      "image/jpeg",
      quality
    );
  });
}

export default function UploadForm({ uploadedToday }: { uploadedToday: boolean }) {
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
      const compressed = await compressImage(file);
      const formData = new FormData();
      formData.set("screenshot", compressed, file.name.replace(/\.[^.]+$/, "") + ".jpg");
      await uploadNutritionScreenshot(formData);
      form.reset();
    } catch (err) {
      console.error(err);
      setError("Не вдалося завантажити скрін. Спробуй ще раз.");
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
