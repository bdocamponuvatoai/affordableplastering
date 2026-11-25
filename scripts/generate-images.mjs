// Generates the responsive photo sizes served by src/lib/image-loader.ts.
// Run after adding or replacing a photo in assets-src/images/:
//   npm run images
// Output (committed): public/images/<name>-<width>.webp
import { copyFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const WIDTHS = [480, 768, 1080, 1536]; // keep in sync with IMAGE_WIDTHS
const SOURCE_DIR = path.resolve("assets-src/images");
const OUT_DIR = path.resolve("public/images");

await mkdir(OUT_DIR, { recursive: true });
const sources = (await readdir(SOURCE_DIR)).filter((f) => f.endsWith(".webp"));

for (const file of sources) {
  const name = path.basename(file, ".webp");
  const input = path.join(SOURCE_DIR, file);
  const { width: original } = await sharp(input).metadata();
  for (const width of WIDTHS) {
    const output = path.join(OUT_DIR, `${name}-${width}.webp`);
    if (width >= original) {
      // Never upscale; the largest size is the original file, byte for byte.
      await copyFile(input, output);
    } else {
      await sharp(input).resize({ width }).webp({ quality: 72 }).toFile(output);
    }
    console.log(`${path.relative(process.cwd(), output)}`);
  }
}
