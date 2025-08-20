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

  return (
    <div className="content-container mx-auto">
      {/* Timeline - Full Width */}
      <div className="w-full max-w-7xl">
        <TimelineLayout
          items={timelineData}
          size="lg"
          iconColor="primary"
          customIcon={<BadgeCheck className="w-5 h-5" />}
          animate={true}
        />
      </div>
    </div>
  );
}
