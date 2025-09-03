import { useQuery } from "@tanstack/react-query";
import { getClient } from "@/lib/rpc/client";

export const useGetCvLink = () => {
  const query = useQuery({
    queryKey: ["settings", "cvLink"],
    queryFn: async () => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.settings.$get();

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }

      const data = await response.json();
      return data?.cvLink || null;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000 // 10 minutes
  });

  return query;
};
