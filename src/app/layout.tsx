import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Edveo Live — Online classrooms for 1:1 teaching",
  description:
    "One teacher. One student. Their pace. Online classrooms for private tutors and institutes offering one-to-one lessons, academic support, and personal mentoring.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Edveo Live — Online classrooms for 1:1 teaching",
    description:
      "A dedicated classroom for one teacher and one student. Built for private tutors and 1:1 teaching teams.",
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
