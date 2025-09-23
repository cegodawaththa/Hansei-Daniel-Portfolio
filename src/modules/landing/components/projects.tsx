"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Users,
  Building2,
  ArrowRight,
  Briefcase,
  Calendar,
  Sparkles,
  TrendingUp,
  ClockIcon
} from "lucide-react";
import { LandingPageData } from "../actions/get-landing-page-data";
import { ProjectsWithExperiencesSchemaT } from "@/lib/zod/projects.zod";

type Props = {
  className?: string;
  data: LandingPageData;
};

// Project Details Dialog Component
export function ProjectDetailsDialog({
  project,
  trigger
}: {
  project: ProjectsWithExperiencesSchemaT;
  trigger?: React.ReactNode;
}) {
  const projectImage = project.thumbnails?.[0] || "/assets/images/hero_1.jpg";

  return (
    <Dialog>
      <DialogTrigger asChild>
        {!trigger ? (
          <Button
            variant="outline"
            className="w-full group/btn border-gray-200 dark:border-gray-700 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 text-sm"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            View Project Details
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Button>
        ) : (
          trigger
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <ScrollArea className="h-full max-h-[90vh]">
          <div className="relative">
            {/* Hero Image Section */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
              <Image
                src={projectImage}
                alt={project.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Project badges on hero */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                {project.projectType && (
                  <Badge
                    variant="secondary"
                    className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md text-foreground shadow-lg border-white/20 px-3 py-1.5 flex items-center gap-1.5"
                  >
                    <Building2 className="w-4 h-4" />
                    <span className="font-medium">{project.projectType}</span>
                  </Badge>
                )}

                {project.projectValue && (
                  <div className="bg-gradient-to-r from-accent to-accent/80 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-bold">{project.projectValue}</span>
                  </div>
                )}
              </div>

              {/* Project title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2">
                  {project.name}
                </h1>
                <div className="flex flex-wrap gap-3">
                  {project.location && (
                    <div className="inline-flex items-center gap-2 text-white/90">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                  )}
                  {project.client && (
                    <div className="inline-flex items-center gap-2 text-white/90">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{project.client}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-6">
              {/* Project Description */}
              {project.description && (
                <div>
                  <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Project Overview
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              )}

              {/* Project Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.projectType && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-5 h-5 text-accent" />
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        Project Type
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {project.projectType}
                    </p>
                  </div>
                )}

                {project.location && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-accent" />
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        Location
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {project.location}
                    </p>
                  </div>
                )}

                {project.client && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-accent" />
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        Client
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {project.client}
                    </p>
                  </div>
                )}

                {project.projectValue && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-accent" />
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        Project Value
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {project.projectValue}
                    </p>
                  </div>
                )}

                {project.status && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ClockIcon className="w-5 h-5 text-accent" />
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        Project Status
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 capitalize">
                      {project.status}
                    </p>
                  </div>
                )}
              </div>

              {/* Experiences Section */}
              {project.experiences && project.experiences.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="w-5 h-5 text-accent" />
                    <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-gray-100">
                      Key Contributions & Experiences
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {project.experiences.map((exp, index) => (
                      <div
                        key={exp.id}
                        className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg p-5 border border-gray-200 dark:border-gray-700 hover:border-accent/50 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-accent">
                                {index + 1}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {exp.role}
                            </h3>
                          </div>
                          {exp.duration && (
                            <div className="flex items-center gap-1.5 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-600">
                              <Calendar className="w-4 h-4 text-accent" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {exp.duration}
                              </span>
                            </div>
                          )}
                        </div>
                        {exp.content && (
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed pl-11">
                            {exp.content}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Project Images */}
              {project.thumbnails && project.thumbnails.length > 1 && (
                <div>
                  <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Project Gallery
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {project.thumbnails.slice(1).map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
                      >
                        <Image
                          src={image}
                          alt={`${project.name} - Image ${index + 2}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export function ProjectCard({
  project,
  index
}: {
  project: ProjectsWithExperiencesSchemaT;
  index: number;
}) {
  // Use the first thumbnail or fallback to placeholder
  const projectImage = project.thumbnails?.[0] || "/assets/images/hero_1.jpg";

  // Animation delay for staggered effect
  const animationDelay = index * 100;

  return (
    <div
      className="group h-full animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both overflow-hidden"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="h-full flex flex-col bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-accent/50 dark:hover:border-accent/50 shadow-lg hover:shadow-2xl transition-all duration-500 group">
        {/* Image Container with Overlay */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          <Image
            src={projectImage}
            alt={project.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

          {/* Top Row - Type and Value */}
          <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 flex justify-between items-start z-10">
            {/* Project Type Badge */}
            {project.projectType && (
              <Badge
                variant="secondary"
                className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md text-foreground shadow-lg border-white/20 px-2 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1 sm:gap-1.5 text-xs"
              >
                <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="font-medium">{project.projectType}</span>
              </Badge>
            )}

            {/* Project Value */}
            {project.projectValue && (
              <div className="bg-gradient-to-r from-accent to-accent/80 backdrop-blur-md text-white px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-lg flex items-center gap-1 sm:gap-1.5">
                <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="font-bold text-xs sm:text-sm">
                  {project.projectValue}
                </span>
              </div>
            )}
          </div>

          {/* Decorative Corner Element */}
          <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-tl from-accent/20 to-transparent rounded-tl-full" />
        </div>

        {/* Content Section */}
        <div className="flex-grow p-4 sm:p-6 space-y-3 sm:space-y-4">
          {/* Title */}
          <div>
            <h3 className="text-lg sm:text-xl font-heading font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-accent transition-colors duration-300">
              {project.name}
            </h3>
          </div>

          {/* Description */}
          {project.description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>
          )}

          {/* Project Details Pills */}
          <div className="flex flex-wrap gap-2">
            {project.location && (
              <div className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-xs sm:text-sm">
                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {project.location}
                </span>
              </div>
            )}

            {project.client && (
              <div className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-xs sm:text-sm">
                <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {project.client}
                </span>
              </div>
            )}
          </div>

          {/* Experiences Section */}
          {project.experiences && project.experiences.length > 0 && (
            <div className="pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Key Contributions
                  </span>
                </div>

                <div className="space-y-2">
                  {project.experiences.slice(0, 2).map((exp) => (
                    <div
                      key={exp.id}
                      className="group/exp bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg p-2 sm:p-3 hover:from-accent/5 hover:to-accent/10 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover/exp:text-accent transition-colors">
                          {exp.role}
                        </h4>
                        {exp.duration && (
                          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <Calendar className="w-3 h-3" />
                            <span className="hidden sm:inline">
                              {exp.duration}
                            </span>
                          </div>
                        )}
                      </div>
                      {exp.content && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                          {exp.content}
                        </p>
                      )}
                    </div>
                  ))}

                  {project.experiences.length > 2 && (
                    <div className="text-center">
                      <span className="text-xs text-accent font-medium">
                        +{project.experiences.length - 2} more contribution
                        {project.experiences.length - 2 > 1 ? "s" : ""}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Card Footer with Action */}
        <div className="p-4 sm:p-6 pt-0 mt-auto">
          <ProjectDetailsDialog project={project} />
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection({ data, className }: Props) {
  const [projects, setProjects] = useState<ProjectsWithExperiencesSchemaT[]>(
    []
  );
  const [displayCount, setDisplayCount] = useState(6);
  const [isExpanded, setIsExpanded] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    if (data && data.data?.projects) {
      if (statusFilter !== "all") {
        const filteredProjects = data.data.projects.filter(
          (project) => project.status === statusFilter
        );

        setProjects(filteredProjects);
        return;
      }

      setProjects(data.data.projects);
    }
  }, [data, statusFilter]);

  const handleShowMore = () => {
    if (isExpanded) {
      setDisplayCount(6);
      setIsExpanded(false);
      // Scroll to top of projects section
      document
        .getElementById("projects-section")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      setDisplayCount(projects.length);
      setIsExpanded(true);
    }
  };

  // Show fallback content if no projects
  if (!projects || projects.length === 0) {
    return (
      <section
        id="projects-section"
        className={cn(
          "py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900",
          className
        )}
      >
        <div className="content-container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-12 md:mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium backdrop-blur-sm">
              <Building2 className="w-4 h-4 mr-2" />
              Featured Projects
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
              Projects
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our exceptional real estate and construction projects
              that showcase our expertise and commitment to excellence.
            </p>
          </div>

          <div className="my-3 w-full flex items-center justify-center gap-3">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setStatusFilter("all")}
            >
              All
            </Button>
            <Button
              variant={statusFilter === "completed" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setStatusFilter("completed")}
            >
              Completed Projects
            </Button>
            <Button
              variant={statusFilter === "ongoing" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setStatusFilter("ongoing")}
            >
              Under Construction
            </Button>
            <Button
              variant={statusFilter === "future" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setStatusFilter("future")}
            >
              Upcoming
            </Button>
          </div>

          <div className="text-center py-20 bg-gray-100 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
            <Building2 className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              No projects available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const visibleProjects = projects.slice(0, displayCount);

  return (
    <section
      id="projects-section"
      className={cn(
        "py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900",
        className
      )}
    >
      <div className="content-container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium backdrop-blur-sm animate-pulse">
            <Building2 className="w-4 h-4 mr-2" />
            Featured Projects
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-gray-100">
            Projects
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our exceptional real estate and construction projects that
            showcase our expertise and commitment to excellence.
          </p>

          <div className="mt-3 w-full flex items-center justify-center gap-3">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setStatusFilter("all")}
            >
              All
            </Button>
            <Button
              variant={statusFilter === "completed" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setStatusFilter("completed")}
            >
              Completed Projects
            </Button>
            <Button
              variant={statusFilter === "ongoing" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setStatusFilter("ongoing")}
            >
              Under Construction
            </Button>
            <Button
              variant={statusFilter === "future" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setStatusFilter("future")}
            >
              Upcoming
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Show More/Less Button */}
        {projects.length > 6 && (
          <div className="text-center mt-12">
            <Button
              onClick={handleShowMore}
              variant="outline"
              size="lg"
              className="min-w-[200px] border-2 border-accent/50 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300"
            >
              {isExpanded ? (
                <>
                  Show Less
                  <ArrowRight className="w-4 h-4 ml-2 rotate-90 transition-transform" />
                </>
              ) : (
                <>
                  Show More Projects ({projects.length - 6} more)
                  <ArrowRight className="w-4 h-4 ml-2 -rotate-90 transition-transform" />
                </>
              )}
            </Button>
          </div>
        )}

        {/* Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 p-8 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="text-center space-y-2 group hover:scale-105 transition-transform duration-300">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
              {projects.length}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Total Projects
            </p>
          </div>
          <div className="text-center space-y-2 group hover:scale-105 transition-transform duration-300">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
              {new Set(projects.map((p) => p.projectType).filter(Boolean)).size}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Project Types
            </p>
          </div>
          <div className="text-center space-y-2 group hover:scale-105 transition-transform duration-300">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
              {new Set(projects.map((p) => p.location).filter(Boolean)).size}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Locations
            </p>
          </div>
          <div className="text-center space-y-2 group hover:scale-105 transition-transform duration-300">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
              {projects.reduce(
                (acc, p) => acc + (p.experiences?.length || 0),
                0
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Experiences
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="relative overflow-hidden bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 rounded-3xl p-8 lg:p-12 mt-16 border border-accent/20">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-accent rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-accent rounded-full blur-3xl" />
          </div>

          <div className="relative text-center space-y-6 z-10">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-gray-900 dark:text-gray-100">
              Ready to Start Your Next Project?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Let&apos;s discuss how we can bring your vision to life with our
              expertise in real estate development and construction management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Start a Project
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-accent text-accent hover:bg-accent hover:text-white px-8 transition-all duration-300"
              >
                <Building2 className="w-4 h-4 mr-2" />
                View All Projects
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
