import assert from "node:assert/strict";
import { test } from "node:test";
import imageLoader from "./image-loader.ts";

const hero = "/images/finished-interior.webp";

test("maps an exact generated width to that file", () => {
  assert.equal(
    imageLoader({ src: hero, width: 480 }),
    "/images/finished-interior-480.webp",
  );
  assert.equal(
    imageLoader({ src: hero, width: 1080 }),
    "/images/finished-interior-1080.webp",
  );
});

test("rounds a requested width up to the next generated width", () => {
  assert.equal(
    imageLoader({ src: hero, width: 500 }),
    "/images/finished-interior-768.webp",
  );
  assert.equal(
    imageLoader({ src: hero, width: 1200 }),
    "/images/finished-interior-1536.webp",
  );
});

test("caps widths above the largest generated file at the largest", () => {
  assert.equal(
    imageLoader({ src: hero, width: 3840 }),
    "/images/finished-interior-1536.webp",
  );
});

test("passes other paths through unchanged", () => {
  assert.equal(imageLoader({ src: "/icon.svg", width: 640 }), "/icon.svg");
});
