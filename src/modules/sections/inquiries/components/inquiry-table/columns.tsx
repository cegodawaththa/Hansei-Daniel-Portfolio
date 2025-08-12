"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { InquiriesSchemaT } from "@/lib/zod/inquiries.zod";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
export type Inquiry = Omit<InquiriesSchemaT, "createdAt"> & {
  createdAt: string;
  updatedAt: string | null;
};

export const columns: ColumnDef<Inquiry>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("email")}</div>
    )
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => {
      const company = row.getValue("company") as string | null;
      return <div className="text-muted-foreground">{company || "N/A"}</div>;
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as
        | "unread"
        | "read"
        | "archived"
        | null;

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

      return (
        <Badge className={getStatusColor(status || "unread")}>
          {status || "unread"}
        </Badge>
      );
    }
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => {
      const message = row.getValue("message") as string;
      return <div className="max-w-32 truncate">{message}</div>;
    }
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString()
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
