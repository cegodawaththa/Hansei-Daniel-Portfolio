"use client";

import { useQueryState } from "nuqs";

import { searchParams } from "@/lib/searchparams";

export function useProjectTableFilters() {
  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault("")
  );

  const [page, setPage] = useQueryState(
    "page",
    searchParams.page.withDefault(1)
  );

  const [limit, setLimit] = useQueryState(
    "limit",
    searchParams.limit.withDefault(10)
  );

  const [sort, setSort] = useQueryState(
    "sort",
    searchParams.sort.withDefault("desc")
  );

  const resetFilters = () => {
    setSearchQuery("");
    setPage(1);
    setSort("desc");
  };

  const isAnyFilterActive = searchQuery !== "" || sort !== "desc";

  return {
    // Search
    searchQuery,
    setSearchQuery,

    // Pagination
    page,
    setPage,
    limit,
    setLimit,

    // Sort
    sort,
    setSort,

    // Reset
    resetFilters,
    isAnyFilterActive
  };
}
