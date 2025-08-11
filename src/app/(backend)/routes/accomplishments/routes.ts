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
  accomplishmentsSchema,
  insertAccomplishmentsSchema,
  updateAccomplishmentsSchema
} from "@/lib/zod/accomplishments.zod";

const tags: string[] = ["Accomplishments"];

// List route definition (no authentication required)
export const list = createRoute({
  tags,
  summary: "List all accomplishments",
  path: "/",
  method: "get",
  request: {
    query: queryParamsSchema
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getPaginatedSchema(z.array(accomplishmentsSchema)),
      "The list of accomplishments"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Something went wrong"
    )
  }
});

// Get accomplishment by ID route definition (no authentication required)
export const getById = createRoute({
  tags,
  summary: "Get accomplishment by ID",
  method: "get",
  path: "/:id",
  request: {
    params: stringIdParamSchema
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      accomplishmentsSchema,
      "The accomplishment item"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Accomplishment not found"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Something went wrong"
    )
  }
});

// Create accomplishment route definition
export const create = createRoute({
  tags,
  summary: "Create accomplishment",
  method: "post",
  path: "/",
  request: {
    body: jsonContentRequired(
      insertAccomplishmentsSchema,
      "Create accomplishment"
    )
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      accomplishmentsSchema,
      "The accomplishment created"
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

// Update accomplishment route definition
export const update = createRoute({
  tags,
  summary: "Update accomplishment",
  method: "patch",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(
      updateAccomplishmentsSchema,
      "Update accomplishment"
    )
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      accomplishmentsSchema,
      "The accomplishment updated"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Accomplishment not found"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    )
  }
});

// Delete accomplishment route definition
export const remove = createRoute({
  tags,
  summary: "Remove accomplishment",
  method: "delete",
  path: "/:id",
  request: {
    params: stringIdParamSchema
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ message: z.string() }),
      "Accomplishment deleted successfully"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Accomplishment not found"
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
