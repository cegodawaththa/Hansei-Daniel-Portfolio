import React from "react";
import ProjectStatusSection from "./project-status-section";
import { LandingPageData } from "../actions/get-landing-page-data";

type Props = {
  className?: string;
  data: LandingPageData;
  maxDisplayCount?: number;
};

export default function OngoingProjectsSection({
  data,
  className,
  maxDisplayCount = 6
}: Props) {
  return (
    <ProjectStatusSection
      data={data}
      className={className}
      status="ongoing"
      title="Ongoing Projects"
      subtitle="Current projects in development, showcasing our active involvement in shaping the real estate landscape."
      maxDisplayCount={maxDisplayCount}
    />
  );
}
