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
  projectsWithExperiencesSchema,
  insertProjectsSchema,
  updateProjectsSchema
} from "@/lib/zod/projects.zod";

const tags: string[] = ["Projects"];

// List route definition (no authentication required)
export const list = createRoute({
  tags,
  summary: "List all projects",
  path: "/",
  method: "get",
  request: {
    query: queryParamsSchema
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getPaginatedSchema(z.array(projectsWithExperiencesSchema)),
      "The list of projects with experiences"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Something went wrong"
    )
  }
});

// Get project by ID route definition (no authentication required)
export const getById = createRoute({
  tags,
  summary: "Get project by ID",
  method: "get",
  path: "/:id",
  request: {
    params: stringIdParamSchema
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      projectsWithExperiencesSchema,
      "The project item with experiences"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Project not found"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Something went wrong"
    )
  }
});

// Create project route definition
export const create = createRoute({
  tags,
  summary: "Create project",
  method: "post",
  path: "/",
  request: {
    body: jsonContentRequired(insertProjectsSchema, "Create project")
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      projectsWithExperiencesSchema,
      "The project created with experiences"
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

// Update project route definition
export const update = createRoute({
  tags,
  summary: "Update project",
  method: "patch",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(updateProjectsSchema, "Update project")
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      projectsWithExperiencesSchema,
      "The project updated with experiences"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Project not found"
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

// Delete project route definition
export const remove = createRoute({
  tags,
  summary: "Remove project",
  method: "delete",
  path: "/:id",
  request: {
    params: stringIdParamSchema
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ message: z.string() }),
      "Project deleted successfully"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Project not found"
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
