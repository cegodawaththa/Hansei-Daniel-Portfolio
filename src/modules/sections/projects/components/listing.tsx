/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import DataTableError from "@/components/table/data-table-error";

import { useGetProjects } from "../queries/use-get-projects";
import { useProjectTableFilters } from "./project-table/use-project-table-filters";
import { DraggableProjectTable } from "./project-table/draggable-project-table";

export default function ProjectTable() {
  const { page, limit, searchQuery, sort } = useProjectTableFilters();

  const { data, error, isPending } = useGetProjects({
    limit,
    page,
    search: searchQuery,
    sort: sort as any
  });

  if (isPending) {
    return <DataTableSkeleton />;
  }

  if (!data || error) {
    return <DataTableError error={error} />;
  }

  return (
    <div className="space-y-4">
      <DraggableProjectTable data={data.data} />

      {/* Simple pagination info */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          Showing {data.data.length} of {data.meta.totalCount} project entries
        </div>
        <div className="text-sm text-muted-foreground">
          Page {data.meta.currentPage} of {data.meta.totalPages}
        </div>
      </div>
    </div>
  );
}
