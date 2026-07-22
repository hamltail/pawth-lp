import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pawth | 日々の足あとを描く日記アプリ",
  description:
    "日々の歩みを可視化し、その日の記録にコミットするための日記アプリです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
