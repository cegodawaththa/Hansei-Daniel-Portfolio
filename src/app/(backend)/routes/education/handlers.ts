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
  RemoveRoute,
  ReorderRoute
} from "./routes";

// List education route handler (no authentication required)
export const list: AppRouteHandler<ListRoute> = async (c) => {
  console.log("List handler called");
  const { page = "1", limit = "10", search } = c.req.valid("query");

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
        // Always sort by priorityIndex first (ascending for proper order)
        return [fields.priorityIndex, desc(fields.createdAt)];
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
  console.log("GetById handler called with params:", c.req.param());
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

  try {
    // Get the highest priorityIndex to set the new item at the end
    const highestPriority = await db
      .select({ maxPriority: sql<number>`MAX(${education.priorityIndex})` })
      .from(education);

    const nextPriorityIndex = (highestPriority[0]?.maxPriority || 0) + 1;

    const [inserted] = await db
      .insert(education)
      .values({ ...body, priorityIndex: nextPriorityIndex })
      .returning();

    if (!inserted) {
      return c.json(
        {
          message: "Education not created"
        },
        HttpStatusCodes.BAD_REQUEST
      );
    }

    return c.json(inserted, HttpStatusCodes.CREATED);
  } catch {
    return c.json(
      { message: HttpStatusPhrases.INTERNAL_SERVER_ERROR },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
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

// Reorder education handler
export const reorder: AppRouteHandler<ReorderRoute> = async (c) => {
  console.log("Reorder handler called");

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

  try {
    // Batch update all priority indices
    const updates = body.items.map((item) =>
      db
        .update(education)
        .set({ priorityIndex: item.priorityIndex, updatedAt: new Date() })
        .where(eq(education.id, item.id))
    );

    console.log({ updates });

    await Promise.all(updates);

    return c.json(
      { message: "Education items reordered successfully" },
      HttpStatusCodes.OK
    );
  } catch {
    return c.json(
      { message: "Failed to reorder education items" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
