/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "source.unsplash.com",
      "www.notion.so",
      "notion-yosuk.s3.amazonaws.com",
      "s3.us-west-2.amazonaws.com",
      "*",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  output: "export",
  trailingSlash: true,
};

module.exports = nextConfig;
