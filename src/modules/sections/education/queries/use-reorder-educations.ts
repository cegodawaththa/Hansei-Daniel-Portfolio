import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId } from "react";
import { toast } from "sonner";

import { getClient } from "@/lib/rpc/client";

interface ReorderItem {
  id: string;
  priorityIndex: number;
}

interface ReorderEducationPayload {
  items: ReorderItem[];
}

export const useReorderEducations = () => {
  const queryClient = useQueryClient();
  const toastId = useId();

  const mutation = useMutation({
    mutationFn: async (values: ReorderEducationPayload) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.education.reorder.$patch({
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
      toast.loading("Reordering education items...", {
        id: toastId
      });
    },
    onSuccess: (data) => {
      toast.success("Education items reordered successfully!", {
        id: toastId
      });

      queryClient.invalidateQueries({
        queryKey: ["educations"]
      });

      return data;
    },
    onError: (error) => {
      toast.error(error.message || "Failed to reorder education items", {
        id: toastId
      });
    }
  });

  return mutation;
};
