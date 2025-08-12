import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId } from "react";
import { toast } from "sonner";

import { getClient } from "@/lib/rpc/client";
import { UpdateInquiriesSchemaT } from "@/lib/zod/inquiries.zod";

export const useUpdateInquiry = (id: string) => {
  const queryClient = useQueryClient();
  const toastId = useId();

  const mutation = useMutation({
    mutationFn: async (values: UpdateInquiriesSchemaT) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.inquiries[":id"].$patch({
        param: { id },
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
      toast.loading("Updating inquiry...", { id: toastId });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      queryClient.setQueryData(["inquiries", { id }], data);
      toast.success("Inquiry updated successfully", { id: toastId });
    },
    onError: (error) => {
      console.error("Update inquiry error:", error);
      toast.error("Failed to update inquiry", { id: toastId });
    }
  });

  return mutation;
};
