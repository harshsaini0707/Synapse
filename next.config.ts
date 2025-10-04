import type { NextConfig } from "next";

/** @type {import("next").NextConfig} */
const nextConfig: NextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "i.ytimg.com", "yt3.ggpht.com"],
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  output: 'standalone',

};

export default nextConfig;
