"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { PostsSchemaT } from "@/lib/zod/posts.zod";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
export type Post = PostsSchemaT;

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => {
      const thumbnail = row.getValue("thumbnail") as string;
      return (
        <div className="flex items-center justify-center w-12 h-12 overflow-hidden">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt="Thumbnail"
              width={64}
              height={64}
              className="rounded-md object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">
              No Image
            </div>
          )}
        </div>
      );
    }
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="font-medium max-w-[300px] truncate">
        {row.getValue("title")}
      </div>
    )
  },
  {
    accessorKey: "content",
    header: "Content Preview",
    cell: ({ row }) => {
      const content = row.getValue("content") as string;
      return (
        <div className="text-muted-foreground max-w-[400px] truncate">
          {content ? (
            <div
              dangerouslySetInnerHTML={{
                __html:
                  content.replace(/<[^>]*>/g, "").substring(0, 100) + "..."
              }}
            />
          ) : (
            "No content"
          )}
        </div>
      );
    }
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <div className="text-muted-foreground">{date.toLocaleDateString()}</div>
      );
    }
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const updatedAt = row.getValue("updatedAt") as string | null;
      if (!updatedAt) return <div className="text-muted-foreground">-</div>;
      const date = new Date(updatedAt);
      return (
        <div className="text-muted-foreground">{date.toLocaleDateString()}</div>
      );
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const post = row.original;
      return <CellAction data={post} />;
    }
  }
];
