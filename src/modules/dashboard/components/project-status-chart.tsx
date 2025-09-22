"use client";

import React from "react";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { useGetProjects } from "@/modules/sections/projects/queries/use-get-projects";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const chartConfig = {
  completed: {
    label: "Completed",
    color: "#22c55e"
  },
  ongoing: {
    label: "Ongoing",
    color: "#3b82f6"
  },
  future: {
    label: "Upcoming",
    color: "#f59e0b"
  }
};

export function ProjectStatusChart() {
  const { data: projectsData, isLoading } = useGetProjects({ limit: 1000 });
  const projects = projectsData?.data || [];

  // Calculate status distribution
  const statusData = [
    {
      status: "completed",
      count: projects.filter((p) => p.status === "completed").length,
      fill: "#22c55e"
    },
    {
      status: "ongoing",
      count: projects.filter((p) => p.status === "ongoing").length,
      fill: "#3b82f6"
    },
    {
      status: "future",
      count: projects.filter((p) => p.status === "future").length,
      fill: "#f59e0b"
    }
  ];

  // Calculate projects by type
  const typeData = projects.reduce((acc, project) => {
    if (project.projectType) {
      const existing = acc.find((item) => item.type === project.projectType);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ type: project.projectType, count: 1 });
      }
    }
    return acc;
  }, [] as { type: string; count: number }[]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Project Analytics</CardTitle>
          <CardDescription>Loading project data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Analytics</CardTitle>
        <CardDescription>Overview of project status and types</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="status" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="status">By Status</TabsTrigger>
            <TabsTrigger value="type">By Type</TabsTrigger>
          </TabsList>

          <TabsContent value="status" className="mt-4">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0];
                        const statusLabel =
                          chartConfig[
                            data.payload.status as keyof typeof chartConfig
                          ]?.label;
                        return (
                          <div className="bg-background border rounded-lg p-2 shadow-md">
                            <p className="font-medium">{statusLabel}</p>
                            <p className="text-muted-foreground">
                              {data.value} projects
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>

            {/* Legend */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              {statusData.map((item) => (
                <div key={item.status} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.fill }}
                  />
                  <div className="text-sm">
                    <div className="font-medium capitalize">{item.status}</div>
                    <div className="text-muted-foreground">
                      {item.count} projects
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="type" className="mt-4">
            <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={typeData}>
                  <XAxis
                    dataKey="type"
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Bar
                    dataKey="count"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                  <ChartTooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border rounded-lg p-2 shadow-md">
                            <p className="font-medium">{label}</p>
                            <p className="text-muted-foreground">
                              {payload[0].value} projects
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
