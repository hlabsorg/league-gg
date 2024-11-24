/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "seukqkukqze4vjj1.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
