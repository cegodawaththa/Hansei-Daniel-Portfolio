import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId } from "react";
import { toast } from "sonner";

import { getClient } from "@/lib/rpc/client";

interface ReorderItem {
  id: string;
  orderIndex: number;
}

interface ReorderProjectPayload {
  items: ReorderItem[];
}

export const useReorderProjects = () => {
  const queryClient = useQueryClient();
  const toastId = useId();

  const mutation = useMutation({
    mutationFn: async (values: ReorderProjectPayload) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.projects.reorder.$patch({
        json: values
      });

      if (!response.ok) {
        const { message } = await response.json();

        throw new Error(message);
      }

      const data = await response.json();
      return data;
    },
    onMutate: () => {
      toast.loading("Reordering project items...", {
        id: toastId
      });
    },
    onSuccess: (data) => {
      toast.success("Project items reordered successfully!", {
        id: toastId
      });

      queryClient.invalidateQueries({
        queryKey: ["projects"]
      });

      return data;
    },
    onError: (error) => {
      toast.error(error.message || "Failed to reorder project items", {
        id: toastId
      });
    }
  });

  return mutation;
};
