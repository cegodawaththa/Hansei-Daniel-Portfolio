/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

import { DataTable } from "@/components/table/data-table";
import DataTableError from "@/components/table/data-table-error";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";

import { useInquiryTableFilters } from "./inquiry-table/use-inquiry-table-filters";
import { useGetInquiries } from "../queries/use-get-inquiries";
import { columns } from "./inquiry-table/columns";
import { InquiryTableActions } from "./inquiry-table/inquiry-table-actions";

export default function InquiryTable() {
  const { page, limit, searchQuery, sort } = useInquiryTableFilters();

  const { data, error, isPending } = useGetInquiries({
    limit,
    page,
    search: searchQuery,
    sort: sort as any
  });

  if (isPending) {
    return (
      <DataTableSkeleton
        columnCount={8}
        searchableColumnCount={1}
        filterableColumnCount={0}
      />
    );
  }

  if (!data || error) {
    return <DataTableError error={error} />;
  }

  return (
    <div className="space-y-4">
      <InquiryTableActions />
      <DataTable
        columns={columns as any}
        data={data.data}
        totalItems={data.meta.totalCount}
      />
    </div>
  );
}
