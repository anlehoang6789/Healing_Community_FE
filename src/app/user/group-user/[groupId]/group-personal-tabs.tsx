"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GroupPersonalTabs({
  groupId,
  userId,
}: {
  groupId: string;
  userId: string;
}) {
  const pathname = usePathname();
  const activeTab = pathname.startsWith(
    `/user/group-user/${groupId}/user/${userId}`
  )
    ? "group-user"
    : "group-user";

  return (
    <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-4">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center py-4 gap-4">
        {/* Buttons Section */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <Link href={`/user/group-user/${groupId}/user/${userId}`} passHref>
            <Button
              variant={
                activeTab === "group-user"
                  ? "gradientUnderline"
                  : "gradientHoverUnderline"
              }
              className="text-sm sm:text-base flex-1 sm:flex-none text-muted-foreground"
            >
              Bài viết trong nhóm
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
