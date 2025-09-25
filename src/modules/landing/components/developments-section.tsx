"use client";

import React, { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { LandingPageData } from "../actions/get-landing-page-data";
import { ProjectsWithExperiencesSchemaT } from "@/lib/zod/projects.zod";
import {
  ArrowRightIcon,
  Briefcase,
  Building,
  Calendar,
  CheckCircleIcon,
  ClockIcon,
  ConstructionIcon,
  MapPin
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ProjectDetailsDialog } from "./projects";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  className?: string;
  data?: LandingPageData;
};

type DevelopmentRowProps = {
  project: ProjectsWithExperiencesSchemaT;
  reverse?: boolean;
};

function DevelopmentRow({ project, reverse }: DevelopmentRowProps) {
  const [thumbnail, setThumbnail] = useState<string>(
    project.thumbnails && project?.thumbnails?.length > 0
      ? project.thumbnails[0]
      : ""
  );

  return (
    <div
      className={`w-full min-h-[400px] md:h-[400px] flex flex-col md:flex-row items-stretch ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="w-full h-64 sm:h-80 md:flex-1/2 md:h-full relative">
        <Image
          src={thumbnail ? thumbnail : "/assets/images/hero_1.jpg"}
          alt={project.name}
          width={600}
          height={500}
          className="w-full h-full object-cover"
          onError={() => {
            setThumbnail("/assets/images/hero_1.jpg");
          }}
        />

        {project.client && (
          <div className="absolute top-3 left-3 sm:top-5 sm:left-5 bg-white shadow px-2 sm:px-3 max-w-fit py-1 rounded-full">
            <p className="text-xs text-primary">{`${project.client}`}</p>
          </div>
        )}

        <div className="top-3 right-3 sm:top-5 sm:right-5 absolute">
          <ProjectDetailsDialog
            project={project}
            trigger={
              <Button
                variant="link"
                size="sm"
                className="group text-white/90 hover:text-white cursor-pointer transition-all duration-300 flex items-center gap-1 text-xs sm:text-sm"
              >
                <span className="hidden sm:inline">View Details</span>
                <span className="sm:hidden">Details</span>
                <ArrowRightIcon className="text-white w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            }
          />
        </div>

        {project.experiences && project.experiences.length > 0 && (
          <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 w-[95%] sm:w-11/12 bg-black/20 backdrop-blur-sm shadow-lg rounded-lg p-3 sm:p-4 md:p-6">
            <div className="">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-white/90 uppercase tracking-wider">
                    Key Contributions
                  </span>
                </div>

                <div className="space-y-2">
                  {project.experiences.slice(0, 2).map((exp) => (
                    <div
                      key={exp.id}
                      className="group/exp bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-900 group-hover/exp:text-accent transition-colors line-clamp-1">
                          {exp.role}
                        </h4>
                        {exp.duration && (
                          <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
                            <Calendar className="w-3 h-3" />
                            <span className="hidden sm:inline text-xs">
                              {exp.duration}
                            </span>
                          </div>
                        )}
                      </div>
                      {exp.content && (
                        <p className="text-xs text-gray-600 line-clamp-2">
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
          </div>
        )}
      </div>

      <div className="w-full md:flex-1/2 flex items-center px-4 sm:px-6 md:px-8 py-4 md:py-0">
        <div className="w-full">
          <div className="">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-wrap text-primary">
              {project.name}
            </h3>
          </div>

          <div className="w-1/3 sm:w-1/4 h-0.5 bg-accent my-2 sm:my-3" />

          <p className="mt-2 text-justify text-sm sm:text-base text-muted-foreground line-clamp-3 sm:line-clamp-4 md:h-20 md:max-h-32 w-full">
            {project.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
            {project.location && (
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center">
                <MapPin className="text-accent size-3 sm:size-4 mr-1 sm:mr-2 flex-shrink-0" />
                <span className="truncate">{project.location}</span>
              </p>
            )}

            <div className="hidden sm:block h-5">
              <Separator orientation="vertical" />
            </div>

            {project.status && (
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center">
                {project.status === "completed" && (
                  <CheckCircleIcon className="text-accent size-3 sm:size-4 mr-1 sm:mr-2 flex-shrink-0" />
                )}
                {project.status === "future" && (
                  <ClockIcon className="text-accent size-3 sm:size-4 mr-1 sm:mr-2 flex-shrink-0" />
                )}
                {project.status === "ongoing" && (
                  <ConstructionIcon className="text-accent size-3 sm:size-4 mr-1 sm:mr-2 flex-shrink-0" />
                )}

                <span className="truncate">
                  {project.status === "completed" && "Completed"}
                  {project.status === "future" && "Upcoming"}
                  {project.status === "ongoing" && "Under Construction"}
                </span>
              </p>
            )}

            <div className="hidden sm:block h-5">
              <Separator orientation="vertical" />
            </div>

            {project.projectType && (
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center">
                <Building className="text-accent size-3 sm:size-4 mr-1 sm:mr-2 flex-shrink-0" />
                <span className="truncate">{project.projectType}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DevelopmentsSection({ className, data }: Props) {
  const developments = data?.data?.projects?.slice(0, 4) || [];

  return (
    <div
      className={cn(
        "w-full bg-white min-h-16 py-6 sm:py-8 md:py-12",
        className
      )}
    >
      <div className="text-center space-y-4 mb-8 sm:mb-12 md:mb-16 px-4">
        <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/10 text-accent rounded-full text-xs sm:text-sm font-medium">
          Projects Portfolio
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
          Projects
        </h2>
      </div>

      <div className="space-y-6 sm:space-y-8 md:space-y-0">
        {developments.map((project, index) => (
          <DevelopmentRow
            key={project.id}
            project={project}
            reverse={index % 2 === 1}
          />
        ))}
      </div>

      <div className="mt-8 sm:mt-12 w-full flex items-center justify-center px-4">
        <Button
          asChild
          variant={"link"}
          size="lg"
          className="text-sm sm:text-base"
        >
          <Link href="/projects">
            <span className="hidden sm:inline">View All Developments</span>
            <span className="sm:hidden">View All</span>
            <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
