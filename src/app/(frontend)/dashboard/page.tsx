import React from "react";

import { DashboardOverview } from "@/modules/dashboard/components/dashboard-overview";

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <DashboardOverview />
    </div>
  );
}
