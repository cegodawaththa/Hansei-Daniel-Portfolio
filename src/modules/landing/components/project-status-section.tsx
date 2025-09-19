"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, Calendar } from "lucide-react";
import { LandingPageData } from "../actions/get-landing-page-data";
import { ProjectCard } from "./projects";

type Props = {
  className?: string;
  data: LandingPageData;
  status: "completed" | "ongoing" | "future";
  title: string;
  subtitle: string;
  maxDisplayCount?: number;
};

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    iconColor: "text-green-600 dark:text-green-400",
    bgGradient: "from-green-50 to-white dark:from-green-950 dark:to-gray-900",
    borderColor: "border-green-200 dark:border-green-800"
  },
  ongoing: {
    icon: Clock,
    iconColor: "text-blue-600 dark:text-blue-400",
    bgGradient: "from-blue-50 to-white dark:from-blue-950 dark:to-gray-900",
    borderColor: "border-blue-200 dark:border-blue-800"
  },
  future: {
    icon: Calendar,
    iconColor: "text-purple-600 dark:text-purple-400",
    bgGradient: "from-purple-50 to-white dark:from-purple-950 dark:to-gray-900",
    borderColor: "border-purple-200 dark:border-purple-800"
  }
};

export default function ProjectStatusSection({
  data,
  className,
  status,
  title,
  subtitle,
  maxDisplayCount = 6
}: Props) {
  const filteredProjects = useMemo(() => {
    if (!data?.data?.projects) return [];
    return data.data.projects.filter((project) => project.status === status);
  }, [data, status]);

  const config = statusConfig[status];
  const Icon = config.icon;
  const displayProjects = maxDisplayCount
    ? filteredProjects.slice(0, maxDisplayCount)
    : filteredProjects;

  // Show fallback content if no projects
  if (filteredProjects.length === 0) {
    return (
      <section
        className={cn(
          "py-16 md:py-24 bg-gradient-to-b",
          config.bgGradient,
          className
        )}
      >
        <div className="content-container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-12 md:mb-16">
            <div className="flex items-center justify-center mb-4">
              <div
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-full border-2",
                  config.borderColor,
                  "bg-white dark:bg-gray-800"
                )}
              >
                <Icon className={cn("w-6 h-6", config.iconColor)} />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-heading">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>

          <div
            className={cn(
              "text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border-2 border-dashed",
              config.borderColor
            )}
          >
            <Icon
              className={cn(
                "w-16 h-16 mx-auto mb-4",
                config.iconColor,
                "opacity-50"
              )}
            />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No {status} projects yet
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              {status === "completed" &&
                "Projects will appear here once completed."}
              {status === "ongoing" &&
                "Currently working on exciting new projects."}
              {status === "future" &&
                "Planning innovative projects for the future."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "py-16 md:py-24 bg-gradient-to-b",
        config.bgGradient,
        className
      )}
    >
      <div className="content-container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <div className="flex items-center justify-center mb-4">
            <div
              className={cn(
                "flex items-center justify-center w-12 h-12 rounded-full border-2",
                config.borderColor,
                "bg-white dark:bg-gray-800"
              )}
            >
              <Icon className={cn("w-6 h-6", config.iconColor)} />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-heading">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {subtitle}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>
              {filteredProjects.length} project
              {filteredProjects.length !== 1 ? "s" : ""}
            </span>
            {maxDisplayCount && filteredProjects.length > maxDisplayCount && (
              <span>• Showing {maxDisplayCount}</span>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All Link */}
        {maxDisplayCount && filteredProjects.length > maxDisplayCount && (
          <div className="text-center mt-12">
            <a
              href={`/projects?status=${status}`}
              className={cn(
                "inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-all duration-300",
                config.borderColor,
                "hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              )}
            >
              View All {title}
              <span className="text-sm text-muted-foreground">
                ({filteredProjects.length - maxDisplayCount} more)
              </span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
