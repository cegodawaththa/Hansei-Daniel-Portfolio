import { useQuery } from "@tanstack/react-query";

import { getClient } from "@/lib/rpc/client";

export const useGetAccomplishmentByID = (id: string) => {
  const query = useQuery({
    queryKey: ["accomplishments", { id }],
    queryFn: async () => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.accomplishments[":id"].$get({
        param: { id }
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
