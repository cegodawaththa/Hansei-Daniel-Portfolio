import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { desc, eq, ilike, sql, or } from "drizzle-orm";

import type { AppRouteHandler } from "@/lib/types/server";
import { db } from "@/database";
import { inquiries } from "@/database/schema";
import type {
  ListRoute,
  CreateRoute,
  UpdateRoute,
  RemoveRoute
} from "./routes";

// List inquiries route handler (authentication required - admin only)
export const list: AppRouteHandler<ListRoute> = async (c) => {
  const session = c.get("session");
  const {
    page = "1",
    limit = "10",
    sort = "desc",
    search
  } = c.req.valid("query");

  // Check authentication
  if (!session) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  // Convert to numbers and validate
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.max(1, Math.min(100, parseInt(limit))); // Cap at 100 items
  const offset = (pageNum - 1) * limitNum;

  try {
    // Build search conditions for name, email, company, and message
    const searchCondition = search
      ? or(
          ilike(inquiries.name, `%${search}%`),
          ilike(inquiries.email, `%${search}%`),
          ilike(inquiries.company, `%${search}%`),
          ilike(inquiries.message, `%${search}%`)
        )
      : undefined;

    // Build query conditions
    const query = db.query.inquiries.findMany({
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
      .from(inquiries)
      .where(searchCondition);

    const [inquiryEntries, _totalCount] = await Promise.all([
      query,
      totalCountQuery
    ]);

    const totalCount = _totalCount[0]?.count || 0;

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limitNum);

    return c.json(
      {
        data: inquiryEntries,
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

// Create inquiry handler (public - no authentication for contact forms)
export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const body = c.req.valid("json");

  try {
    const [inserted] = await db.insert(inquiries).values(body).returning();

    if (!inserted) {
      return c.json(
        {
          message: "Inquiry not created"
        },
        HttpStatusCodes.BAD_REQUEST
      );
    }

    return c.json(inserted, HttpStatusCodes.CREATED);
  } catch {
    return c.json(
      {
        message: "Failed to create inquiry"
      },
      HttpStatusCodes.BAD_REQUEST
    );
  }
};

// Update inquiry handler (authentication required - for status updates)
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
    .update(inquiries)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(inquiries.id, params.id))
    .returning();

  if (!updated) {
    return c.json({ message: "Inquiry not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(updated, HttpStatusCodes.OK);
};

// Delete inquiry handler (authentication required)
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
    .delete(inquiries)
    .where(eq(inquiries.id, params.id))
    .returning();

  if (!deleted) {
    return c.json({ message: "Inquiry not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(
    { message: "Inquiry deleted successfully" },
    HttpStatusCodes.OK
  );
};
