"use client";

import { TimelineLayout } from "@/components/ui/timeline/timeline-layout";
import { TimelineElement } from "@/components/ui/timeline/types";
import { BadgeCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { LandingPageData } from "../actions/get-landing-page-data";
import { ExperienceCard } from "../components/experience";

interface Props {
  data: LandingPageData;
}

export function ExperienceList({ data }: Props) {
  const [timelineData, setTimelineData] = useState<TimelineElement[]>([]);

  useEffect(() => {
    if (data && data.data?.experiences) {
      const formattedData: TimelineElement[] = data.data.experiences.map(
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

  if (!data.data?.experiences || data.data.experiences.length === 0) {
    return (
      <div className="content-container mx-auto">
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center space-y-4 px-4">
            <h3 className="text-xl font-semibold text-muted-foreground">
              No experiences found
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Professional experiences will be displayed here once they&apos;re
              added to the portfolio.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content-container mx-auto px-4 sm:px-6">
      {/* Timeline - Full Width */}
      <div className="w-full max-w-6xl mx-auto">
        <TimelineLayout
          items={timelineData}
          size="lg"
          iconColor="primary"
          customIcon={<BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5" />}
          animate={true}
        />
      </div>
    </div>
  );
}
