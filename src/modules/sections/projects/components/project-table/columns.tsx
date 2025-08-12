"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { ProjectsWithExperiencesSchemaT } from "@/lib/zod/projects.zod";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
export type Project = Omit<ProjectsWithExperiencesSchemaT, "createdAt"> & {
  createdAt: string;
  updatedAt: string | null;
};

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "thumbnails",
    header: "Thumbnail",
    cell: ({ row }) => {
      const thumbnails = row.getValue("thumbnails") as string[] | null;
      const thumbnail = thumbnails?.[0];
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
    accessorKey: "name",
    header: "Project Name",
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>
  },
  {
    accessorKey: "projectType",
    header: "Type",
    cell: ({ row }) => {
      const projectType = row.getValue("projectType") as string;
      return (
        <div className="text-muted-foreground">
          {projectType || "Not specified"}
        </div>
      );
    }
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const location = row.getValue("location") as string;
      return (
        <div className="text-muted-foreground">
          {location || "Not specified"}
        </div>
      );
    }
  },
  {
    accessorKey: "client",
    header: "Client",
    cell: ({ row }) => {
      const client = row.getValue("client") as string;
      return (
        <div className="text-muted-foreground">{client || "Not specified"}</div>
      );
    }
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return (
        <div className="text-muted-foreground max-w-[300px] truncate">
          {description ? (
            <div
              dangerouslySetInnerHTML={{
                __html:
                  description.replace(/<[^>]*>/g, "").substring(0, 100) + "..."
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
    header: "Created At",
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
    cell: ({ row }) => {
      const project = row.original;
      return <CellAction data={project} />;
    }
  }
];
