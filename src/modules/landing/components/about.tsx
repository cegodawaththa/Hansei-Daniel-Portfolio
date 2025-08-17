import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const achievements = [
  {
    icon: "🏆",
    title: "Award Winner",
    description: "Top Real Estate Agent 2023"
  },
  {
    icon: "👥",
    title: "Client Focused",
    description: "98% Client Satisfaction Rate"
  },
  {
    icon: "🎯",
    title: "Results Driven",
    description: "50+ Properties Sold Successfully"
  },
  {
    icon: "🔧",
    title: "Expert Knowledge",
    description: "20+ Years in Construction & Real Estate"
  }
];

export default function AboutSection({ className }: Props) {
  return (
    <section className={cn("py-20 bg-background", className)}>
      <div className="content-container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
                About Me
              </div>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground">
                Results Producing Management Executive
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With over 20 years of experience in construction and real estate
                industries, I bring unparalleled expertise in property
                development, investment strategies, and client relationship
                management. My commitment to excellence has resulted in
                successful project completions and satisfied clients across
                diverse markets.
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <Card
                    key={index}
                    className="border-border/50 hover:border-accent/50 transition-colors duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="space-y-1">
                          <h3 className="font-semibold text-foreground">
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-8"
                >
                  Learn More About Me
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8"
                >
                  Download Full CV
                </Button>
              </div>
            </div>
          </div>

          {/* Right Content - Professional Image */}
          <div className="relative">
            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden">
              <Image
                src="/assets/images/hero_person_with_bg.jpeg"
                alt="Hansei Daniel - Professional Portrait"
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
        </div>
      </div>
    </section>
  );
}
