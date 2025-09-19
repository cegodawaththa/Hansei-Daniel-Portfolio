import React from "react";
import ProjectStatusSection from "./project-status-section";
import { LandingPageData } from "../actions/get-landing-page-data";

type Props = {
  className?: string;
  data: LandingPageData;
  maxDisplayCount?: number;
};

export default function CompletedProjectsSection({
  data,
  className,
  maxDisplayCount = 6
}: Props) {
  return (
    <ProjectStatusSection
      data={data}
      className={className}
      status="completed"
      title="Completed Projects"
      subtitle="Successfully delivered real estate and construction projects that showcase our expertise and commitment to quality."
      maxDisplayCount={maxDisplayCount}
    />
  );
}
