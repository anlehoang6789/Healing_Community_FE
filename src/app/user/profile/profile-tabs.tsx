"use client";
import { Button } from "@/components/ui/button";
import { getUserIdFromLocalStorage } from "@/lib/utils";
import { Pencil } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ProfileTabs({
  isOwner,
  userId,
}: {
  isOwner: boolean;
  userId: string;
}) {
  const currentUserId = getUserIdFromLocalStorage();
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-6">
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center py-4 border-b">
        {isOwner && (
          <Button
            className="w-full sm:w-auto rounded-[20px] bg-[#707B7C] hover:bg-[#A0A6A8] flex items-center justify-center sm:order-2"
            asChild
          >
            <Link href="/new-post">
              <Pencil className="mr-2 w-4 h-4" />
              <span>Đăng bài viết mới</span>
            </Link>
          </Button>
        )}

        <nav className="flex justify-between sm:justify-start items-center space-x-2 sm:space-x-4 w-full sm:w-auto sm:order-1">
          <Button
            variant={"gradientHoverUnderline"}
            className="text-xs sm:text-sm flex-1 sm:flex-none text-muted-foreground"
          >
            <Link href={`/user/profile/${userId || currentUserId}`}>
              Tường nhà
            </Link>
          </Button>

          {isOwner && (
            <>
              <Button
                variant={"gradientHoverUnderline"}
                className="text-xs sm:text-sm flex-1 sm:flex-none text-muted-foreground"
              >
                <Link href={"/user/profile/expert-info"}>
                  Thông tin chuyên gia
                </Link>
              </Button>
              <Button
                variant={"gradientHoverUnderline"}
                className="text-xs sm:text-sm flex-1 sm:flex-none text-muted-foreground"
              >
                <Link href={"/user/profile/information"}>
                  Thông tin cá nhân
                </Link>
              </Button>
              <Button
                variant={"gradientHoverUnderline"}
                className="text-xs sm:text-sm flex-1 sm:flex-none text-muted-foreground"
              >
                <Link href={"/user/profile/change-password"}>Đổi mật khẩu</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
