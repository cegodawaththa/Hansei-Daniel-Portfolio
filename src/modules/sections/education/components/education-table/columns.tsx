"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { EducationSchemaT } from "@/lib/zod/education.zod";
import { UpdateEducation } from "../update";
import { DeleteEducation } from "../delete";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Education = Omit<EducationSchemaT, "createdAt"> & {
  createdAt: string;
  updatedAt: string | null;
};

export const columns: ColumnDef<Education>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    )
  },
  {
    accessorKey: "institution",
    header: "Institution",
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {row.getValue("institution") || "N/A"}
      </div>
    )
  },
  {
    accessorKey: "year",
    header: "Year",
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {row.getValue("year") || "N/A"}
      </div>
    )
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
      const education = row.original;

      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <UpdateEducation id={education.id}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Edit Education
              </DropdownMenuItem>
            </UpdateEducation>

            <DeleteEducation id={education.id}>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="text-red-600"
              >
                Delete Education
              </DropdownMenuItem>
            </DeleteEducation>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
