/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

import { columns } from "./qualification-table/columns";
import { useGetQualifications } from "../queries/use-get-qualifications";
import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { useQualificationsTableFilters } from "./qualification-table/use-qualifications-table-filters";
import DataTableError from "@/components/table/data-table-error";

export default function QualificationsTable() {
  const { page, limit, searchQuery, sort } = useQualificationsTableFilters();

  const { data, error, isPending } = useGetQualifications({
    limit,
    page,
    search: searchQuery,
    sort: sort as any
  });

  if (isPending) {
    return <DataTableSkeleton columnCount={columns.length} rowCount={4} />;
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
