import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId } from "react";
import { toast } from "sonner";

import { getClient } from "@/lib/rpc/client";
import { type UpdateAccomplishmentsSchemaT } from "@/lib/zod/accomplishments.zod";

export const useUpdateAccomplishment = (id: string) => {
  const queryClient = useQueryClient();
  const toastId = useId();

  const mutation = useMutation({
    mutationFn: async (values: UpdateAccomplishmentsSchemaT) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.accomplishments[":id"].$patch({
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
      toast.loading("Updating accomplishment...", {
        id: toastId
      });
    },
    onSuccess: (data) => {
      toast.success("Accomplishment updated successfully!", {
        id: toastId
      });

      queryClient.invalidateQueries({
        queryKey: ["accomplishments"]
      });

      queryClient.invalidateQueries({
        queryKey: ["accomplishments", { id }]
      });

      return data;
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update accomplishment", {
        id: toastId
      });
    }
  });

  return mutation;
};
