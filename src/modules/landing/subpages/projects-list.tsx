import React from "react";
import { LandingPageData } from "../actions/get-landing-page-data";
import { ProjectCard } from "../components/projects";

type Props = {
  data: LandingPageData;
};

export function ProjectsList({ data }: Props) {
  if (!data.data || !data.data.projects || data.data.projects.length < 1)
    return (
      <div className="flex items-center justify-center w-full">
        <p>No projects found.</p>
      </div>
    );

  const projects = data.data.projects;

  return (
    <div className="content-container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
