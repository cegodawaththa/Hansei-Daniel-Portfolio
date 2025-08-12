"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import { useGetProjects } from "../../projects/queries/use-get-projects";

interface ProjectSelectorProps {
  value?: string;
  onSelect: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ProjectSelector({
  value,
  onSelect,
  disabled = false,
  placeholder = "Select project..."
}: ProjectSelectorProps) {
  const [open, setOpen] = useState(false);

  const { data: projectsData, isPending } = useGetProjects({
    page: 1,
    limit: 100, // Get all projects for selector
    search: "",
    sort: "desc"
  });

  const projects = projectsData?.data || [];
  const selectedProject = projects.find((project) => project.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {selectedProject ? selectedProject.name : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search projects..." />
          <CommandList>
            <CommandEmpty>
              {isPending ? "Loading projects..." : "No projects found."}
            </CommandEmpty>
            <CommandGroup>
              {projects.map((project) => (
                <CommandItem
                  key={project.id}
                  value={project.name}
                  onSelect={() => {
                    onSelect(project.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === project.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {project.name}
                  {project.projectType && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({project.projectType})
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
