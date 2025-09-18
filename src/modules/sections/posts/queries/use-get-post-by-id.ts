import { useQuery } from "@tanstack/react-query";

import { getClient } from "@/lib/rpc/client";

export function useGetPostByID(id: string) {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.posts[":id"].$get({
        param: { id }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }

      return response.json();
    },
    enabled: !!id
  });
}
