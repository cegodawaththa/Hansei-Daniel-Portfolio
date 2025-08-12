"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ExperiencesWithProjectSchemaT } from "@/lib/zod/experiences.zod";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
export type Experience = Omit<ExperiencesWithProjectSchemaT, "createdAt"> & {
  createdAt: string;
  updatedAt: string | null;
};

export const columns: ColumnDef<Experience>[] = [
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return <div className="font-medium">{role || "Not specified"}</div>;
    }
  },
  {
    accessorKey: "project",
    header: "Project",
    cell: ({ row }) => {
      const project = row.getValue("project") as Experience["project"];
      return (
        <div className="text-muted-foreground">
          {project?.name || "No project assigned"}
        </div>
      );
    }
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      const duration = row.getValue("duration") as string;
      return (
        <div className="text-muted-foreground">
          {duration || "Not specified"}
        </div>
      );
    }
  },
  {
    accessorKey: "content",
    header: "Description",
    cell: ({ row }) => {
      const content = row.getValue("content") as string;
      return (
        <div className="text-muted-foreground max-w-[300px] truncate">
          {content ? (
            <div
              dangerouslySetInnerHTML={{
                __html:
                  content.replace(/<[^>]*>/g, "").substring(0, 100) + "..."
              }}
            />
          ) : (
            "No description"
          )}
        </div>
      );
    }
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <div className="text-muted-foreground">{date.toLocaleDateString()}</div>
      );
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
