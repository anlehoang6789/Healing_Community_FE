import ManageReportExpert from "@/components/manageReportForModerator/manageReportExpert";
import React, { Suspense } from "react";

export default function ManaReportExpert() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ManageReportExpert />
      </Suspense>
    </div>
  );
}
