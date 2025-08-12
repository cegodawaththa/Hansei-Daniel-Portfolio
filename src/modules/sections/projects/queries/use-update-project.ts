import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId } from "react";
import { toast } from "sonner";

import { getClient } from "@/lib/rpc/client";
import { type UpdateProjectsSchemaT } from "@/lib/zod/projects.zod";

export const useUpdateProject = (id: string) => {
  const queryClient = useQueryClient();
  const toastId = useId();

  const mutation = useMutation({
    mutationFn: async (values: UpdateProjectsSchemaT) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.projects[":id"].$patch({
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
      toast.loading("Updating project...", {
        id: toastId
      });
    },
    onSuccess: (data) => {
      toast.success("Project updated successfully!", {
        id: toastId
      });

      queryClient.invalidateQueries({
        queryKey: ["projects"]
      });

      queryClient.invalidateQueries({
        queryKey: ["projects", { id }]
      });

      return data;
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update project", {
        id: toastId
      });
    }
  });

  return mutation;
};
