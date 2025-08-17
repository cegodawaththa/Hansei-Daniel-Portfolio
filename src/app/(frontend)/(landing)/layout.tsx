import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function LandingPageLayout({ children }: Props) {
  return (
    <div className="bg-white w-full min-h-screen relative">{children}</div>
  );
}
