import ManageReportExpert from "@/app/moderator/manage-reports/expert/manage-report-expert";
import React, { Suspense } from "react";

export default function ManaReportExpert() {
  return (
    <div className="text-textChat">
      <Suspense fallback={<div>Loading...</div>}>
        <ManageReportExpert />
      </Suspense>
    </div>
  );
}
