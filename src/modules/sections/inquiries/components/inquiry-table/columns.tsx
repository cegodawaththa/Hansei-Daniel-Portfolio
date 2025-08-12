"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { InquiriesSchemaT } from "@/lib/zod/inquiries.zod";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
export type Inquiry = Omit<InquiriesSchemaT, "createdAt"> & {
  createdAt: string;
  updatedAt: string | null;
};

export const columns: ColumnDef<Inquiry>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.getValue("name")}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.getValue("email")}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => {
      const company = row.getValue("company") as string | null;
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {company || "N/A"}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as "unread" | "read" | "archived";

      const getStatusColor = (status: string) => {
        switch (status) {
          case "unread":
            return "bg-red-100 text-red-800";
          case "read":
            return "bg-blue-100 text-blue-800";
          case "archived":
            return "bg-gray-100 text-gray-800";
          default:
            return "bg-gray-100 text-gray-800";
        }
      };

      return <Badge className={getStatusColor(status)}>{status}</Badge>;
    }
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => {
      const message = row.getValue("message") as string;
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate sm:max-w-72 md:max-w-[31rem]">
            {message}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>
            {format(new Date(row.getValue("createdAt")), "MMM dd, yyyy")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
