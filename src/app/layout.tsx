import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Edveo Live — Great teaching. Now, live.",
  description:
    "A focused live-teaching workspace for institutes. Explore the classroom, create your account, and bring your teaching team together.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Edveo Live — Great teaching. Now, live.",
    description:
      "A focused place to teach. Explore live teaching for your institute.",
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
