"use client";

import React from "react";

import { AnalyticsCards } from "./analytics-cards";
import { ProjectStatusChart } from "./project-status-chart";
import { RecentActivities } from "./recent-activities";
import { QuickStats } from "./quick-stats";

export function DashboardOverview() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold font-heading">
          Welcome back, Hansie
        </h1>
        <p className="text-muted-foreground">
          {`Here's an overview of your portfolio and activities.`}
        </p>
      </div>

      {/* Analytics Cards */}
      <AnalyticsCards />

      {/* Charts and Activities Grid */}
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {/* Project Status Chart */}
        <div className="xl:col-span-2">
          <ProjectStatusChart />
        </div>

        {/* Recent Activities */}
        <div>
          <RecentActivities />
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStats />
    </div>
  );
}
