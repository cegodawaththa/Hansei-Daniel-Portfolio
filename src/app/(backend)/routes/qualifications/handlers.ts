import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { desc, eq, ilike, sql } from "drizzle-orm";

import type { AppRouteHandler } from "@/lib/types/server";
import { db } from "@/database";
import { qualifications } from "@/database/schema";
import type {
  ListRoute,
  CreateRoute,
  UpdateRoute,
  RemoveRoute
} from "./routes";

// List qualifications route handler (no authentication required)
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
    const query = db.query.qualifications.findMany({
      limit: limitNum,
      offset,
      where: search ? ilike(qualifications.name, `%${search}%`) : undefined,
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
      .from(qualifications)
      .where(search ? ilike(qualifications.name, `%${search}%`) : undefined);

    const [qualificationEntries, _totalCount] = await Promise.all([
      query,
      totalCountQuery
    ]);

    const totalCount = _totalCount[0]?.count || 0;

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limitNum);

    return c.json(
      {
        data: qualificationEntries,
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

// Create qualification handler
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

  const [inserted] = await db.insert(qualifications).values(body).returning();

  if (!inserted) {
    return c.json(
      {
        message: "Qualification not created"
      },
      HttpStatusCodes.BAD_REQUEST
    );
  }

  return c.json(inserted, HttpStatusCodes.CREATED);
};

// Update qualification handler
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
    .update(qualifications)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(qualifications.id, params.id))
    .returning();

  if (!updated) {
    return c.json(
      { message: "Qualification not found" },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(updated, HttpStatusCodes.OK);
};

// Delete qualification handler
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
    .delete(qualifications)
    .where(eq(qualifications.id, params.id))
    .returning();

  if (!deleted) {
    return c.json(
      { message: "Qualification not found" },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(
    { message: "Qualification deleted successfully" },
    HttpStatusCodes.OK
  );
};
