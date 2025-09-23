import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { z } from "zod";

import {
  errorMessageSchema,
  getPaginatedSchema,
  queryParamsSchema,
  stringIdParamSchema
} from "@/lib/server/helpers";

// Schema for reordering education items
const reorderEducationSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      priorityIndex: z.number().int().min(0)
    })
  )
});
import {
  educationSchema,
  insertEducationSchema,
  updateEducationSchema
} from "@/lib/zod/education.zod";

const tags: string[] = ["Education"];

// List route definition (no authentication required)
export const list = createRoute({
  tags,
  summary: "List all education",
  path: "/",
  method: "get",
  request: {
    query: queryParamsSchema
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getPaginatedSchema(z.array(educationSchema)),
      "The list of education"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Something went wrong"
    )
  }
});

// Get education by ID route definition (no authentication required)
export const getById = createRoute({
  tags,
  summary: "Get education by ID",
  method: "get",
  path: "/:id",
  request: {
    params: stringIdParamSchema
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(educationSchema, "The education item"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Education not found"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Something went wrong"
    )
  }
});

// Create education route definition
export const create = createRoute({
  tags,
  summary: "Create education",
  method: "post",
  path: "/",
  request: {
    body: jsonContentRequired(insertEducationSchema, "Create education")
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      educationSchema,
      "The education created"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      errorMessageSchema,
      "Bad request"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Something went wrong"
    )
  }
});

// Update education route definition
export const update = createRoute({
  tags,
  summary: "Update education",
  method: "patch",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(updateEducationSchema, "Update education")
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(educationSchema, "The education updated"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Education not found"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    )
  }
});

// Delete education route definition
export const remove = createRoute({
  tags,
  summary: "Remove education",
  method: "delete",
  path: "/:id",
  request: {
    params: stringIdParamSchema
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ message: z.string() }),
      "Education deleted successfully"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Education not found"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    )
  }
});

// Reorder education route definition
export const reorder = createRoute({
  tags,
  summary: "Reorder education items",
  method: "patch",
  path: "/reorder",
  request: {
    body: jsonContentRequired(reorderEducationSchema, "Reorder education items")
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ message: z.string() }),
      "Education items reordered successfully"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Failed to reorder education items"
    )
  }
});

// Export types
export type ListRoute = typeof list;
export type GetByIdRoute = typeof getById;
export type CreateRoute = typeof create;
export type UpdateRoute = typeof update;
export type RemoveRoute = typeof remove;
export type ReorderRoute = typeof reorder;
