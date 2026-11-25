import localFont from "next/font/local";

// Open Sans (Apache-2.0, see src/assets/fonts/FONT-LICENSE.txt), self-hosted.
// The semibold file covers weights 600–800, as in the original stylesheet.
export const openSans = localFont({
  src: [
    {
      path: "../assets/fonts/open-sans-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/open-sans-semibold.ttf",
      weight: "600 800",
      style: "normal",
    },
  ],
  variable: "--font-open-sans",
  display: "swap",
});
