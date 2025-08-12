"use client";

import { parseAsInteger, parseAsStringLiteral, useQueryState } from "nuqs";

import { searchParams } from "@/lib/searchparams";

export function useInquiryTableFilters() {
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
    parseAsInteger.withDefault(10)
  );

  const [sort, setSort] = useQueryState(
    "sort",
    parseAsStringLiteral(["asc", "desc"]).withDefault("desc")
  );

  const resetFilters = () => {
    setSearchQuery("");
    setPage(1);
    setSort("desc");
    setLimit(10);
  };

  const isAnyFilterActive =
    Boolean(searchQuery) || page !== 1 || sort !== "desc" || limit !== 10;

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    limit,
    setLimit,
    sort,
    setSort,
    resetFilters,
    isAnyFilterActive
  };
}
