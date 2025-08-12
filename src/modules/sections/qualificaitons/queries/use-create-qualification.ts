import { useId } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getClient } from "@/lib/rpc/client";
import { InsertQualificationsSchemaT } from "@/lib/zod/qualifications.zod";

export const useCreateQualification = () => {
  const queryClient = useQueryClient();
  const toastId = useId();

  const mutation = useMutation({
    mutationFn: async (values: InsertQualificationsSchemaT) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.qualifications.$post({
        json: values
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create qualification");
      }

      const result = await response.json();
      return result;
    },
    onMutate: () => {
      toast.loading("Creating qualification...", { id: toastId });
    },
    onSuccess: (data) => {
      toast.success("Qualification created successfully!", { id: toastId });
      queryClient.invalidateQueries({ queryKey: ["qualifications"] });

      return data;
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create qualification", {
        id: toastId
      });
    }
  });

  return mutation;
};
