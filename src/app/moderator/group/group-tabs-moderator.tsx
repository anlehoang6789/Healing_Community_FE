"use client";

import { Button } from "@/components/ui/button";
import { getUserIdFromLocalStorage } from "@/lib/utils";
import { useCheckRoleInGroupQuery } from "@/queries/useGroup";

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

  const userIdFromLocalStorage = getUserIdFromLocalStorage();
  const { data } = useCheckRoleInGroupQuery(
    userIdFromLocalStorage as string,
    groupId
  );

  const isOwnerInGroup = data?.payload.data.roleInGroup === "Owner";

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
          {isOwnerInGroup && (
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
          )}
        </div>
      </div>
    </main>
  );
}
