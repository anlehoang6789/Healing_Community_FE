import AdminManageReportPost from "@/app/admin/moderator-activity/moderator-report-post-activity/admin-manage-report-post";
import React, { Suspense } from "react";

export default function ManageReportPostActivity() {
  return (
    <div className="text-textChat">
      <Suspense>
        <AdminManageReportPost />
      </Suspense>
    </div>
  );
}
