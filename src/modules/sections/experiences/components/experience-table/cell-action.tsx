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

import { Experience } from "./columns";
import { DeleteExperience } from "../delete";
import { useRouter } from "next/navigation";

interface CellActionProps {
  data: Experience;
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
              router.push(`/dashboard/experiences/${data.id}`);
            }}
          >
            Edit Experience
          </DropdownMenuItem>

          <DeleteExperience id={data.id}>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="text-red-600"
            >
              Delete Experience
            </DropdownMenuItem>
          </DeleteExperience>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
