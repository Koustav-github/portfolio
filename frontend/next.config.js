/** @type {import('next').NextConfig} */

// Long-lived, immutable cache for static media. Browsers keep these for a
// year and never re-request them, so repeat visits load images instantly.
// Note: files in /public are NOT content-hashed, so to ship a *changed*
// image you must rename it (or bump a ?v= query) to bust the cache.
const STATIC_MEDIA_CACHE = "public, max-age=31536000, immutable";

const nextConfig = {
  reactStrictMode: true,
  images: {
    // Serve modern, smaller formats from the optimizer (/_next/image).
    formats: ["image/avif", "image/webp"],
    // Keep optimized image variants cached for a year.
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        // Raw assets in /public (images, video, fonts) by extension.
        source: "/:all*(png|jpg|jpeg|gif|svg|ico|webp|avif|mp4|webm|woff|woff2)",
        headers: [{ key: "Cache-Control", value: STATIC_MEDIA_CACHE }],
      },
    ];
  },
};

module.exports = nextConfig;
