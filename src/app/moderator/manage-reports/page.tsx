import ReportTabs from "@/app/moderator/manage-reports/report-tabs";
import React from "react";

export default function ManageReports() {
  return (
    <div className="text-muted-foreground p-4 min-h-screen">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Quản lý báo cáo</h1>
        {/* filter calendar */}
      </div>
      <ReportTabs />
    </div>
  );
}
