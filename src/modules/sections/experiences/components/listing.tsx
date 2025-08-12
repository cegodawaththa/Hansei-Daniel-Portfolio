/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import DataTableError from "@/components/table/data-table-error";

import { useGetExperiences } from "../queries/use-get-experiences";
import { useExperienceTableFilters } from "./experience-table/use-experience-table-filters";
import { columns } from "./experience-table/columns";

export default function ExperienceTable() {
  const { page, limit, searchQuery, sort } = useExperienceTableFilters();

  const { data, error, isPending } = useGetExperiences({
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
