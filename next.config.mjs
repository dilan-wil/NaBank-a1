/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/mansar/:path*", // matches any request starting with /api/
        destination:
          "https://mansar-app.usemansar.xyz/mansar-application/:path*", // forwards it to this external API
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/mansar/:path*",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
};

export default nextConfig;
