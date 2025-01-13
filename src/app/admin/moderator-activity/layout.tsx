import AdminModeratorActivityTabs from "@/app/admin/moderator-activity/moderator-activity-tabs";

export default function ManageReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-semibold text-textChat">
        Quản lý hoạt động của kiểm duyệt viên
      </h1>
      <AdminModeratorActivityTabs />
      <div className="mt-6 w-full overflow-x-auto">{children}</div>
    </div>
  );
}
