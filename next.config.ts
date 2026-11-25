import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to `out/`.
  output: "export",
  // Emit `/about/` as `about/index.html` so any static host serves clean URLs.
  trailingSlash: true,
  images: {
    // A static export has no image optimization server.
    unoptimized: true,
  },
};

export default nextConfig;
