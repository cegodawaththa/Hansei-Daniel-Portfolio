"use client";

import { Input } from "@/components/ui/input";
import { DataTableResetFilter } from "@/components/table/data-table-reset-filter";
import { usePostTableFilters } from "./use-post-table-filters";

export function PostTableActions() {
  const { searchQuery, setFilters } = usePostTableFilters();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(event) => {
            setFilters({
              search: event.target.value,
              page: "1" // Reset to first page when searching
            });
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <DataTableResetFilter
          isFilterActive={!!searchQuery}
          onReset={() =>
            setFilters({
              search: null,
              page: "1"
            })
          }
        />
      </div>
    </div>
  );
}
