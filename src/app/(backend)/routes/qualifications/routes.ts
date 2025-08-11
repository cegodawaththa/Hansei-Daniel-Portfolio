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
import {
  qualificationsSchema,
  insertQualificationsSchema,
  updateQualificationSchema
} from "@/lib/zod/qualifications.zod";

const tags: string[] = ["Qualifications"];

// List route definition (no authentication required)
export const list = createRoute({
  tags,
  summary: "List all qualifications",
  path: "/",
  method: "get",
  request: {
    query: queryParamsSchema
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getPaginatedSchema(z.array(qualificationsSchema)),
      "The list of qualifications"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Something went wrong"
    )
  }
});

// Get qualification by ID route definition (no authentication required)
export const getById = createRoute({
  tags,
  summary: "Get qualification by ID",
  method: "get",
  path: "/:id",
  request: {
    params: stringIdParamSchema
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      qualificationsSchema,
      "The qualification item"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Qualification not found"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Something went wrong"
    )
  }
});

// Create qualification route definition
export const create = createRoute({
  tags,
  summary: "Create qualification",
  method: "post",
  path: "/",
  request: {
    body: jsonContentRequired(
      insertQualificationsSchema,
      "Create qualification"
    )
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      qualificationsSchema,
      "The qualification created"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      errorMessageSchema,
      "Bad request"
    )
  }
});

// Update qualification route definition
export const update = createRoute({
  tags,
  summary: "Update qualification",
  method: "patch",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(updateQualificationSchema, "Update qualification")
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      qualificationsSchema,
      "The qualification updated"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Qualification not found"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    )
  }
});

// Delete qualification route definition
export const remove = createRoute({
  tags,
  summary: "Remove qualification",
  method: "delete",
  path: "/:id",
  request: {
    params: stringIdParamSchema
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ message: z.string() }),
      "Qualification deleted successfully"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Qualification not found"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    )
  }
});

// Export types
export type ListRoute = typeof list;
export type GetByIdRoute = typeof getById;
export type CreateRoute = typeof create;
export type UpdateRoute = typeof update;
export type RemoveRoute = typeof remove;
