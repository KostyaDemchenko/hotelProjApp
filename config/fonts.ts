import { Montserrat } from "next/font/google";

export const fontSans = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});
