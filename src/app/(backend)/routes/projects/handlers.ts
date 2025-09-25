import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { desc, eq, ilike, sql, or } from "drizzle-orm";

import type { AppRouteHandler } from "@/lib/types/server";
import { db } from "@/database";
import { projects } from "@/database/schema";
import type {
  ListRoute,
  GetByIdRoute,
  CreateRoute,
  UpdateRoute,
  RemoveRoute
} from "./routes";

// Type helpers for the relational data
type ProjectWithExperiences = {
  id: string;
  name: string;
  description: string | null;
  thumbnails: string[] | null;
  projectType: string | null;
  status?: "completed" | "ongoing" | "future" | null | undefined;
  location: string | null;
  client: string | null;
  projectValue: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  experiences: {
    id: string;
    role: string | null;
    content: string | null;
    project: string | null;
    duration: string | null;
    createdAt: Date;
    updatedAt: Date | null;
  }[];
};

// Helper function to transform project data
function transformProject(project: ProjectWithExperiences) {
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    thumbnails: project.thumbnails,
    projectType: project.projectType,
    status: project.status,
    location: project.location,
    client: project.client,
    projectValue: project.projectValue,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt?.toISOString() || null,
    experiences: project.experiences.map((exp) => ({
      id: exp.id,
      role: exp.role,
      content: exp.content,
      project: exp.project,
      duration: exp.duration,
      createdAt: exp.createdAt.toISOString(),
      updatedAt: exp.updatedAt?.toISOString() || null
    }))
  };
}

// List projects route handler (no authentication required)
export const list: AppRouteHandler<ListRoute> = async (c) => {
  const { page = "1", limit = "10", search } = c.req.valid("query");

  // Convert to numbers and validate
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.max(1, Math.min(100, parseInt(limit))); // Cap at 100 items
  const offset = (pageNum - 1) * limitNum;

  try {
    // Build search conditions for name, description, projectType, location, and client
    const searchCondition = search
      ? or(
          ilike(projects.name, `%${search}%`),
          ilike(projects.description, `%${search}%`),
          ilike(projects.projectType, `%${search}%`),
          ilike(projects.location, `%${search}%`),
          ilike(projects.client, `%${search}%`)
        )
      : undefined;

    // Build query conditions with related experiences using "with"
    const query = db.query.projects.findMany({
      limit: limitNum,
      offset,
      where: searchCondition,
      with: {
        experiences: true
      },
      orderBy: (fields) => {
        // Always sort by priorityIndex first (ascending for proper order)
        return [fields.orderIndex, desc(fields.createdAt)];
      }
    });

    // Get total count for pagination metadata
    const totalCountQuery = db
      .select({ count: sql<number>`count(*)` })
      .from(projects)
      .where(searchCondition);

    const [projectEntries, _totalCount] = await Promise.all([
      query,
      totalCountQuery
    ]);

    const totalCount = _totalCount[0]?.count || 0;

    // Transform dates to strings to match the API schema
    const transformedData = (projectEntries as ProjectWithExperiences[]).map(
      transformProject
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
    );
  } catch (error) {
    console.log(error);

    return c.json(
      { message: HttpStatusPhrases.INTERNAL_SERVER_ERROR },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Get project by ID handler (no authentication required)
export const getById: AppRouteHandler<GetByIdRoute> = async (c) => {
  const params = c.req.valid("param");

  try {
    const project = await db.query.projects.findFirst({
      where: eq(projects.id, params.id),
      with: {
        experiences: true
      }
    });

    if (!project) {
      return c.json(
        { message: "Project not found" },
        HttpStatusCodes.NOT_FOUND
      );
    }

    // Transform dates to strings to match the API schema
    const transformedProject = transformProject(
      project as ProjectWithExperiences
    );

    return c.json(transformedProject, HttpStatusCodes.OK);
  } catch {
    return c.json(
      { message: HttpStatusPhrases.INTERNAL_SERVER_ERROR },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Create project handler
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
    const [inserted] = await db.insert(projects).values(body).returning();

    if (!inserted) {
      return c.json(
        {
          message: "Project not created"
        },
        HttpStatusCodes.BAD_REQUEST
      );
    }

    // Fetch the created project with related experiences
    const projectWithExperiences = await db.query.projects.findFirst({
      where: eq(projects.id, inserted.id),
      with: {
        experiences: true
      }
    });

    if (!projectWithExperiences) {
      return c.json(
        { message: "Project not found after creation" },
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      );
    }

    // Transform dates to strings to match the API schema
    const transformedProject = transformProject(
      projectWithExperiences as ProjectWithExperiences
    );

    return c.json(transformedProject, HttpStatusCodes.CREATED);
  } catch {
    return c.json(
      {
        message: "Failed to create project"
      },
      HttpStatusCodes.BAD_REQUEST
    );
  }
};

// Update project handler
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
    .update(projects)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(projects.id, params.id))
    .returning();

  if (!updated) {
    return c.json({ message: "Project not found" }, HttpStatusCodes.NOT_FOUND);
  }

  // Fetch the updated project with related experiences
  const projectWithExperiences = await db.query.projects.findFirst({
    where: eq(projects.id, updated.id),
    with: {
      experiences: true
    }
  });

  if (!projectWithExperiences) {
    return c.json(
      { message: "Project not found after update" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  // Transform dates to strings to match the API schema
  const transformedProject = transformProject(
    projectWithExperiences as ProjectWithExperiences
  );

  return c.json(transformedProject, HttpStatusCodes.OK);
};

// Delete project handler
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
    .delete(projects)
    .where(eq(projects.id, params.id))
    .returning();

  if (!deleted) {
    return c.json({ message: "Project not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(
    { message: "Project deleted successfully" },
    HttpStatusCodes.OK
  );
};
