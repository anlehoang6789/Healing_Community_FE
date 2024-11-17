import {
  Cpu,
  MessageSquareWarning,
  PiggyBank,
  SquareUserRound,
  NotebookPen,
  ListMusic,
  UsersRound,
} from "lucide-react";

const moderatorItems = [
  {
    title: "Kiểm duyệt bài đăng",
    Icon: Cpu,
    href: "/moderator/manage-stories",
  },
  {
    title: "Quản lí báo cáo",
    Icon: MessageSquareWarning,
    href: "/moderator/manage-reports/user",
  },
  {
    title: "Lịch sử giao dịch",
    Icon: PiggyBank,
    href: "/moderator/transaction-history",
  },
  {
    title: "Quản lí tài khoản",
    Icon: SquareUserRound,
    href: "/moderator/manage-accounts",
  },

  {
    title: "Quản lí blog",
    Icon: NotebookPen,
    href: "/moderator/manage-blogs",
  },
  {
    title: "Quản lí âm nhạc",
    Icon: ListMusic,
    href: "/moderator/manage-music",
  },
  {
    title: "Quản lí nhóm",
    Icon: UsersRound,
    href: "/moderator/manage-groups",
  },
];

export default moderatorItems;
