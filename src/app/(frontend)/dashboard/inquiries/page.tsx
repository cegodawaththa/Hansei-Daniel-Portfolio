import React from "react";

import PageContainer from "@/modules/layouts/page-container";
import { AppPageShell } from "@/modules/layouts/page-shell";
import { InquiryTableActions } from "@/modules/sections/inquiries/components/inquiry-table/inquiry-table-actions";
import { Separator } from "@/components/ui/separator";
import InquiryTable from "@/modules/sections/inquiries/components/listing";

export default function InquiriesPage() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <AppPageShell
          title="Inquiries"
          description="Manage contact form inquiries and messages from visitors."
          actionComponent={undefined}
        />

        <Separator />

        <InquiryTableActions />

        <InquiryTable />
      </div>
    </PageContainer>
  );
}
