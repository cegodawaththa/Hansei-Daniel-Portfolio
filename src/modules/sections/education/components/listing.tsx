/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import DataTableError from "@/components/table/data-table-error";

import { useGetEducations } from "../queries/use-get-educations";
import { useEducationTableFilters } from "./education-table/use-education-table-filters";
import { columns } from "./education-table/columns";

export default function EducationTable() {
  const { page, limit, searchQuery, sort } = useEducationTableFilters();

  const { data, error, isPending } = useGetEducations({
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
