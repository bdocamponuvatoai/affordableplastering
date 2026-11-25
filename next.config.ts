import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to `out/`.
  output: "export",
  // Emit `/about/` as `about/index.html` so any static host serves clean URLs.
  trailingSlash: true,
  images: {
    // A static export has no image optimization server: photos are
    // pre-generated at these widths (npm run images) and mapped by the loader.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [480, 768, 1080, 1536],
    imageSizes: [],
  },
};

export default nextConfig;
