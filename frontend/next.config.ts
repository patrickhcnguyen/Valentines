import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@jaredreisinger/react-crossword"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.tenor.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
