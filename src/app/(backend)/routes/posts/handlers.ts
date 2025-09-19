/* eslint-disable @typescript-eslint/no-explicit-any */
import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { and, count, desc, asc, ilike } from "drizzle-orm";

import { db } from "@/database";
import { postsTable } from "@/database/schema/posts.schema";
import type { AppRouteHandler } from "@/lib/types/server";

import type {
  ListRoute,
  GetByIdRoute,
  CreateRoute,
  UpdateRoute,
  RemoveRoute
} from "./routes";

// List posts route handler (no authentication required)
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
    const whereConditions = [];
    if (search) {
      whereConditions.push(ilike(postsTable.title, `%${search}%`));
    }

    const query = db.query.postsTable.findMany({
      limit: limitNum,
      offset,
      where: whereConditions.length > 0 ? and(...whereConditions) : undefined,
      orderBy: (fields) => {
        return sort === "desc" ? desc(fields.createdAt) : asc(fields.createdAt);
      }
    });

    // Get total count for pagination metadata
    const totalQuery = db
      .select({ count: count() })
      .from(postsTable)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined);

    const [posts, totalResult] = await Promise.all([query, totalQuery]);
    const totalCount = totalResult[0]?.count || 0;
    const totalPages = Math.ceil(totalCount / limitNum);

    // Transform posts data to match API output format
    const transformedPosts = posts.map((post) => ({
      id: post.id,
      thumbnail: post.thumbnail,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt?.toISOString() || null
    }));

    return c.json(
      {
        data: transformedPosts,
        meta: {
          currentPage: pageNum,
          limit: limitNum,
          totalCount,
          totalPages
        }
      },
      HttpStatusCodes.OK
    );
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    return c.json(
      { message: "Something went wrong" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Get post by ID handler (no authentication required)
export const getById: AppRouteHandler<GetByIdRoute> = async (c) => {
  const { id } = c.req.valid("param");

  try {
    const post = await db.query.postsTable.findFirst({
      where: eq(postsTable.id, id)
    });

    if (!post) {
      return c.json({ message: "Post not found" }, HttpStatusCodes.NOT_FOUND);
    }

    // Transform post data to match API output format
    const transformedPost = {
      id: post.id,
      thumbnail: post.thumbnail,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt?.toISOString() || null
    };

    return c.json(transformedPost, HttpStatusCodes.OK);
  } catch (error: any) {
    console.error("Error fetching post:", error);
    return c.json(
      { message: "Something went wrong" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Create post handler (requires authentication)
export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const session = c.get("session");
  const body = c.req.valid("json");

  // Check authentication
  if (!session) {
    return c.json(
      { message: "Unauthorized access" },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  try {
    const [newPost] = await db.insert(postsTable).values(body).returning();

    // Transform post data to match API output format
    const transformedPost = {
      id: newPost.id,
      thumbnail: newPost.thumbnail,
      title: newPost.title,
      content: newPost.content,
      createdAt: newPost.createdAt.toISOString(),
      updatedAt: newPost.updatedAt?.toISOString() || null
    };

    return c.json(transformedPost, HttpStatusCodes.CREATED);
  } catch (error: any) {
    console.error("Error creating post:", error);
    return c.json(
      { message: "Something went wrong" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Update post handler (requires authentication)
export const update: AppRouteHandler<UpdateRoute> = async (c) => {
  const session = c.get("session");
  const { id } = c.req.valid("param");
  const body = c.req.valid("json");

  // Check authentication
  if (!session) {
    return c.json(
      { message: "Unauthorized access" },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  try {
    const [updatedPost] = await db
      .update(postsTable)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(postsTable.id, id))
      .returning();

    if (!updatedPost) {
      return c.json({ message: "Post not found" }, HttpStatusCodes.NOT_FOUND);
    }

    // Transform post data to match API output format
    const transformedPost = {
      id: updatedPost.id,
      thumbnail: updatedPost.thumbnail,
      title: updatedPost.title,
      content: updatedPost.content,
      createdAt: updatedPost.createdAt.toISOString(),
      updatedAt: updatedPost.updatedAt?.toISOString() || null
    };

    return c.json(transformedPost, HttpStatusCodes.OK);
  } catch (error: any) {
    console.error("Error updating post:", error);
    return c.json(
      { message: "Something went wrong" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Delete post handler (requires authentication)
export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const session = c.get("session");
  const { id } = c.req.valid("param");

  // Check authentication
  if (!session) {
    return c.json(
      { message: "Unauthorized access" },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  try {
    const [deletedPost] = await db
      .delete(postsTable)
      .where(eq(postsTable.id, id))
      .returning();

    if (!deletedPost) {
      return c.json({ message: "Post not found" }, HttpStatusCodes.NOT_FOUND);
    }

    return c.json({ message: "Post deleted successfully" }, HttpStatusCodes.OK);
  } catch (error: any) {
    console.error("Error deleting post:", error);
    return c.json(
      { message: "Something went wrong" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
