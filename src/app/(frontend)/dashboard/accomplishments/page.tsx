import React from "react";

import PageContainer from "@/modules/layouts/page-container";
import { AppPageShell } from "@/modules/layouts/page-shell";
import { AccomplishmentTableActions } from "@/modules/sections/accomplishments/components/accomplishment-table/accomplishment-table-actions";
import { Separator } from "@/components/ui/separator";
import AccomplishmentTable from "@/modules/sections/accomplishments/components/listing";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircleIcon } from "lucide-react";

export default function AccomplishmentsPage() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <AppPageShell
          title="Accomplishments"
          description="Manage your achievements and accomplishments here."
          actionComponent={
            <Button asChild variant={"outline"} icon={<PlusCircleIcon />}>
              <Link href="/dashboard/accomplishments/new">
                Add New Accomplishment
              </Link>
            </Button>
          }
        />

        <Separator />

        <AccomplishmentTableActions />

        <AccomplishmentTable />
      </div>
    </PageContainer>
  );
}
