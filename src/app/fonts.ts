import { Instrument_Serif, Inter } from "next/font/google";

// Downloaded at build time and served from the site itself (no requests to
// Google from visitors' browsers).

/** UI and body text. Variable weight plus optical size (opsz). */
export const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-inter",
  display: "swap",
});

/** Italic accent words in headings and the footer tagline. */
export const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});
