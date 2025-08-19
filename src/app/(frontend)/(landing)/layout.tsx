import React from "react";

import FooterSection from "@/modules/landing/components/footer";
import { NavigationBar } from "@/modules/landing/components/navbar";

type Props = {
  children: React.ReactNode;
};

export default async function LandingPageLayout({ children }: Props) {
  return (
    <div className="bg-white w-full min-h-screen relative">
      <NavigationBar />
      {children}
      <FooterSection />
    </div>
  );
}
