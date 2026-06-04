import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
    ],
  },
  webpack(config, { dev }) {
    if (dev) {
      // Completely disable filesystem cache in dev to prevent .pack.gz corruption
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (config as any).cache = false;
    }
    return config;
  },
};

export default nextConfig;
