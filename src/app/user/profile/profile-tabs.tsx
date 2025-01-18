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
import { MessageCircle, Pencil } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ProfileTabs({
  userId,
  isOwner,
}: {
  userId: string | null;
  isOwner: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const role = getRoleFromLocalStorage();
  const { data: roleByUserId } = useGetRoleByUserIdQuery(
    userId as string,
    !!userId
  );
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

  const handleMessageClick = async () => {
    if (isFollowing) {
      // If already following, just redirect to the chat page
      router.push(`/chat`);
    } else {
      // If not following, follow the user first, then redirect
      try {
        await followUser.mutateAsync({ followerId: userId as string });
        setIsFollowing(true); // Update the follow status
        // Redirect to the chat page after following
        router.push(`/chat`);
      } catch (error: any) {
        handleErrorApi(error);
      }
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

  const activeTab = pathname.startsWith(`/user/profile/change-password`)
    ? "change-password"
    : pathname.startsWith(`/user/profile/${userId}/expert-info`)
    ? "expert-info"
    : pathname.startsWith(`/user/profile/information`)
    ? "user-info"
    : pathname.startsWith(`/user/profile/${userId}`)
    ? "personal-wall"
    : pathname.startsWith(`/user/profile/${userId}/bank-information`)
    ? "bank-information"
    : "personal-wall";

  return (
    <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-6">
      <div className="flex flex-col space-y-4 sm:space-y-0 lg:flex-row sm:justify-between sm:items-center py-4 border-b">
        {isOwner ? (
          <Button className="w-full sm:w-auto bg-[#707B7C] hover:bg-[#A0A6A8] flex items-center justify-center sm:order-2">
            <Link
              href="/user/create-post"
              className="flex items-center justify-center"
            >
              <Pencil className="mr-2 w-4 h-4" />
              <span>Đăng bài viết mới</span>
            </Link>
          </Button>
        ) : (
          <div className="flex space-x-2 sm:space-x-4 sm:order-2">
            <Button
              className="flex-1 md:flex-none"
              onClick={handleMessageClick}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Nhắn tin
            </Button>
            <Button
              variant={"outline"}
              className="w-full sm:w-auto flex items-center justify-center sm:order-2 text-textChat"
              onClick={() =>
                isFollowing ? handleUnfollow(userId!) : handleFollowUser()
              }
            >
              {isFollowing ? "Bỏ theo dõi" : "Theo dõi"}
            </Button>
          </div>
        )}

        <div className="flex justify-between sm:justify-start items-center space-x-2 sm:space-x-4 w-full sm:w-auto sm:order-1 overflow-x-auto pb-2">
          <Link href={`/user/profile/${userId}`} passHref>
            <Button
              variant={
                activeTab === "personal-wall"
                  ? "gradientUnderline"
                  : "gradientHoverUnderline"
              }
              className="text-xs sm:text-sm flex-1 sm:flex-none text-muted-foreground"
            >
              Tường nhà
            </Button>
          </Link>

          {(isOwner && role === Role.Expert) || (!isOwner && isExpert) ? (
            <Link href={`/user/profile/${userId}/expert-info`} passHref>
              <Button
                variant={
                  activeTab === "expert-info"
                    ? "gradientUnderline"
                    : "gradientHoverUnderline"
                }
                className="text-xs sm:text-sm flex-1 sm:flex-none text-muted-foreground"
              >
                Thông tin chuyên gia
              </Button>
            </Link>
          ) : null}

          {isOwner && role !== Role.Expert && (
            <Link href={`/user/profile/${userId}/information`} passHref>
              <Button
                variant={
                  activeTab === "user-info"
                    ? "gradientUnderline"
                    : "gradientHoverUnderline"
                }
                className="text-xs sm:text-sm flex-1 sm:flex-none text-muted-foreground"
              >
                Thông tin cá nhân
              </Button>
            </Link>
          )}

          {isOwner && (
            <Link href={`/user/profile/${userId}/change-password`}>
              <Button
                variant={
                  activeTab === "change-password"
                    ? "gradientUnderline"
                    : "gradientHoverUnderline"
                }
                className="text-xs sm:text-sm flex-1 sm:flex-none text-muted-foreground"
              >
                Đổi mật khẩu
              </Button>
            </Link>
          )}

          {isOwner && (
            <Link href={`/user/profile/${userId}/bank-information`}>
              <Button
                variant={
                  activeTab === "bank-information"
                    ? "gradientUnderline"
                    : "gradientHoverUnderline"
                }
                className="text-xs sm:text-sm flex-1 sm:flex-none text-muted-foreground"
              >
                Thông tin ngân hàng
              </Button>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
