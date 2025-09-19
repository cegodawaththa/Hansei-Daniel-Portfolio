import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getClient } from "@/lib/rpc/client";
import type { UpdatePostsSchemaT } from "@/lib/zod/posts.zod";

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      values
    }: {
      id: string;
      values: UpdatePostsSchemaT;
    }) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.posts[":id"].$patch({
        param: { id },
        json: values
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      return response.json();
    },
    onSuccess: (_, { id }) => {
      toast.success("Post updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts", id] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to update post: ${error.message}`);
    }
  });
}
