import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId } from "react";
import { toast } from "sonner";

import { getClient } from "@/lib/rpc/client";
import { type InsertAccomplishmentsSchemaT } from "@/lib/zod/accomplishments.zod";

export const useCreateAccomplishment = () => {
  const queryClient = useQueryClient();
  const toastId = useId();

  const mutation = useMutation({
    mutationFn: async (values: InsertAccomplishmentsSchemaT) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.accomplishments.$post({
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
      toast.loading("Creating accomplishment...", {
        id: toastId
      });
    },
    onSuccess: (data) => {
      toast.success("Accomplishment created successfully!", {
        id: toastId
      });

      queryClient.invalidateQueries({
        queryKey: ["accomplishments"]
      });

      return data;
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create accomplishment", {
        id: toastId
      });
    }
  });

  return mutation;
};
