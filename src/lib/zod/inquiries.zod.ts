import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { inquiries } from "@/database/schema/inquiries.schema";

export const inquiriesSchema = createSelectSchema(inquiries);

export type InquiriesSchemaT = z.infer<typeof inquiriesSchema>;

export const insertInquiriesSchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export type InsertInquiriesSchemaT = z.infer<typeof insertInquiriesSchema>;

export const updateInquiriesSchema = insertInquiriesSchema.partial();

export type UpdateInquiriesSchemaT = z.infer<typeof updateInquiriesSchema>;
