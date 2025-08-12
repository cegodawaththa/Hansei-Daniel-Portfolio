import { useQuery } from "@tanstack/react-query";

import { getClient } from "@/lib/rpc/client";

interface FilterParams {
  page?: number;
  limit?: number;
  search?: string | null;
  sort?: "asc" | "desc";
}

export const useGetInquiries = (params: FilterParams) => {
  const { page = 1, limit = 10, search = "", sort = "desc" } = params;

  const query = useQuery({
    queryKey: ["inquiries", { page, limit, search, sort }],
    queryFn: async () => {
      const queryParams = {
        page: page.toString(),
        limit: limit.toString(),
        sort: sort,
        ...(search && { search })
      };

      const rpcClient = await getClient();

      const response = await rpcClient.api.inquiries.$get({
        query: queryParams
      });

      if (!response.ok) {
        const { message } = await response.json();

        throw new Error(message);
      }

      const data = await response.json();

      return data;
    }
  });

  return query;
};
