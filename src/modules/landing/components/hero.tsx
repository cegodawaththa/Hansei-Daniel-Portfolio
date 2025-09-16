import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { LandingPageData } from "../actions/get-landing-page-data";
// import { NavigationBar } from "./navbar";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  data: LandingPageData;
};

export default function HeroSection({ className, data }: Props) {
  if (!data.data || !data.data.basicInfo) return <></>;

  const basicInfo = data.data.basicInfo;

  return (
    <div
      className={cn(
        "relative overflow-hidden w-full h-screen bg-gradient-to-tr from-primary to-transparent",
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full min-h-[calc(100vh-5rem)]">
              {/* Left Content */}
              <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                <div className="space-y-4">
                  <Logo className="text-4xl md:text-6xl lg:text-7xl hidden lg:block">
                    {basicInfo.portfolioName}
                  </Logo>
                  <div className="space-y-2">
                    <h2 className="text-xl md:text-2xl lg:text-3xl capitalize italic font-heading font-medium text-primary-foreground/90">
                      {`"Invest in yourself is the best Return on Investment"`}
                    </h2>
                    <p className="text-lg md:text-xl font-light text-primary-foreground/80 max-w-2xl mx-auto lg:mx-0">
                      {basicInfo.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Call to Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="cursor-pointer bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg rounded shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                  >
                    View Properties
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="cursor-pointer border-2 border-primary-foreground/30 bg-primary-foreground text-primary font-semibold px-8 py-6 text-lg rounded backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                  >
                    Get Consultation
                  </Button>
                </div>

                {/* Stats or Features */}
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-primary-foreground/20">
                  <div className="text-center lg:text-left">
                    <div className="text-2xl md:text-3xl font-bold text-accent">
                      50+
                    </div>
                    <div className="text-sm text-primary-foreground/70">
                      Properties Sold
                    </div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-2xl md:text-3xl font-bold text-accent">
                      5+
                    </div>
                    <div className="text-sm text-primary-foreground/70">
                      Years Experience
                    </div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-2xl md:text-3xl font-bold text-accent">
                      98%
                    </div>
                    <div className="text-sm text-primary-foreground/70">
                      Client Satisfaction
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content - Person Image */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md lg:max-w-lg h-[400px] lg:h-[600px]">
                  <Image
                    src={"/assets/images/hero_person.png"}
                    alt="Hansie Daniel - Real Estate Professional"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  {/* Subtle overlay for better integration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
