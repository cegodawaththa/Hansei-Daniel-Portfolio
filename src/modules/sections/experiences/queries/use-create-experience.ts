import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId } from "react";
import { toast } from "sonner";

import { getClient } from "@/lib/rpc/client";
import { type InsertExperiencesSchemaT } from "@/lib/zod/experiences.zod";

export const useCreateExperience = () => {
  const queryClient = useQueryClient();
  const toastId = useId();

  const mutation = useMutation({
    mutationFn: async (values: InsertExperiencesSchemaT) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.experiences.$post({
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
      toast.loading("Adding new experience...", {
        id: toastId
      });
    },
    onSuccess: (data) => {
      toast.success("Experience created successfully!", {
        id: toastId
      });

      queryClient.invalidateQueries({
        queryKey: ["experiences"]
      });

      return data;
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create experience", {
        id: toastId
      });
    }
  });

  return mutation;
};
