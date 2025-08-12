import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId } from "react";
import { toast } from "sonner";

import { getClient } from "@/lib/rpc/client";
import { type UpdateExperiencesSchemaT } from "@/lib/zod/experiences.zod";

export const useCreateExperience = (id: string) => {
  const queryClient = useQueryClient();
  const toastId = useId();

  const mutation = useMutation({
    mutationFn: async (values: UpdateExperiencesSchemaT) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.experiences[":id"].$patch({
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
      toast.loading("Updating experience...", {
        id: toastId
      });
    },
    onSuccess: (data) => {
      toast.success("Experience updated successfully!", {
        id: toastId
      });

      queryClient.invalidateQueries({
        queryKey: ["experiences"]
      });

      return data;
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update experience", {
        id: toastId
      });
    }
  });

  return mutation;
};
