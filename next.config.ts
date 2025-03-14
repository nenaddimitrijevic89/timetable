import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gymbox.ams3.digitaloceanspaces.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
