/* eslint-disable @typescript-eslint/no-explicit-any */
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { desc, eq, ilike, sql, or } from "drizzle-orm";

import type { AppRouteHandler } from "@/lib/types/server";
import { db } from "@/database";
import { experiences } from "@/database/schema";
import type {
  ListRoute,
  GetByIdRoute,
  CreateRoute,
  UpdateRoute,
  RemoveRoute
} from "./routes";

// Type helpers for the relational data
type ExperienceWithProject = {
  id: string;
  role: string | null;
  content: string | null;
  project: string | null;
  duration: string | null;
  createdAt: Date;
  updatedAt: Date | null;
} & {
  project: {
    id: string;
    name: string;
    description: string | null;
    thumbnails: string[] | null;
    projectType: string | null;
    location: string | null;
    client: string | null;
    projectValue: string | null;
    createdAt: Date;
    updatedAt: Date | null;
  } | null;
};

// Helper function to transform experience data
function transformExperience(experience: ExperienceWithProject) {
  return {
    id: experience.id,
    role: experience.role,
    content: experience.content,
    project: experience.project
      ? {
          id: experience.project.id,
          name: experience.project.name,
          description: experience.project.description,
          thumbnails: experience.project.thumbnails,
          projectType: experience.project.projectType,
          location: experience.project.location,
          client: experience.project.client,
          projectValue: experience.project.projectValue,
          createdAt: experience.project.createdAt.toISOString(),
          updatedAt: experience.project.updatedAt?.toISOString() || null
        }
      : null,
    duration: experience.duration,
    createdAt: experience.createdAt.toISOString(),
    updatedAt: experience.updatedAt?.toISOString() || null
  };
}

// List experiences route handler (no authentication required) - includes related project data
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
    // Build search conditions for role and content
    const searchCondition = search
      ? or(
          ilike(experiences.role, `%${search}%`),
          ilike(experiences.content, `%${search}%`)
        )
      : undefined;

    // Build query with related project data using "with"
    const query = db.query.experiences.findMany({
      limit: limitNum,
      offset,
      where: searchCondition,
      with: {
        project: true
      },
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
      .from(experiences)
      .where(searchCondition);

    const [experienceEntries, _totalCount] = await Promise.all([
      query,
      totalCountQuery
    ]);

    const totalCount = _totalCount[0]?.count || 0;

    // Transform dates to strings to match the API schema
    const transformedData = (experienceEntries as ExperienceWithProject[]).map(
      transformExperience
    );

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limitNum);

    return c.json(
      {
        data: transformedData,
        meta: {
          currentPage: pageNum,
          totalPages,
          totalCount,
          limit: limitNum
        }
      },
      HttpStatusCodes.OK
    ) as any;
  } catch {
    return c.json(
      { message: HttpStatusPhrases.INTERNAL_SERVER_ERROR },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Get experience by ID handler (no authentication required) - includes related project data
export const getById: AppRouteHandler<GetByIdRoute> = async (c) => {
  const params = c.req.valid("param");

  try {
    const experience = await db.query.experiences.findFirst({
      where: eq(experiences.id, params.id),
      with: {
        project: true
      }
    });

    if (!experience) {
      return c.json(
        { message: "Experience not found" },
        HttpStatusCodes.NOT_FOUND
      );
    }

    // Transform dates to strings to match the API schema
    const transformedExperience = transformExperience(
      experience as ExperienceWithProject
    );

    return c.json(transformedExperience, HttpStatusCodes.OK);
  } catch {
    return c.json(
      { message: HttpStatusPhrases.INTERNAL_SERVER_ERROR },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Create experience handler
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

  const [inserted] = await db.insert(experiences).values(body).returning();

  if (!inserted) {
    return c.json(
      {
        message: "Experience not created"
      },
      HttpStatusCodes.BAD_REQUEST
    );
  }

  // Fetch the created experience with related project data
  const experienceWithProject = await db.query.experiences.findFirst({
    where: eq(experiences.id, inserted.id),
    with: {
      project: true
    }
  });

  if (!experienceWithProject) {
    return c.json(
      { message: "Experience not found after creation" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  // Transform dates to strings to match the API schema
  const transformedExperience = transformExperience(
    experienceWithProject as ExperienceWithProject
  );

  return c.json(transformedExperience, HttpStatusCodes.CREATED);
};

// Update experience handler
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
    .update(experiences)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(experiences.id, params.id))
    .returning();

  if (!updated) {
    return c.json(
      { message: "Experience not found" },
      HttpStatusCodes.NOT_FOUND
    );
  }

  // Fetch the updated experience with related project data
  const experienceWithProject = await db.query.experiences.findFirst({
    where: eq(experiences.id, updated.id),
    with: {
      project: true
    }
  });

  if (!experienceWithProject) {
    return c.json(
      { message: "Experience not found after update" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  // Transform dates to strings to match the API schema
  const transformedExperience = transformExperience(
    experienceWithProject as ExperienceWithProject
  );

  return c.json(transformedExperience, HttpStatusCodes.OK);
};

// Delete experience handler
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
    .delete(experiences)
    .where(eq(experiences.id, params.id))
    .returning();

  if (!deleted) {
    return c.json(
      { message: "Experience not found" },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(
    { message: "Experience deleted successfully" },
    HttpStatusCodes.OK
  );
};
