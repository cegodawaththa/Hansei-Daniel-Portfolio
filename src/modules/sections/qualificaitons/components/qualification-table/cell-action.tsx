"use client";

import { Edit, Trash } from "lucide-react";

import { Qualification } from "./columns";
import { UpdateQualification } from "../update";
import { DeleteQualification } from "../delete";

interface CellActionProps {
  data: Qualification;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  return (
    <div className="flex items-center gap-4">
      <UpdateQualification id={data.id}>
        <Edit className="cursor-pointer h-4 w-4" />
      </UpdateQualification>

      <DeleteQualification id={data.id}>
        <Trash className="cursor-pointer h-4 w-4" />
      </DeleteQualification>
    </div>
  );
};
