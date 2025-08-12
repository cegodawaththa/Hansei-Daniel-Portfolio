"use client";

import { useCallback, useMemo } from "react";
import { useQueryState } from "nuqs";

import { searchParams } from "@/lib/searchparams";

export function useQualificationsTableFilters() {
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
    searchParams.sort.withDefault("asc")
  );

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setSort("asc");
    setPage(1);
    setLimit(10);
  }, [setSearchQuery, setPage, setLimit, setSort]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!sort || !!page || !!limit;
  }, [searchQuery, sort, page, limit]);

  return {
    // Search
    searchQuery,
    setSearchQuery,

    // Pagination
    page,
    setPage,
    limit,
    setLimit,

    // Sorting
    sort,
    setSort,

    // Reset
    resetFilters,
    isAnyFilterActive
  };
}
