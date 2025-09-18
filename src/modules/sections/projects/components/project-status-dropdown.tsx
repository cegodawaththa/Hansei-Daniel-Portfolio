import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

type ProjectStatus = "completed" | "ongoing" | "future" | null | undefined;

type Props = {
  status: ProjectStatus;
  onSelect: (status: ProjectStatus) => void;
};

export function ProjectStatusDropdown({ status, onSelect }: Props) {
  return (
    <Select
      value={status || ""}
      onValueChange={(value) => onSelect(value as ProjectStatus)}
    >
      <SelectTrigger className="w-full shadow-none bg-card border border-card-foreground/20 h-10">
        <SelectValue placeholder="Select a project status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Project Status</SelectLabel>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="ongoing">Ongoing</SelectItem>
          <SelectItem value="future">Future</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
