import { LayoutDashboard, MonitorCog, ScanEye, UserCog } from "lucide-react";

const adminItems = [
  {
    title: "Thống kê",
    Icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    title: "Báo cáo hệ thống",
    Icon: MonitorCog,
    href: "/admin/system-reports",
  },
  {
    title: "Xem hoạt động của kiểm duyệt viên",
    Icon: ScanEye,
    href: "/admin/moderator-activity",
  },
  {
    title: "Quản lí tài khoản",
    Icon: UserCog,
    href: "/admin/manage-accounts-moderator",
  },
];

export default adminItems;
