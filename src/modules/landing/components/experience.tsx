"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Building,
  BadgeCheck,
  ArrowUpRight,
  Users,
  Award
} from "lucide-react";
import { TimelineLayout } from "@/components/ui/timeline/timeline-layout";
import { TimelineElement } from "@/components/ui/timeline/types";
import { LandingPageData } from "../actions/get-landing-page-data";
import { ExperiencesWithProjectSchemaT } from "@/lib/zod/experiences.zod";

type Props = {
  className?: string;
  data: LandingPageData;
};

export function ExperienceCard({
  data
}: {
  data: ExperiencesWithProjectSchemaT;
}) {
  return (
    <Card className="w-full border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg group bg-white backdrop-blur-sm">
      <CardHeader className="pb-6">
        <div className="flex flex-col gap-4">
          <div className="space-y-4 flex-1">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-accent/10 rounded-xl flex-shrink-0 mt-1">
                <Building className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground group-hover:text-accent transition-colors duration-300 leading-tight mb-3">
                  {data.role}
                </h3>
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 text-muted-foreground">
                  {data.project && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm font-medium">
                        {data.project.name}
                      </span>
                    </div>
                  )}
                  {data.project?.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{data.project.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.project?.projectType && (
              <Badge variant="secondary" className="text-xs font-medium">
                {data.project.projectType}
              </Badge>
            )}
            {data.project?.projectValue && (
              <Badge
                variant="outline"
                className="text-xs border-accent/30 text-accent font-medium"
              >
                {data.project.projectValue}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {data.content && (
          <p className="text-muted-foreground leading-relaxed text-sm">
            {data.content}
          </p>
        )}

        {/* Project Details */}
        {data.project && (
          <div className="space-y-4">
            {data.project.description && (
              <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
                <div className="flex items-start gap-3 mb-3">
                  <Award className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <h4 className="font-semibold text-foreground text-sm">
                    Project Highlights
                  </h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {data.project.description}
                </p>
              </div>
            )}

            {/* Project Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {data.project.client && (
                <div className="p-4 bg-background rounded-xl border border-border/50 hover:border-accent/30 transition-colors duration-200">
                  <div className="text-sm font-semibold text-foreground mb-1">
                    Client
                  </div>
                  <div
                    className="text-xs text-muted-foreground"
                    title={data.project.client}
                  >
                    {data.project.client}
                  </div>
                </div>
              )}
              {data.project.projectType && (
                <div className="p-4 bg-background rounded-xl border border-border/50 hover:border-accent/30 transition-colors duration-200">
                  <div className="text-sm font-semibold text-foreground mb-1">
                    Type
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {data.project.projectType}
                  </div>
                </div>
              )}
              {data.project.projectValue && (
                <div className="p-4 bg-background rounded-xl border border-border/50 hover:border-accent/30 transition-colors duration-200">
                  <div className="text-sm font-semibold text-accent mb-1">
                    Value
                  </div>
                  <div className="text-xs text-accent font-medium">
                    {data.project.projectValue}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* View More Button */}
        <div className="pt-4 border-t border-border/50">
          <button className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors duration-300 group/btn font-medium">
            <span>View Project Details</span>
            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ExperienceSection({ data, className }: Props) {
  const [timelineData, setTimelineData] = useState<TimelineElement[]>([]);

  useEffect(() => {
    if (data && data.data?.experiences) {
      const formattedData: TimelineElement[] = data.data.experiences
        .slice(0, 4)
        .map(
          (item, index) =>
            ({
              id: index,
              title: item.role!,
              description: item.content!,
              date: item.duration!,
              customComponent: <ExperienceCard data={item} />
            } satisfies TimelineElement)
        );

      setTimelineData(formattedData);
    }
  }, [data]);

  return (
    <section className={cn("py-12 md:py-20 bg-muted/30", className)}>
      <div className="content-container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
            Professional Experience
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            My Professional Journey
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Over two decades of expertise in real estate and construction,
            delivering exceptional results and building lasting client
            relationships.
          </p>
        </div>

        {/* Timeline - Full Width */}
        <div className="w-full max-w-7xl mx-auto">
          <TimelineLayout
            items={timelineData}
            size="lg"
            iconColor="primary"
            customIcon={<BadgeCheck className="w-5 h-5" />}
            animate={true}
          />
        </div>
      </div>
    </section>
  );
}
