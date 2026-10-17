import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Edveo Live — Great teaching. Now, live.",
  description:
    "Meet Edveo Live: a focused live-teaching workspace for institutes. Explore the classroom, a live-only dashboard, and a planned integration path for your platform.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Edveo Live — Great teaching. Now, live.",
    description:
      "One classroom. Two ways to make it yours. Explore live teaching for your institute.",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#f8f7f4" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
