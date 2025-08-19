import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId } from "react";
import { toast } from "sonner";

import { getClient } from "@/lib/rpc/client";
import { InsertInquiriesSchemaT } from "@/lib/zod/inquiries.zod";

export const useSendInquiry = () => {
  const queryClient = useQueryClient();
  const toastId = useId();

  const mutation = useMutation({
    mutationFn: async (values: InsertInquiriesSchemaT) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.inquiries.$post({
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
      toast.loading("Sending message...", { id: toastId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      toast.success("Message sent successfully", { id: toastId });
    },
    onError: (error) => {
      console.error("Send message error:", error);
      toast.error("Failed to send message", { id: toastId });
    }
  });

  return mutation;
};
