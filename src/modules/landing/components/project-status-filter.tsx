"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, Calendar, Grid3X3 } from "lucide-react";

const statusOptions = [
  {
    key: "all",
    label: "All Projects",
    icon: Grid3X3,
    description: "View all projects"
  },
  {
    key: "completed",
    label: "Completed",
    icon: CheckCircle2,
    description: "Successfully delivered projects"
  },
  {
    key: "ongoing",
    label: "Ongoing",
    icon: Clock,
    description: "Currently in development"
  },
  {
    key: "future",
    label: "Future",
    icon: Calendar,
    description: "Planned and upcoming projects"
  }
];

export function ProjectStatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") || "all";

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (status === "all") {
      params.delete("status");
    } else {
      params.set("status", status);
    }

    const newUrl = params.toString()
      ? `/projects?${params.toString()}`
      : "/projects";

    router.push(newUrl);
  };

  return (
    <div className="content-container mx-auto px-4 md:px-6 mb-8">
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
        {statusOptions.map((option) => {
          const Icon = option.icon;
          const isActive = currentStatus === option.key;

          return (
            <button
              key={option.key}
              onClick={() => handleStatusChange(option.key)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200",
                "hover:shadow-md hover:scale-105 active:scale-95",
                isActive
                  ? "bg-accent text-accent-foreground border-accent shadow-md"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-accent/50"
              )}
              title={option.description}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
