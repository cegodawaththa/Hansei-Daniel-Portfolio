"use client";

import React from "react";
import {
  Building,
  GraduationCap,
  MessageSquare,
  NewspaperIcon,
  TrendingUp,
  TrendingDown
} from "lucide-react";

import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetProjects } from "@/modules/sections/projects/queries/use-get-projects";
import { useGetEducations } from "@/modules/sections/education/queries/use-get-educations";
import { useGetInquiries } from "@/modules/sections/inquiries/queries/use-get-inquiries";
import { useGetPosts } from "@/modules/sections/posts/queries/use-get-posts";

interface AnalyticsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
  subtitle?: string;
  isLoading?: boolean;
}

function AnalyticsCard({
  title,
  value,
  icon,
  trend,
  subtitle,
  isLoading = false
}: AnalyticsCardProps) {
  return (
    <Card className="relative overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 group">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 -mr-8 -mt-8 transform rotate-12 group-hover:rotate-6 transition-transform duration-500">
        {icon}
      </div>

      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </p>
          {isLoading ? (
            <div className="h-8 w-20 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse rounded-lg" />
          ) : (
            <div className="text-3xl font-bold font-heading text-foreground group-hover:text-primary transition-colors duration-300">
              {value}
            </div>
          )}
          {subtitle && (
            <p className="text-xs text-muted-foreground font-medium mt-1">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-col items-end space-y-2">
          {/* Icon with colored background */}
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
            <div className="h-5 w-5 flex items-center justify-center">
              {icon}
            </div>
          </div>

          {trend && (
            <Badge
              variant={trend.direction === "up" ? "default" : "secondary"}
              className={`text-xs font-semibold ${
                trend.direction === "up"
                  ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300"
                  : "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300"
              }`}
            >
              {trend.direction === "up" ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {trend.value > 0 ? "+" : ""}
              {trend.value}%
            </Badge>
          )}
        </div>
      </CardHeader>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Card>
  );
}

export function AnalyticsCards() {
  const { data: projectsData, isLoading: projectsLoading } = useGetProjects({
    limit: 1000
  });

  const { data: educationData, isLoading: educationLoading } = useGetEducations(
    {
      limit: 1000
    }
  );

  const { data: inquiriesData, isLoading: inquiriesLoading } = useGetInquiries({
    limit: 1000
  });

  const { data: postsData, isLoading: postsLoading } = useGetPosts({
    limit: "1000"
  });

  const projects = projectsData?.data || [];
  const completedProjects = projects.filter(
    (p) => p.status === "completed"
  ).length;
  const unreadInquiries =
    inquiriesData?.data?.filter((i) => i.status === "unread").length || 0;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
      <AnalyticsCard
        title="Total Projects"
        value={projects.length}
        icon={<Building className="h-4 w-4" />}
        subtitle={`${completedProjects} completed`}
        isLoading={projectsLoading}
      />

      <AnalyticsCard
        title="New Inquiries"
        value={unreadInquiries}
        icon={<MessageSquare className="h-4 w-4" />}
        trend={{ value: 25, direction: "up" }}
        isLoading={inquiriesLoading}
      />

      <AnalyticsCard
        title="Market Posts"
        value={postsData?.data?.length || 0}
        icon={<NewspaperIcon className="h-4 w-4" />}
        subtitle="Published"
        isLoading={postsLoading}
      />

      <AnalyticsCard
        title="Education"
        value={educationData?.data?.length || 0}
        icon={<GraduationCap className="h-4 w-4" />}
        subtitle="Qualifications"
        isLoading={educationLoading}
      />
    </div>
  );
}
