/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "initwjuydablyalgmeqt.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/product_images/**",
        search: "",
      },
    ],
  },
  // output : "export"
};

export default nextConfig;
