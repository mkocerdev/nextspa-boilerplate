import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone", // Static export for client-side only
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  // Enable client-side routing
  reactStrictMode: true,
  // Disable server-side features
  experimental: {
    // Enable client-side navigation
    clientRouterFilter: true,
    // Enable client-side routing
    clientRouterFilterRedirects: true,
  },
};

export default nextConfig;
