import { useId } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getClient } from "@/lib/rpc/client";
import { UpdateQualificationsSchemaT } from "@/lib/zod/qualifications.zod";

export const useUpdateQualification = (id: string) => {
  const queryClient = useQueryClient();
  const toastId = useId();

  const mutation = useMutation({
    mutationFn: async (values: UpdateQualificationsSchemaT) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.qualifications[":id"].$patch({
        param: { id },
        json: values
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update qualification");
      }

      const result = await response.json();
      return result;
    },
    onMutate: () => {
      toast.loading("Updating qualification...", { id: toastId });
    },
    onSuccess: (data) => {
      toast.success("Qualification updated successfully!", { id: toastId });
      queryClient.invalidateQueries({ queryKey: ["qualifications"] });

      return data;
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update qualification", {
        id: toastId
      });
    }
  });

  return mutation;
};
