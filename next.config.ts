import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const isStatic = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: isStatic,
  },
  ...(isStatic
    ? {
        output: "export" as const,
        trailingSlash: true,
      }
    : {}),
};

if (!isStatic) {
  initOpenNextCloudflareForDev();
}

export default nextConfig;
