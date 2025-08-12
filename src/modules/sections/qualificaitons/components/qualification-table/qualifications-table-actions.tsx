"use client";
import React from "react";

import { useQualificationsTableFilters } from "./use-qualifications-table-filters";
import { DataTableSearch } from "@/components/table/data-table-search";
import { DataTableResetFilter } from "@/components/table/data-table-reset-filter";
import { Button } from "@/components/ui/button";
import { SortAsc, SortDesc } from "lucide-react";

export function QualificationsTableActions() {
  const {
    // Search
    searchQuery,
    setSearchQuery,

    // Pagination
    setPage,

    sort,
    setSort,

    // Reset
    resetFilters,
    isAnyFilterActive
  } = useQualificationsTableFilters();

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={() => setSort(sort === "asc" ? "desc" : "asc")}
        >
          {sort === "asc" ? <SortAsc /> : <SortDesc />}
        </Button>

        <DataTableSearch
          searchKey="name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
      </div>
      <DataTableResetFilter
        isFilterActive={isAnyFilterActive}
        onReset={resetFilters}
      />
    </div>
  );
}
