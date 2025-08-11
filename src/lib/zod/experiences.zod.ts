import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { experiences } from "@/database/schema/experiences.schema";

export const experiencesSchema = createSelectSchema(experiences);

export type ExperiencesSchemaT = z.infer<typeof experiencesSchema>;

export const insertExperiencesSchema = createInsertSchema(experiences).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export type InsertExperiencesSchemaT = z.infer<typeof insertExperiencesSchema>;

export const updateExperiencesSchema = insertExperiencesSchema.partial();

// For relational queries, we need to define the project schema separately to match drizzle's output
const relatedProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  thumbnails: z.array(z.string()).nullable(),
  projectType: z.string().nullable(),
  location: z.string().nullable(),
  client: z.string().nullable(),
  projectValue: z.string().nullable(),
  createdAt: z.string(), // API returns string dates
  updatedAt: z.string().nullable()
});

// Extended schema for experiences with related project data (matches API output with string dates)
export const experiencesWithProjectSchema = z
  .object({
    id: z.string(),
    role: z.string().nullable(),
    content: z.string().nullable(),
    project: z.string().nullable(), // This is the FK reference
    duration: z.string().nullable(),
    createdAt: z.string(), // API returns string dates
    updatedAt: z.string().nullable()
  })
  .extend({
    project: relatedProjectSchema.nullable() // This overrides the FK with the full object
  });

export type ExperiencesWithProjectSchemaT = z.infer<
  typeof experiencesWithProjectSchema
>;
