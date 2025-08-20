export const siteConfig = {
  name: "Hansie Daniel - Real Estate Portfolio",
  title: "Hansie Daniel | Construction & Real Estate Management Professional",
  description:
    "Hansie Daniel - Results producing management executive with over 20 years of experience in construction and real estate industries. Expert project manager specializing in forecasting, budgeting, and delivering innovative solutions within budget and time constraints.",
  keywords: [
    "Hansie Daniel",
    "construction management",
    "real estate professional",
    "project management Toronto",
    "construction project manager",
    "property development Canada",
    "building construction management",
    "project forecasting",
    "construction budgeting",
    "real estate development",
    "construction industry expert",
    "project coordination",
    "construction solutions",
    "property management",
    "building project management",
    "construction consulting"
  ],
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/assets/images/hero_1.jpg",
  author: {
    name: "Hansie Daniel",
    url: "/about"
  },
  creator: "@hansiedaniel",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Hansie Daniel - Real Estate Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    creator: "@hansiedaniel"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
} as const;

export type SiteConfig = typeof siteConfig;
