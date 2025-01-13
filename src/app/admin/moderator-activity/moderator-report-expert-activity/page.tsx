import AdminManageReportExpert from "@/app/admin/moderator-activity/moderator-report-expert-activity/admin-manage-report-expert";
import React, { Suspense } from "react";

export default function ManageReportExpertActivity() {
  return (
    <div className="text-textChat">
      <Suspense>
        <AdminManageReportExpert />
      </Suspense>
    </div>
  );
}
