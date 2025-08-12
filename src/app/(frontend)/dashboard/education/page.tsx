import React from "react";

import PageContainer from "@/modules/layouts/page-container";
import { AppPageShell } from "@/modules/layouts/page-shell";
import { AddNewEducation } from "@/modules/sections/education/components/create";
import { EducationTableActions } from "@/modules/sections/education/components/education-table/education-table-actions";
import { Separator } from "@/components/ui/separator";
import EducationTable from "@/modules/sections/education/components/listing";

export default function EducationPage() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <AppPageShell
          title="Education"
          description="Manage your educational background and qualifications here."
          actionComponent={<AddNewEducation />}
        />

        <Separator />

        <EducationTableActions />

        <EducationTable />
      </div>
    </PageContainer>
  );
}
