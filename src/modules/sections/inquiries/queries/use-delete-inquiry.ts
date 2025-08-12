import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId } from "react";
import { toast } from "sonner";

import { getClient } from "@/lib/rpc/client";

export const useDeleteInquiry = (id: string) => {
  const queryClient = useQueryClient();
  const toastId = useId();

  const mutation = useMutation({
    mutationFn: async () => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.inquiries[":id"].$delete({
        param: { id }
      });

      if (!response.ok) {
        const { message } = await response.json();

        throw new Error(message);
      }

      const data = await response.json();

      return data;
    },
    onMutate: () => {
      toast.loading("Deleting inquiry...", { id: toastId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      toast.success("Inquiry deleted successfully", { id: toastId });
    },
    onError: (error) => {
      console.error("Delete inquiry error:", error);
      toast.error("Failed to delete inquiry", { id: toastId });
    }
  });

  return mutation;
};
