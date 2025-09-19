import React from "react";
import { cn } from "@/lib/utils";

import { LandingPageData } from "../actions/get-landing-page-data";
import { Card } from "@/components/ui/card";
import { CalendarIcon, GraduationCapIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TimelineElement } from "@/components/ui/timeline/types";
import { TimelineLayout } from "@/components/ui/timeline/timeline-layout";

type Props = {
  className?: string;
  data: LandingPageData;
};

export default function EducationSection({ data, className }: Props) {
  if (!data.data || !data.data.education) return <></>;

  const educationData = data.data.education;

  const timelineData: TimelineElement[] = educationData.map((item, index) => ({
    id: index,
    title: item.title!,
    description: item.institution!,
    date: item.year!,
    customComponent: (
      <Card
        key={item.id}
        className="group relative p-6 mb-6 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/30 hover:border-accent/40 rounded-2xl overflow-hidden"
      >
        {/* Accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-accent/60 to-accent/30"></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          {/* Icon Container */}
          <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-300">
            <GraduationCapIcon className="w-7 h-7 text-accent" />
          </div>

          {/* Content */}
          <div className="flex-grow space-y-3 min-w-0">
            <div className="space-y-2">
              <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-accent transition-colors duration-300 leading-tight">
                {item.title}
              </h3>
              <p className="text-muted-foreground font-medium">
                {item.institution}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {/* <Badge
                variant="outline"
                className="w-fit bg-background/50 border-accent/30 text-foreground hover:bg-accent/10 transition-colors duration-200"
              >
                <BuildingIcon className="mr-2 w-3.5 h-3.5" />
                Institution
              </Badge> */}
              <Badge
                variant="secondary"
                className="w-fit bg-accent/10 text-accent border-accent/20 hover:bg-accent/20 transition-colors duration-200"
              >
                <CalendarIcon className="mr-2 w-3.5 h-3.5" />
                {item.year}
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    )
  }));

  return (
    <section
      className={cn(
        "py-12 md:py-20 bg-gradient-to-br from-muted/20 via-background to-muted/30",
        className
      )}
    >
      <div className="content-container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
            Educational Background
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            My <span className="text-accent">Credentials</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A comprehensive overview of my educational journey and academic
            achievements that shaped my professional expertise.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="w-full max-w-5xl mx-auto">
          <TimelineLayout
            items={timelineData}
            size="lg"
            iconColor="primary"
            customIcon={<GraduationCapIcon className="w-5 h-5" />}
            animate={true}
          />
        </div>
      </div>
    </section>
  );
}
