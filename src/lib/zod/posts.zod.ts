import { z } from "zod";

// Define posts schema using plain Zod objects to avoid deep type instantiation issues
export const postsSchema = z.object({
  id: z.string(),
  thumbnail: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().nullable()
});

export type PostsSchemaT = z.infer<typeof postsSchema>;

export const insertPostsSchema = z.object({
  thumbnail: z.string(),
  title: z.string(),
  content: z.string()
});

export type InsertPostsSchemaT = z.infer<typeof insertPostsSchema>;

export const updatePostsSchema = z.object({
  thumbnail: z.string().optional(),
  title: z.string().optional(),
  content: z.string().optional()
});

export type UpdatePostsSchemaT = z.infer<typeof updatePostsSchema>;
