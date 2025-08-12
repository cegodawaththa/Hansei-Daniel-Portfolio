import { useId } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getClient } from "@/lib/rpc/client";

export const useDeleteQualification = (id: string) => {
  const queryClient = useQueryClient();
  const toastId = useId();

  const mutation = useMutation({
    mutationFn: async () => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.qualifications[":id"].$delete({
        param: { id }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete qualification");
      }

      const result = await response.json();
      return result;
    },
    onMutate: () => {
      toast.loading("Deleting qualification...", { id: toastId });
    },
    onSuccess: (data) => {
      toast.success("Qualification deleted successfully!", { id: toastId });
      queryClient.invalidateQueries({ queryKey: ["qualifications"] });

      return data;
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete qualification", {
        id: toastId
      });
    }
  });

  return mutation;
};
