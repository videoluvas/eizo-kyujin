import type { Metadata } from "next";
import "@/public/assets/css/style.css";
import "@/styles/globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  robots: {
    index: process.env.NEXT_PUBLIC_SITE_URL === "https://eizo-job.com",
    follow: process.env.NEXT_PUBLIC_SITE_URL === "https://eizo-job.com",
  },
  verification: {
    google: "6uWx5F46tdFAmlnDwkzjScZZmVp0pjyMx1hJY51QQ5k",
  },
  icons: {
    icon: [
      { url: "https://pub-647b9765a3c242dcac081e185c116796.r2.dev/favicon_io/favicon-16x16.png", sizes: "16x16" },
      { url: "https://pub-647b9765a3c242dcac081e185c116796.r2.dev/favicon_io/favicon-32x32.png", sizes: "32x32" },
    ],
    apple: "https://pub-647b9765a3c242dcac081e185c116796.r2.dev/favicon_io/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${plusJakartaSans.className}`}>{children}</body>
    </html>
  );
}