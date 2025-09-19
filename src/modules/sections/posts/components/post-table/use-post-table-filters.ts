/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export function usePostTableFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = searchParams?.get("page") ?? "1";
  const limit = searchParams?.get("limit") ?? "10";
  const sort = searchParams?.get("sort") ?? "desc";
  const search = searchParams?.get("search") ?? "";

  const filters = useMemo(
    () => ({
      page,
      limit,
      sort,
      search
    }),
    [page, limit, sort, search]
  );

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  const setFilters = useCallback(
    (filters: any) => {
      router.push(`${pathname}?${createQueryString(filters)}`);
    },
    [pathname, createQueryString, router]
  );

  return {
    ...filters,
    searchQuery: search,
    setFilters
  };
}
