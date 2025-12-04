import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Temporarily ignore TypeScript errors during build
  // TODO: Fix Drizzle ORM type issues with Neon HTTP adapter
  typescript: {
    ignoreBuildErrors: true,
  },

  // Image optimization settings
  images: {
    // Enable modern formats
    formats: ["image/avif", "image/webp"],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Remote patterns for external images
    remotePatterns: [
      // Mapbox Static Images API
      {
        protocol: "https",
        hostname: "api.mapbox.com",
        pathname: "/styles/v1/**",
      },
      // Placeholder images (if using any)
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      // Common CDNs
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Allow any HTTPS image (for user-uploaded content)
      // Note: Be more restrictive in production if possible
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Minimize layout shift
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
  },

  // Experimental features for better performance
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-select",
      "@radix-ui/react-tabs",
      "date-fns",
    ],
  },

  // Compiler options
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Headers for caching
  async headers() {
    return [
      {
        // Cache static assets aggressively
        source: "/:all*(svg|jpg|png|webp|avif|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache Mapbox tiles
        source: "/api/mapbox/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
