"use client";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { DeleteProject } from "../delete";
import { useRouter } from "next/navigation";

// Update the interface to match the draggable table type
interface CellActionProps {
  data: {
    id: string;
    name: string;
    description?: string | null;
    thumbnails?: string[] | null;
    projectType?: string | null;
    status?: "completed" | "ongoing" | "future" | null | undefined;
    location?: string | null;
    client?: string | null;
    projectValue?: string | null;
    orderIndex?: number | null;
    createdAt: string;
    updatedAt: string | null;
  };
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              router.push(`/dashboard/projects/${data.id}`);
            }}
          >
            Edit Project
          </DropdownMenuItem>

          <DeleteProject id={data.id}>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="text-red-600"
            >
              Delete Project
            </DropdownMenuItem>
          </DeleteProject>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
