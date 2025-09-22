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
      className={`w-full h-[400px] flex items-center ${
        reverse ? "flex-row-reverse" : ""
      }`}
    >
      <div className="flex-1/2 w-full h-full relative">
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
          <div className="absolute top-5 left-5 bg-white shadow px-3 max-w-fit py-1 rounded-full">
            <p className="text-xs text-primary">{`${project.client}`}</p>
          </div>
        )}

        <div className="top-5 right-5 absolute">
          <ProjectDetailsDialog
            project={project}
            trigger={
              <Button
                variant="link"
                size="sm"
                className="group text-white/90 hover:text-white cursor-pointer transition-all duration-300 flex items-center gap-1"
              >
                View Details
                <ArrowRightIcon className="text-white w-5 h-5" />
              </Button>
            }
          />
        </div>

        {project.experiences && project.experiences.length > 0 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-11/12 bg-black/10 backdrop-blur-sm shadow-lg rounded-lg p-4 sm:p-6">
            <div className="">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                  <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                    Key Contributions
                  </span>
                </div>

                <div className="space-y-2">
                  {project.experiences.slice(0, 2).map((exp) => (
                    <div
                      key={exp.id}
                      className="group/exp bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-2 sm:p-3 transition-all duration-300"
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
          </div>
        )}
      </div>

      <div className="flex-1/2 w-full h-full flex items-center px-8">
        <div className="">
          <div className="">
            <h3 className="text-2xl font-semibold text-wrap text-primary">
              {project.name}
            </h3>
          </div>

          <div className="w-1/3 h-0.5 bg-accent my-2" />

          <p className="mt-2 truncate text-justify text-sm text-muted-foreground h-20 max-h-32 w-full">
            {project.description}
          </p>

          <div className="flex items-center gap-3 mt-3">
            {project.location && (
              <p className="text-sm text-muted-foreground flex items-center">
                <MapPin className="text-accent size-4 mr-2" />

                {project.location}
              </p>
            )}

            <div className="h-5">
              <Separator orientation="vertical" />
            </div>

            {project.status && (
              <p className="text-sm text-muted-foreground flex items-center">
                {project.status === "completed" && (
                  <CheckCircleIcon className="text-accent size-4 mr-2" />
                )}
                {project.status === "future" && (
                  <ClockIcon className="text-accent size-4 mr-2" />
                )}
                {project.status === "ongoing" && (
                  <ConstructionIcon className="text-accent size-4 mr-2" />
                )}

                {project.status === "completed" && "Completed"}
                {project.status === "future" && "Upcoming"}
                {project.status === "ongoing" && "Under Construction"}
              </p>
            )}

            <div className="h-5">
              <Separator orientation="vertical" />
            </div>

            {project.projectType && (
              <p className="text-sm text-muted-foreground flex items-center">
                <Building className="text-accent size-4 mr-2" />

                {project.projectType}
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
    <div className={cn("w-full bg-white min-h-16 py-8", className)}>
      <div className="text-center space-y-4 mb-12 md:mb-16">
        <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
          Projects Portfolio
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
          Developments
        </h2>
      </div>

      {developments.map((project, index) => (
        <DevelopmentRow
          key={project.id}
          project={project}
          reverse={index % 2 === 1}
        />
      ))}

      <div className="mt-12 w-full flex items-center justify-center">
        <Button asChild variant={"link"} size="lg">
          <Link href="/projects">
            View All Developments
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
