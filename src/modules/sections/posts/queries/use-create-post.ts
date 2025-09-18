import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getClient } from "@/lib/rpc/client";
import type { InsertPostsSchemaT } from "@/lib/zod/posts.zod";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: InsertPostsSchemaT) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.posts.$post({
        json: values
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Post created successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to create post: ${error.message}`);
    }
  });
}
