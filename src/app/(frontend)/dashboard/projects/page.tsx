import React from "react";

import PageContainer from "@/modules/layouts/page-container";
import { AppPageShell } from "@/modules/layouts/page-shell";
import { ProjectTableActions } from "@/modules/sections/projects/components/project-table/project-table-actions";
import { Separator } from "@/components/ui/separator";
import ProjectTable from "@/modules/sections/projects/components/listing";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircleIcon } from "lucide-react";

export default function ProjectsPage() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <AppPageShell
          title="Projects"
          description="Manage and showcase your project portfolio here."
          actionComponent={
            <Button asChild variant={"outline"} icon={<PlusCircleIcon />}>
              <Link href="/dashboard/projects/new">Add New Project</Link>
            </Button>
          }
        />

        <Separator />

        <ProjectTableActions />

        <ProjectTable />
      </div>
    </PageContainer>
  );
}
