import { Bricolage_Grotesque, Inter, Great_Vibes } from "next/font/google";

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const fontHeading = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading"
});

export const fontGreatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-signature",
  weight: ["400"]
});
