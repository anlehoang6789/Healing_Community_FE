import SystemReportList from "@/app/admin/system-reports/system-report-list";
import React, { Suspense } from "react";

export default function AdminSystemReport() {
  return (
    <div className="text-textChat p-4">
      <h1 className="text-2xl font-semibold text-textChat">
        Quản lý báo cáo hệ thống
      </h1>
      <Suspense>
        <SystemReportList />
      </Suspense>
    </div>
  );
}
