"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { AccomplishmentsSchemaT } from "@/lib/zod/accomplishments.zod";
import { DeleteAccomplishment } from "../delete";
import Link from "next/link";

// This type is used to define the shape of our data.
export type Accomplishment = Omit<AccomplishmentsSchemaT, "createdAt"> & {
  createdAt: string;
  updatedAt: string | null;
};

export const columns: ColumnDef<Accomplishment>[] = [
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
      <div className="font-medium">{row.getValue("title")}</div>
    )
  },
  {
    accessorKey: "content",
    header: "Content",
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const accomplishment = row.original;

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

            <DropdownMenuItem asChild>
              <Link href={`/dashboard/accomplishments/${accomplishment.id}`}>
                Edit Accomplishment
              </Link>
            </DropdownMenuItem>

            <DeleteAccomplishment id={accomplishment.id}>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="text-red-600"
              >
                Delete Accomplishment
              </DropdownMenuItem>
            </DeleteAccomplishment>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
