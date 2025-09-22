"use client";

import React from "react";
import { MapPin, Calendar, Star, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetProjects } from "@/modules/sections/projects/queries/use-get-projects";
import { useGetInquiries } from "@/modules/sections/inquiries/queries/use-get-inquiries";

export function QuickStats() {
  const { data: projectsData, isLoading: projectsLoading } = useGetProjects({
    limit: 1000
  });
  const { data: inquiriesData, isLoading: inquiriesLoading } = useGetInquiries({
    limit: 1000
  });

  const projects = projectsData?.data || [];
  const inquiries = inquiriesData?.data || [];

  // Calculate unique locations
  const uniqueLocations = new Set(
    projects.map((p) => p.location).filter(Boolean)
  ).size;

  // Calculate unique clients
  const uniqueClients = new Set(projects.map((p) => p.client).filter(Boolean))
    .size;

  // Calculate current year projects
  const currentYear = new Date().getFullYear();
  const currentYearInquiries = inquiries.filter(
    (i) => new Date(i.createdAt).getFullYear() === currentYear
  ).length;

  // Project value calculation (if available)
  const projectsWithValue = projects.filter((p) => p.projectValue).length;

  const stats = [
    {
      label: "Project Locations",
      value: uniqueLocations,
      icon: <MapPin className="w-4 h-4" />,
      description: "Cities/Areas covered"
    },
    {
      label: "Clients Served",
      value: uniqueClients,
      icon: <Users className="w-4 h-4" />,
      description: "Total client base"
    },
    {
      label: "This Year Inquiries",
      value: currentYearInquiries,
      icon: <Calendar className="w-4 h-4" />,
      description: "New business opportunities"
    },
    {
      label: "Valued Projects",
      value: projectsWithValue,
      icon: <Star className="w-4 h-4" />,
      description: "Projects with defined value"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Insights</CardTitle>
        <CardDescription>
          Key metrics about your professional portfolio
        </CardDescription>
      </CardHeader>
      <CardContent>
        {projectsLoading || inquiriesLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-8 bg-muted rounded animate-pulse" />
                <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  {stat.icon}
                  <span className="text-sm font-medium">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold font-heading">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Additional Insights */}
        <div className="mt-6 pt-6 border-t">
          <h4 className="text-sm font-medium mb-3">Project Status Overview</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">
              {projects.filter((p) => p.status === "completed").length}{" "}
              Completed
            </Badge>
            <Badge variant="secondary">
              {projects.filter((p) => p.status === "ongoing").length} In
              Progress
            </Badge>
            <Badge variant="outline">
              {projects.filter((p) => p.status === "future").length} Upcoming
            </Badge>
          </div>
        </div>

        {/* Recent Performance Indicator */}
        <div className="mt-4 p-3 bg-accent/10 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Portfolio Status</p>
              <p className="text-xs text-muted-foreground">
                All systems operational
              </p>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-green-700">Active</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
