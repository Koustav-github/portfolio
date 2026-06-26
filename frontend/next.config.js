/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Still serve modern, smaller formats from the optimizer.
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
