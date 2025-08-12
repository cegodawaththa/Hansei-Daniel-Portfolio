import React from "react";

import PageContainer from "@/modules/layouts/page-container";
import { AppPageShell } from "@/modules/layouts/page-shell";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircleIcon } from "lucide-react";

export default function ExperiencesPage() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <AppPageShell
          title="Experiences"
          description="Manage and showcase your career experiences here."
          actionComponent={
            <Button asChild variant={"outline"} icon={<PlusCircleIcon />}>
              <Link href="/dashboard/experiences/new">Add New Experience</Link>
            </Button>
          }
        />

        <Separator />
      </div>
    </PageContainer>
  );
}
