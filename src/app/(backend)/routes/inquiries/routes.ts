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
  inquiriesAPIResponseSchema,
  insertInquiriesSchema,
  updateInquiriesSchema
} from "@/lib/zod/inquiries.zod";

const tags: string[] = ["Inquiries"];

// List route definition (authentication required - admin only)
export const list = createRoute({
  tags,
  summary: "List all inquiries",
  path: "/",
  method: "get",
  request: {
    query: queryParamsSchema
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getPaginatedSchema(z.array(inquiriesAPIResponseSchema)),
      "The list of inquiries"
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

// Get inquiry by ID route definition (authentication required - admin only)
export const getById = createRoute({
  tags,
  summary: "Get inquiry by ID",
  method: "get",
  path: "/:id",
  request: {
    params: stringIdParamSchema
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      inquiriesAPIResponseSchema,
      "The inquiry item"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Inquiry not found"
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

// Create inquiry route definition (public - no authentication for contact forms)
export const create = createRoute({
  tags,
  summary: "Create inquiry",
  method: "post",
  path: "/",
  request: {
    body: jsonContentRequired(insertInquiriesSchema, "Create inquiry")
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      inquiriesAPIResponseSchema,
      "The inquiry created"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      errorMessageSchema,
      "Bad request"
    )
  }
});

// Update inquiry route definition (authentication required - for status updates)
export const update = createRoute({
  tags,
  summary: "Update inquiry",
  method: "patch",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(updateInquiriesSchema, "Update inquiry")
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      inquiriesAPIResponseSchema,
      "The inquiry updated"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Inquiry not found"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    )
  }
});

// Delete inquiry route definition (authentication required)
export const remove = createRoute({
  tags,
  summary: "Remove inquiry",
  method: "delete",
  path: "/:id",
  request: {
    params: stringIdParamSchema
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ message: z.string() }),
      "Inquiry deleted successfully"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Inquiry not found"
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
