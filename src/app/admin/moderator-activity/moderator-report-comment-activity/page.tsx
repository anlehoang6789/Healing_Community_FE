import AdminManageReportComment from "@/app/admin/moderator-activity/moderator-report-comment-activity/admin-manage-report-comment";
import React, { Suspense } from "react";

export default function ManageReportCommentActivity() {
  return (
    <div className="text-textChat">
      <Suspense>
        <AdminManageReportComment />
      </Suspense>
    </div>
  );
}
