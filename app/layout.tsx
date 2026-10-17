import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Burdak Coach — персональний тренер",
  description:
    "Допомагаю прибрати хаос у тренуваннях, харчуванні та прогресі: будую план, контролюю виконання і адаптую систему під твоє тіло, графік та результат.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}