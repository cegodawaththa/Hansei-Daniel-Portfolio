import React from "react";

import PageContainer from "@/modules/layouts/page-container";
import { AppPageShell } from "@/modules/layouts/page-shell";
import { AddNewQualification } from "@/modules/sections/qualificaitons/components/create";
import { QualificationsTableActions } from "@/modules/sections/qualificaitons/components/qualification-table/qualifications-table-actions";
import { Separator } from "@/components/ui/separator";
import QualificationsTable from "@/modules/sections/qualificaitons/components/listing";

export default function CoreQualificationPage() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <AppPageShell
          title="Core Qualifications / Skills"
          description="Manage your personal qualifications and skills here."
          actionComponent={<AddNewQualification />}
        />

        <Separator />

        <QualificationsTableActions />

        <QualificationsTable />
      </div>
    </PageContainer>
  );
}
