import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";

import "./globals.css";
import { fontSans, fontHeading, fontGreatVibes } from "@/lib/fonts";
import { Providers } from "@/components/providers";
import { generateMetadata as genMetadata } from "@/lib/utils/metadata";

export const metadata: Metadata = genMetadata();

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontHeading.variable} ${fontGreatVibes.variable} font-sans antialiased`}
      >
        <Providers>
          {children}
          <Toaster position="bottom-left" />
        </Providers>
        <Analytics />;
      </body>
    </html>
  );
}
