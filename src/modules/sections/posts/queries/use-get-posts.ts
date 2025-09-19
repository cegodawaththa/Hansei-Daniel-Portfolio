import { useQuery } from "@tanstack/react-query";

import { getClient } from "@/lib/rpc/client";

export interface UseGetPostsOptions {
  page?: string;
  limit?: string;
  sort?: "asc" | "desc";
  search?: string;
}

export function useGetPosts(options: UseGetPostsOptions = {}) {
  const { page = "1", limit = "10", sort = "desc", search } = options;

  return useQuery({
    queryKey: ["posts", { page, limit, sort, search }],
    queryFn: async () => {
      const rpcClient = await getClient();
      const response = await rpcClient.api.posts.$get({
        query: {
          page,
          limit,
          sort,
          ...(search && { search })
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      return response.json();
    }
  });
}
