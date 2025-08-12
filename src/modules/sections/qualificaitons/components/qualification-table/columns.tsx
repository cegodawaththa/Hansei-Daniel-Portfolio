"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { QualificationsSchemaT } from "@/lib/zod/qualifications.zod";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Qualification = Omit<QualificationsSchemaT, "createdAt"> & {
  createdAt: string;
  updatedAt: string | null;
};

export const columns: ColumnDef<Qualification>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-md bg-primary flex items-center justify-center text-sm text-primary-foreground">
            {row.original.name.slice(0, 2)}
          </div>
          <p>{row.original.name}</p>
        </div>
      );
    }
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString()
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
