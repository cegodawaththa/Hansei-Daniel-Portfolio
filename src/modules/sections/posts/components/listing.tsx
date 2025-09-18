/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import DataTableError from "@/components/table/data-table-error";

import { useGetPosts } from "../queries/use-get-posts";
import { usePostTableFilters } from "./post-table/use-post-table-filters";
import { columns } from "./post-table/columns";

export default function PostTable() {
  const { page, limit, searchQuery, sort } = usePostTableFilters();

  const { data, error, isPending } = useGetPosts({
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
