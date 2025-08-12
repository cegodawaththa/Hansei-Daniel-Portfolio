import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId } from "react";
import { toast } from "sonner";

import { getClient } from "@/lib/rpc/client";
import { type InsertProjectsSchemaT } from "@/lib/zod/projects.zod";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const toastId = useId();

  const mutation = useMutation({
    mutationFn: async (values: InsertProjectsSchemaT) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.projects.$post({
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
      toast.loading("Creating project...", {
        id: toastId
      });
    },
    onSuccess: (data) => {
      toast.success("Project created successfully!", {
        id: toastId
      });

      queryClient.invalidateQueries({
        queryKey: ["projects"]
      });

      return data;
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create project", {
        id: toastId
      });
    }
  });

  return mutation;
};
