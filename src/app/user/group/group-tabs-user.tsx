"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, MessageSquareWarning, MessagesSquare } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function GroupTabsUser({
  groupId,
  userId,
}: {
  groupId: string;
  userId: string;
}) {
  const { theme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const activeTab = pathname.startsWith(`/user/group/${groupId}/about`)
    ? "about"
    : pathname.startsWith(`/user/group/${groupId}/announcement`)
    ? "announcement"
    : pathname.startsWith(`/user/group/${groupId}/members`)
    ? "members"
    : pathname.startsWith(`/user/group/${groupId}`)
    ? "discussion"
    : pathname.startsWith(`/user/group/${groupId}/request-join`)
    ? "request-join"
    : "discussion";

  const handleNavigation = () => {
    router.push(`/user/group-user/${groupId}/user/${userId}`);
  };
  //check role in group
  return (
    <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-4">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center py-4 gap-4">
        {/* Buttons Section */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <Link href={`/user/group/${groupId}/about`} passHref>
            <Button
              variant={
                activeTab === "about"
                  ? "gradientUnderline"
                  : "gradientHoverUnderline"
              }
              className="text-xs sm:text-sm flex-1 sm:flex-none text-muted-foreground"
            >
              Giới thiệu
            </Button>
          </Link>
          <Link href={`/user/group/${groupId}`} passHref>
            <Button
              variant={
                activeTab === "discussion"
                  ? "gradientUnderline"
                  : "gradientHoverUnderline"
              }
              className="text-xs sm:text-sm flex-1 sm:flex-none text-muted-foreground"
            >
              Thảo luận
            </Button>
          </Link>
          <Link href={`/user/group/${groupId}/announcement`} passHref>
            <Button
              variant={
                activeTab === "announcement"
                  ? "gradientUnderline"
                  : "gradientHoverUnderline"
              }
              className="text-xs sm:text-sm flex-1 sm:flex-none text-muted-foreground"
            >
              Đáng chú ý
            </Button>
          </Link>
          <Link href={`/user/group/${groupId}/members`} passHref>
            <Button
              variant={
                activeTab === "members"
                  ? "gradientUnderline"
                  : "gradientHoverUnderline"
              }
              className="text-xs sm:text-sm flex-1 sm:flex-none text-muted-foreground"
            >
              Mọi người
            </Button>
          </Link>
          <Link href={`/user/group/${groupId}/request-join`} passHref>
            <Button
              variant={
                activeTab === "request-join"
                  ? "gradientUnderline"
                  : "gradientHoverUnderline"
              }
              className="text-xs sm:text-sm flex-1 sm:flex-none text-muted-foreground"
            >
              Duyệt yêu cầu
            </Button>
          </Link>
        </div>

        {/* Dropdown Section */}
        <DropdownMenu modal={false} aria-hidden={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="iconSend">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={`w-56 mt-4 ${
              theme === "dark" ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            <DropdownMenuItem onClick={handleNavigation}>
              <MessagesSquare className="mr-2 h-4 w-4" />
              <span>Nội dung của bạn</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageSquareWarning className="mr-2 h-4 w-4" />
              <span>Báo cáo nhóm</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </main>
  );
}
