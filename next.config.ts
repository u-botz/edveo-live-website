import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep this marketing release exportable to static hosting. Future server
  // features can use a normal Next.js deployment by removing this option.
  output: process.env.EDVEO_STATIC_EXPORT === "1" ? "export" : undefined,
  trailingSlash: true,
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
};

export default nextConfig;
