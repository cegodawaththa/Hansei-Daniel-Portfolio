"use client";

import { Eye } from "lucide-react";

import { Inquiry } from "./columns";
import { ViewInquiry } from "../view";

interface CellActionProps {
  data: Inquiry;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  return (
    <div className="flex items-center gap-4">
      <ViewInquiry inquiry={data}>
        <Eye className="cursor-pointer h-4 w-4" />
      </ViewInquiry>
    </div>
  );
};
