/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_R2_HOST,
        port: "",
      },
    ],
  },
};

export default nextConfig;
