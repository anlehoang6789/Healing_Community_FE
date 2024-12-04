"use client";
import { Button } from "@/components/ui/button";
import { Role } from "@/constants/type";
import { toast } from "@/hooks/use-toast";
import {
  getRoleFromLocalStorage,
  getUserIdFromLocalStorage,
  handleErrorApi,
} from "@/lib/utils";
import {
  useFollowUserMutation,
  useGetFollowingQuery,
  useUnfollowUserMutation,
} from "@/queries/useAccount";
import { useGetRoleByUserIdQuery } from "@/queries/useAuth";
import { useUserIsOwnerStore } from "@/store/userStore";
import { Pencil } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ProfileTabs({
  userId,
  isOwner,
}: {
  userId: string | null;
  isOwner: boolean;
}) {
  const role = getRoleFromLocalStorage();
  const { data: roleByUserId } = useGetRoleByUserIdQuery(userId as string);
  const isExpert = roleByUserId?.payload.data.roleName === Role.Expert;
  const { setIsThatOwner } = useUserIsOwnerStore();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const followUser = useFollowUserMutation(userId as string);
  const unFollowUser = useUnfollowUserMutation(userId as string);
  const ownerUserId = getUserIdFromLocalStorage();
  const { data } = useGetFollowingQuery(ownerUserId as string);
  const getFollowingList = data?.payload.data;

  const handleFollowUser = () => {
    if (followUser.isPending) return;
    try {
      followUser.mutateAsync({ followerId: userId as string });
      setIsFollowing(true);
      toast({
        description: "Đã theo dõi người dùng",
        variant: "success",
      });
    } catch (error: any) {
      handleErrorApi(error);
    }
  };

  const handleUnfollow = (userId: string) => {
    if (unFollowUser.isPending) return;
    try {
      unFollowUser.mutateAsync(userId);
      setIsFollowing(false);
      toast({
        description: "Đã bỏ theo dõi người dùng",
        variant: "success",
      });
    } catch (error: any) {
      handleErrorApi(error);
    }
  };

  useEffect(() => {
    setIsThatOwner(isOwner);
    const fetchFollowStatus = () => {
      if (!getFollowingList || !userId) return;

      // Kiểm tra xem userId mục tiêu có trong danh sách theo dõi không
      const isUserFollowing = getFollowingList.some(
        (followedUser) => followedUser.userId === userId
      );

      setIsFollowing(isUserFollowing);
    };

    if (!isOwner) fetchFollowStatus();
  }, [isOwner, setIsThatOwner, getFollowingList, userId]);

  return (
    <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-6">
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center py-4 border-b">
        {isOwner ? (
          <Button className="w-full sm:w-auto rounded-[20px] bg-[#707B7C] hover:bg-[#A0A6A8] flex items-center justify-center sm:order-2">
            <Link
              href="/user/create-post"
              className="flex items-center justify-center"
            >
              <Pencil className="mr-2 w-4 h-4" />
              <span>Đăng bài viết mới</span>
            </Link>
          </Button>
        ) : (
          <Button
            className="w-full sm:w-auto rounded-[20px] bg-[#707B7C] hover:bg-[#A0A6A8] flex items-center justify-center sm:order-2"
            onClick={() =>
              isFollowing ? handleUnfollow(userId!) : handleFollowUser()
            }
          >
            {isFollowing ? "Bỏ theo dõi" : "Theo dõi"}
          </Button>
        )}

        <div className="flex justify-between sm:justify-start items-center space-x-2 sm:space-x-4 w-full sm:w-auto sm:order-1">
          <Button
            variant={"gradientHoverUnderline"}
            className="text-xs sm:text-sm flex-1 sm:flex-none text-muted-foreground"
          >
            <Link href={`/user/profile/${userId}`}>Tường nhà</Link>
          </Button>

          {(isOwner && role === Role.Expert) || (!isOwner && isExpert) ? (
            <Button
              variant={"gradientHoverUnderline"}
              className="text-xs sm:text-sm flex-1 sm:flex-none text-muted-foreground"
            >
              <Link href={`/user/profile/expert-info/${userId}`}>
                Thông tin chuyên gia
              </Link>
            </Button>
          ) : null}

          {isOwner && role !== Role.Expert && (
            <Button
              variant={"gradientHoverUnderline"}
              className="text-xs sm:text-sm flex-1 sm:flex-none text-muted-foreground"
            >
              <Link href={"/user/profile/information"}>Thông tin cá nhân</Link>
            </Button>
          )}

          {isOwner && (
            <>
              <Button
                variant={"gradientHoverUnderline"}
                className="text-xs sm:text-sm flex-1 sm:flex-none text-muted-foreground"
              >
                <Link href={"/user/profile/change-password"}>Đổi mật khẩu</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
