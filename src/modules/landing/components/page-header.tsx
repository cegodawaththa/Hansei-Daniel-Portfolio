import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  subtitle: string;
  className?: string;
};

export function PageHeader({ className, title, subtitle }: Props) {
  return (
    <div
      className={cn(
        "relative overflow-hidden w-full h-[40vh] bg-gradient-to-tr from-primary to-transparent",
        className
      )}
    >
      {/* Background Image */}
      <div className="absolute h-full w-full top-0 left-0 bg-primary z-0">
        <Image
          src={"/assets/images/hero_1.jpg"}
          alt={"Hero Image"}
          fill
          priority
          className="object-cover opacity-60 scale-x-[-1]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col pt-20">
        {/* <NavigationBar /> */}

        {/* Hero Section Content */}
        <div className="flex-1 flex items-center">
          <div className="content-container mx-auto">
            <h1 className="text-4xl font-bold text-white font-heading">
              {title}
            </h1>
            <p className="mt-2 text-lg text-white">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
