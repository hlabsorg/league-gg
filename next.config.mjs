/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 7200,
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_DATA_DRAGON_ASSET_HOST,
        port: "",
      },
    ],
  },
};

export default nextConfig;
