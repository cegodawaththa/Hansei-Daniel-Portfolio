/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import DataTableError from "@/components/table/data-table-error";

import { useGetAccomplishments } from "../queries/use-get-accomplishments";
import { useAccomplishmentTableFilters } from "./accomplishment-table/use-accomplishment-table-filters";
import { columns } from "./accomplishment-table/columns";

export default function AccomplishmentTable() {
  const { page, limit, searchQuery, sort } = useAccomplishmentTableFilters();

  const { data, error, isPending } = useGetAccomplishments({
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
