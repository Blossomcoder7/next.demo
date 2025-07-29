import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // for Google avatars
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // for Cloudinary images
      },
    ],
  },
};

export default nextConfig;
