"use client";

import { DataTableResetFilter } from "@/components/table/data-table-reset-filter";
import { DataTableSearch } from "@/components/table/data-table-search";

import { useInquiryTableFilters } from "./use-inquiry-table-filters";

export function InquiryTableActions() {
  const {
    // Search
    searchQuery,
    setSearchQuery,

    // Pagination
    setPage,

    // Reset
    resetFilters,
    isAnyFilterActive
  } = useInquiryTableFilters();

  return (
    <div className="flex flex-wrap items-center gap-4">
      <DataTableSearch
        searchKey="search"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />
      <DataTableResetFilter
        isFilterActive={isAnyFilterActive}
        onReset={resetFilters}
      />
    </div>
  );
}
