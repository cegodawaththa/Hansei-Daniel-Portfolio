import { useQuery } from "@tanstack/react-query";

import { getClient } from "@/lib/rpc/client";

export const useGetQualificationByID = (id: string) => {
  const query = useQuery({
    queryKey: ["qualifications", { id }],
    queryFn: async () => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.qualifications[":id"].$get({
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
