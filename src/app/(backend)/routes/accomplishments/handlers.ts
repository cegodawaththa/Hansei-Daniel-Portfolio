import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { desc, eq, ilike, sql } from "drizzle-orm";

import type { AppRouteHandler } from "@/lib/types/server";
import { db } from "@/database";
import { accomplishments } from "@/database/schema";
import type {
  ListRoute,
  GetByIdRoute,
  CreateRoute,
  UpdateRoute,
  RemoveRoute
} from "./routes";

// List accomplishments route handler (no authentication required)
export const list: AppRouteHandler<ListRoute> = async (c) => {
  const {
    page = "1",
    limit = "10",
    sort = "desc",
    search
  } = c.req.valid("query");

  // Convert to numbers and validate
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.max(1, Math.min(100, parseInt(limit))); // Cap at 100 items
  const offset = (pageNum - 1) * limitNum;

  try {
    // Build query conditions
    const query = db.query.accomplishments.findMany({
      limit: limitNum,
      offset,
      where: search ? ilike(accomplishments.title, `%${search}%`) : undefined,
      orderBy: (fields) => {
        // Handle sorting direction
        if (sort.toLowerCase() === "asc") {
          return fields.createdAt;
        }
        return desc(fields.createdAt);
      }
    });

    // Get total count for pagination metadata
    const totalCountQuery = db
      .select({ count: sql<number>`count(*)` })
      .from(accomplishments)
      .where(search ? ilike(accomplishments.title, `%${search}%`) : undefined);

    const [accomplishmentEntries, _totalCount] = await Promise.all([
      query,
      totalCountQuery
    ]);

    const totalCount = _totalCount[0]?.count || 0;

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limitNum);

    return c.json(
      {
        data: accomplishmentEntries,
        meta: {
          currentPage: pageNum,
          totalPages,
          totalCount,
          limit: limitNum
        }
      },
      HttpStatusCodes.OK
    );
  } catch {
    return c.json(
      { message: HttpStatusPhrases.INTERNAL_SERVER_ERROR },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Get accomplishment by ID handler (no authentication required)
export const getById: AppRouteHandler<GetByIdRoute> = async (c) => {
  const params = c.req.valid("param");

  try {
    const accomplishment = await db.query.accomplishments.findFirst({
      where: eq(accomplishments.id, params.id)
    });

    if (!accomplishment) {
      return c.json(
        { message: "Accomplishment not found" },
        HttpStatusCodes.NOT_FOUND
      );
    }

    return c.json(accomplishment, HttpStatusCodes.OK);
  } catch {
    return c.json(
      { message: HttpStatusPhrases.INTERNAL_SERVER_ERROR },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Create accomplishment handler
export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const session = c.get("session");
  const body = c.req.valid("json");

  if (!session) {
    return c.json(
      {
        message: HttpStatusPhrases.UNAUTHORIZED
      },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const [inserted] = await db.insert(accomplishments).values(body).returning();

  if (!inserted) {
    return c.json(
      {
        message: "Accomplishment not created"
      },
      HttpStatusCodes.BAD_REQUEST
    );
  }

  return c.json(inserted, HttpStatusCodes.CREATED);
};

// Update accomplishment handler
export const update: AppRouteHandler<UpdateRoute> = async (c) => {
  const session = c.get("session");
  const params = c.req.valid("param");
  const body = c.req.valid("json");

  if (!session) {
    return c.json(
      {
        message: HttpStatusPhrases.UNAUTHORIZED
      },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const [updated] = await db
    .update(accomplishments)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(accomplishments.id, params.id))
    .returning();

  if (!updated) {
    return c.json(
      { message: "Accomplishment not found" },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(updated, HttpStatusCodes.OK);
};

// Delete accomplishment handler
export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const session = c.get("session");
  const params = c.req.valid("param");

  if (!session) {
    return c.json(
      {
        message: HttpStatusPhrases.UNAUTHORIZED
      },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const [deleted] = await db
    .delete(accomplishments)
    .where(eq(accomplishments.id, params.id))
    .returning();

  if (!deleted) {
    return c.json(
      { message: "Accomplishment not found" },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(
    { message: "Accomplishment deleted successfully" },
    HttpStatusCodes.OK
  );
};
