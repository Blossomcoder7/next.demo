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
      {
        protocol: "https",
        hostname: "m.media-amazon.com", // for amazon images
      },
    ],
  },
};

export default nextConfig;
