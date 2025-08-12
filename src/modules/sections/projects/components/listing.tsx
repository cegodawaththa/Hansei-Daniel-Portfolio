/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import DataTableError from "@/components/table/data-table-error";

import { useGetProjects } from "../queries/use-get-projects";
import { useProjectTableFilters } from "./project-table/use-project-table-filters";
import { columns } from "./project-table/columns";

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
    <DataTable
      columns={columns as any}
      data={data.data}
      totalItems={data.meta.totalCount}
    />
  );
}
