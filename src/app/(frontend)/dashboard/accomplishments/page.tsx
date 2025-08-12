import React from "react";

import PageContainer from "@/modules/layouts/page-container";
import { AppPageShell } from "@/modules/layouts/page-shell";
import { AddNewAccomplishment } from "@/modules/sections/accomplishments/components/create";
import { AccomplishmentTableActions } from "@/modules/sections/accomplishments/components/accomplishment-table/accomplishment-table-actions";
import { Separator } from "@/components/ui/separator";
import AccomplishmentTable from "@/modules/sections/accomplishments/components/listing";

export default function AccomplishmentsPage() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <AppPageShell
          title="Accomplishments"
          description="Manage your achievements and accomplishments here."
          actionComponent={<AddNewAccomplishment />}
        />

        <Separator />

        <AccomplishmentTableActions />

        <AccomplishmentTable />
      </div>
    </PageContainer>
  );
}
