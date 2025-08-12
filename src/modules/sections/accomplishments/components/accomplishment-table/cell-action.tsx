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

import { Accomplishment } from "./columns";
import { UpdateAccomplishment } from "../update";
import { DeleteAccomplishment } from "../delete";

interface CellActionProps {
  data: Accomplishment;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
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

          <UpdateAccomplishment id={data.id}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Edit Accomplishment
            </DropdownMenuItem>
          </UpdateAccomplishment>

          <DeleteAccomplishment id={data.id}>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="text-red-600"
            >
              Delete Accomplishment
            </DropdownMenuItem>
          </DeleteAccomplishment>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
