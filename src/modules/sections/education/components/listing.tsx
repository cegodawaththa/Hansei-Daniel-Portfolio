"use client";

import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import DataTableError from "@/components/table/data-table-error";

import { useGetEducations } from "../queries/use-get-educations";
import { useEducationTableFilters } from "./education-table/use-education-table-filters";
import { DraggableEducationTable } from "./education-table/draggable-education-table";

export default function EducationTable() {
  const { page, limit, searchQuery } = useEducationTableFilters();

  const { data, error, isPending } = useGetEducations({
    limit,
    page,
    search: searchQuery
  });

  if (isPending) {
    return <DataTableSkeleton />;
  }

  if (!data || error) {
    return <DataTableError error={error} />;
  }

  return (
    <div className="space-y-4">
      <DraggableEducationTable data={data.data} />

      {/* Simple pagination info */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          Showing {data.data.length} of {data.meta.totalCount} education entries
        </div>
        <div className="text-sm text-muted-foreground">
          Page {data.meta.currentPage} of {data.meta.totalPages}
        </div>
      </div>
    </div>
  );
}
