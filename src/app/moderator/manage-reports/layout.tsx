import ReportTabs from "@/app/moderator/manage-reports/report-tabs";

export default function ManageReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-semibold text-textChat">Quản lý báo cáo</h1>
      <ReportTabs />
      <div className="mt-6">{children}</div>
    </div>
  );
}
