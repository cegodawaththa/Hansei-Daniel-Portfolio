import React from "react";
import { LandingPageData } from "../actions/get-landing-page-data";
import CompletedProjectsSection from "../components/completed-projects";
import OngoingProjectsSection from "../components/ongoing-projects";
import FutureProjectsSection from "../components/future-projects";
import { ProjectCard } from "../components/projects";

type Props = {
  data: LandingPageData;
  statusFilter?: string;
};

export function ProjectsList({ data, statusFilter }: Props) {
  if (!data.data || !data.data.projects || data.data.projects.length < 1)
    return (
      <div className="flex items-center justify-center w-full min-h-[40vh]">
        <div className="text-center space-y-4 px-4">
          <h3 className="text-xl font-semibold text-muted-foreground">
            No projects found
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            We&apos;re currently working on exciting new projects. Check back
            soon to see our latest developments!
          </p>
        </div>
      </div>
    );

  // If statusFilter is provided, show only that specific status section
  if (statusFilter && statusFilter !== "all") {
    switch (statusFilter) {
      case "completed":
        return <CompletedProjectsSection data={data} />;
      case "ongoing":
        return <OngoingProjectsSection data={data} />;
      case "future":
        return <FutureProjectsSection data={data} />;
      default:
        // Invalid status filter, show all projects in grid
        break;
    }
  }

  // Show all sections when no filter or "all" filter is applied
  if (!statusFilter || statusFilter === "all") {
    return (
      <div className="space-y-0">
        <CompletedProjectsSection data={data} />
        <OngoingProjectsSection data={data} />
        <FutureProjectsSection data={data} />
      </div>
    );
  }

  // Fallback: show all projects in a grid (for any other case)
  const projects = data.data.projects;

  return (
    <div className="content-container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
