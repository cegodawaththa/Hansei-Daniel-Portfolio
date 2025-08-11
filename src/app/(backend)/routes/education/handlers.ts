import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { desc, eq, ilike, sql, or } from "drizzle-orm";

import type { AppRouteHandler } from "@/lib/types/server";
import { db } from "@/database";
import { education } from "@/database/schema";
import type {
  ListRoute,
  GetByIdRoute,
  CreateRoute,
  UpdateRoute,
  RemoveRoute
} from "./routes";

// List education route handler (no authentication required)
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
    // Build search conditions for title and institution
    const searchCondition = search
      ? or(
          ilike(education.title, `%${search}%`),
          ilike(education.institution, `%${search}%`)
        )
      : undefined;

    // Build query conditions
    const query = db.query.education.findMany({
      limit: limitNum,
      offset,
      where: searchCondition,
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
      .from(education)
      .where(searchCondition);

    const [educationEntries, _totalCount] = await Promise.all([
      query,
      totalCountQuery
    ]);

    const totalCount = _totalCount[0]?.count || 0;

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limitNum);

    return c.json(
      {
        data: educationEntries,
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

// Get education by ID handler (no authentication required)
export const getById: AppRouteHandler<GetByIdRoute> = async (c) => {
  const params = c.req.valid("param");

  try {
    const educationItem = await db.query.education.findFirst({
      where: eq(education.id, params.id)
    });

    if (!educationItem) {
      return c.json(
        { message: "Education not found" },
        HttpStatusCodes.NOT_FOUND
      );
    }

    return c.json(educationItem, HttpStatusCodes.OK);
  } catch {
    return c.json(
      { message: HttpStatusPhrases.INTERNAL_SERVER_ERROR },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Create education handler
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

  const [inserted] = await db.insert(education).values(body).returning();

  if (!inserted) {
    return c.json(
      {
        message: "Education not created"
      },
      HttpStatusCodes.BAD_REQUEST
    );
  }

  return c.json(inserted, HttpStatusCodes.CREATED);
};

// Update education handler
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
    .update(education)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(education.id, params.id))
    .returning();

  if (!updated) {
    return c.json(
      { message: "Education not found" },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(updated, HttpStatusCodes.OK);
};

// Delete education handler
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
    .delete(education)
    .where(eq(education.id, params.id))
    .returning();

  if (!deleted) {
    return c.json(
      { message: "Education not found" },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(
    { message: "Education deleted successfully" },
    HttpStatusCodes.OK
  );
};
