/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

import { columns } from "./inquiry-table/columns";
import { useGetInquiries } from "../queries/use-get-inquiries";
import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { useInquiryTableFilters } from "./inquiry-table/use-inquiry-table-filters";
import DataTableError from "@/components/table/data-table-error";

export default function InquiryTable() {
  const { page, limit, searchQuery, sort } = useInquiryTableFilters();

  const { data, error, isPending } = useGetInquiries({
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
