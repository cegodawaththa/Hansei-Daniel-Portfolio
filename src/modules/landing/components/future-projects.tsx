import React from "react";
import ProjectStatusSection from "./project-status-section";
import { LandingPageData } from "../actions/get-landing-page-data";

type Props = {
  className?: string;
  data: LandingPageData;
  maxDisplayCount?: number;
};

export default function FutureProjectsSection({
  data,
  className,
  maxDisplayCount = 6
}: Props) {
  return (
    <ProjectStatusSection
      data={data}
      className={className}
      status="future"
      title="Future Projects"
      subtitle="Upcoming developments and planned projects that represent our vision for innovative real estate solutions."
      maxDisplayCount={maxDisplayCount}
    />
  );
}
