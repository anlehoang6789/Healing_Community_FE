import {
  ImageUp,
  LayoutDashboard,
  CalendarPlus,
  CalendarSearch,
  Clapperboard,
  
} from "lucide-react";

const sidebarItems = [
  {
    title: "Thống kê",
    Icon: LayoutDashboard,
    href: "/expert/dashboard-expert",
  },
  { title: "Tải lên chứng chỉ", Icon: ImageUp, href: "/expert/upload-file" },
  {
    title: "Tạo lịch tư vấn",
    Icon: CalendarPlus,
    href: "/expert/create-consultation-calendar",
  },
  {
    title: "Xem lịch tư vấn",
    Icon: CalendarSearch,
    href: "/expert/view-consultation-calendar",
  },
  {
    title: "Tải lên video ghi lại ",
    Icon: Clapperboard,
    href: "/expert/upload-video-record",
  },
];

export default sidebarItems;
