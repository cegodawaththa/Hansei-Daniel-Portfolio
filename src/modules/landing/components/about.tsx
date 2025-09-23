import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LandingPageData } from "../actions/get-landing-page-data";
import Link from "next/link";
import { DownloadCVButton } from "./download-cv";

type Props = {
  className?: string;
  data: LandingPageData;
  isPage?: boolean;
};

export default function AboutSection({
  className,
  data,
  isPage = false
}: Props) {
  const pageData = data.data;

  if (!pageData) return <></>;

  const basicInfo = pageData.basicInfo;
  const qualifications = pageData.qualifications;

  return (
    <section className={cn("py-20 bg-background", className)}>
      <div className="content-container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div
            className={cn("space-y-8", {
              "col-span-2": isPage
            })}
          >
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
                About Me
              </div>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground">
                Management Executive
              </h2>
              {/* <p className="text-lg text-muted-foreground leading-relaxed">
                {basicInfo?.fullBio}
              </p> */}

              {basicInfo?.fullBio && (
                <div
                  className="prose prose-lg max-w-none prose-headings:text-muted-foreground prose-p:text-muted-foreground prose-strong:text-muted-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:text-muted-foreground prose-blockquote:text-muted-foreground prose-blockquote:border-border prose-a:text-primary prose-code:text-muted-foreground prose-pre:bg-muted text-muted-foreground/90"
                  dangerouslySetInnerHTML={{
                    __html: basicInfo.fullBio
                  }}
                />
              )}
            </div>

            <div className="space-y-6">
              <div className="flex items-center flex-wrap gap-3">
                {isPage &&
                  qualifications?.map((qualification, index) => (
                    <Card
                      key={index}
                      className="border-border/50 p-0 hover:border-accent/50 transition-colors duration-300"
                    >
                      <CardContent className="px-6 py-3">
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl">{`🏆`}</div>
                          <div className="">
                            <h3 className="font-semibold text-foreground">
                              {qualification.name}
                            </h3>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {!isPage &&
                  qualifications?.slice(0, 4)?.map((qualification, index) => (
                    <Card
                      key={index}
                      className="border-border/50 p-0 hover:border-accent/50 transition-colors duration-300"
                    >
                      <CardContent className="px-6 py-3">
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl">{`🏆`}</div>
                          <div className="">
                            <h3 className="font-semibold text-foreground">
                              {qualification.name}
                            </h3>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              {!isPage && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground px-8"
                  >
                    <Link href="/about">Learn More About Me</Link>
                  </Button>

                  <DownloadCVButton>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8"
                    >
                      Download Full CV
                    </Button>
                  </DownloadCVButton>
                </div>
              )}
            </div>
          </div>

          {/* Right Content - Professional Image */}
          {!isPage && (
            <div className={cn("relative")}>
              <div className="relative w-full h-[600px] rounded-2xl overflow-hidden">
                <Image
                  src="/assets/images/hero_person_with_bg.jpeg"
                  alt="Hansie Daniel - Professional Portrait"
                  fill
                  className="object-cover object-center scale-125 translate-x-10"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>

              {/* Floating Achievement Card */}
              <Card className="absolute -bottom-6 -left-6 bg-white shadow-2xl border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-accent-foreground">
                        20+
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        Years Experience
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Construction & Real Estate
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
