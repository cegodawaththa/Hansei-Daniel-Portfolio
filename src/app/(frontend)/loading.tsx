"use client";

import { Logo } from "@/components/logo";
import { Loader2 } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-primary">
      <div className="relative size-72 flex items-center justify-center">
        <Loader2
          className="absolute top-0 left-0 size-full animate-spin font-semibold text-primary-foreground"
          strokeWidth={0.1}
        />

        <Logo />
      </div>
    </div>
  );
}
