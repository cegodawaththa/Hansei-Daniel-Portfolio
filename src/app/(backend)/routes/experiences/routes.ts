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
  insertExperiencesSchema,
  updateExperiencesSchema,
  experiencesWithProjectSchema
} from "@/lib/zod/experiences.zod";

const tags: string[] = ["Experiences"];

// List route definition (no authentication required) - includes related project data
export const list = createRoute({
  tags,
  summary: "List all experiences with related projects",
  path: "/",
  method: "get",
  request: {
    query: queryParamsSchema
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getPaginatedSchema(z.array(experiencesWithProjectSchema)),
      "The list of experiences with related projects"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Something went wrong"
    )
  }
});

// Get experience by ID route definition (no authentication required) - includes related project data
export const getById = createRoute({
  tags,
  summary: "Get experience by ID with related project",
  method: "get",
  path: "/:id",
  request: {
    params: stringIdParamSchema
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      experiencesWithProjectSchema,
      "The experience with related project"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Experience not found"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Something went wrong"
    )
  }
});

// Create experience route definition
export const create = createRoute({
  tags,
  summary: "Create experience",
  method: "post",
  path: "/",
  request: {
    body: jsonContentRequired(insertExperiencesSchema, "Create experience")
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      experiencesWithProjectSchema,
      "The experience created with related project"
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

// Update experience route definition
export const update = createRoute({
  tags,
  summary: "Update experience",
  method: "patch",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(updateExperiencesSchema, "Update experience")
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      experiencesWithProjectSchema,
      "The experience updated with related project"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Experience not found"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Something went wrong"
    )
  }
});

// Delete experience route definition
export const remove = createRoute({
  tags,
  summary: "Remove experience",
  method: "delete",
  path: "/:id",
  request: {
    params: stringIdParamSchema
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ message: z.string() }),
      "Experience deleted successfully"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Experience not found"
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
