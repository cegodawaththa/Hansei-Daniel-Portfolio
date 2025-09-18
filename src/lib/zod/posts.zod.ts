import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { postsTable } from "@/database/schema/posts.schema";

export const postsSchema = createSelectSchema(postsTable);

export type PostsSchemaT = z.infer<typeof postsSchema>;

export const insertPostsSchema = createInsertSchema(postsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export type InsertPostsSchemaT = z.infer<typeof insertPostsSchema>;

export const updatePostsSchema = insertPostsSchema.partial();

export type UpdatePostsSchemaT = z.infer<typeof updatePostsSchema>;
