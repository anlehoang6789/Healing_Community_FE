"use client";

import { Button } from "@/components/ui/button";

import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function GroupTabsModerator({
  groupId,
  userId,
}: {
  groupId: string;
  userId: string;
}) {
  const { theme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const activeTab = pathname.startsWith(
    `/moderator/group/${groupId}/announcement`
  )
    ? "announcement"
    : pathname.startsWith(`/moderator/group/${groupId}/members`)
    ? "members"
    : pathname.startsWith(`/moderator/group/${groupId}`)
    ? "discussion"
    : pathname.startsWith(`/moderator/group/${groupId}/request-join`)
    ? "request-join"
    : "discussion";

  const handleNavigation = () => {
    router.push(`/moderator/group-user/${groupId}/user/${userId}`);
  };

  return (
    <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center py-4 gap-4">
        {/* Buttons Section */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <Link href={`/moderator/group/${groupId}`} passHref>
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
          <Link href={`/moderator/group/${groupId}/announcement`} passHref>
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
          <Link href={`/moderator/group/${groupId}/members`} passHref>
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
          <Link href={`/moderator/group/${groupId}/request-join`} passHref>
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
        {/* <DropdownMenu modal={false} aria-hidden={false}>
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
        </DropdownMenu> */}
      </div>
    </main>
  );
}
