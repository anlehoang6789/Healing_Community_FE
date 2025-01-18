"use client";

import { UserCheck, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetRoleByUserIdQuery } from "@/queries/useAuth";
import {
  useFollowUserMutation,
  useGetFollowingQuery,
  useGetUserProfileQuery,
  useUnfollowUserMutation,
} from "@/queries/useAccount";
import { useGetExpertProfileQuery } from "@/queries/useExpert";
import { Role } from "@/constants/type";
import { getUserIdFromLocalStorage, handleErrorApi } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useUserIsOwnerStore } from "@/store/userStore";
import {
  useCheckRoleInGroupQuery,
  useRemoveMemberMutation,
} from "@/queries/useGroup";

export default function GroupMemberDetails({
  userId,
  roleInGroup,
  groupId,
}: {
  userId: string;
  roleInGroup: string;
  groupId: string;
}) {
  const { data: roleByUserId } = useGetRoleByUserIdQuery(userId);
  const isExpert = roleByUserId?.payload.data.roleName === Role.Expert;
  const {
    data: userProfile,
    isLoading: userProfileLoading,
    isError: userProfileError,
  } = useGetUserProfileQuery(userId, !isExpert && !!userId);
  const {
    data: expertProfile,
    isLoading: expertProfileLoading,
    isError: expertProfileError,
  } = useGetExpertProfileQuery(userId, isExpert && !!userId);

  const userIdFromLocalStorage = getUserIdFromLocalStorage();
  const isOwner = userIdFromLocalStorage === userId;

  const { data: checkRole } = useCheckRoleInGroupQuery(userId, groupId);

  const { data: checkRoleModer } = useCheckRoleInGroupQuery(
    userIdFromLocalStorage as string,
    groupId
  );
  const isModeratorInGroup =
    checkRoleModer?.payload.data.roleInGroup === "Moderator";

  const isOwnerInGroup = checkRole?.payload.data.roleInGroup === "Owner";

  const remooveMemberMutation = useRemoveMemberMutation(groupId);
  const handleRemoveMember = async () => {
    if (remooveMemberMutation.isPending) return;
    try {
      const res = await remooveMemberMutation.mutateAsync({
        groupId: groupId,
        memberUserId: userId,
      });
      toast({
        description: res.payload.message,
        variant: "success",
      });
    } catch (error: any) {
      handleErrorApi(error);
    }
  };

  //logic follow and unfollow
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const followUser = useFollowUserMutation(userId as string);
  const unFollowUser = useUnfollowUserMutation(userId as string);
  const { setIsThatOwner } = useUserIsOwnerStore();
  const { data } = useGetFollowingQuery(userIdFromLocalStorage as string);
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

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "User":
        return "Thành viên";
      case "Owner":
        return "Chủ nhóm";
      case "Moderator":
        return "Quản trị nhóm";
      default:
        return "Thành viên";
    }
  };

  if (userProfileLoading || expertProfileLoading)
    return (
      <>
        <div className="flex items-center gap-3 animate-pulse">
          <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-gray-200 mb-2"></div>
          <div>
            <div className="h-4 w-20 bg-gray-200 rounded mb-1"></div>
            <div className="h-3 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="h-8 w-32 bg-gray-200 rounded"></div>
      </>
    );

  if (userProfileError || expertProfileError)
    return (
      <div className="text-textChat font-bold">
        Chức năng hiện đang bảo trì, bạn hãy chờ chút nhé!
      </div>
    );

  return (
    <>
      <div className="flex items-center gap-3">
        <Avatar className="w-6 h-6 sm:w-10 sm:h-10 border-2 border-rose-300 mb-2">
          <AvatarImage
            src={
              userProfile?.payload.data.profilePicture ||
              expertProfile?.payload.data.profileImageUrl ||
              "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
            }
            alt={
              userProfile?.payload.data.fullName ||
              expertProfile?.payload.data.fullname ||
              "Anonymous"
            }
          />
          <AvatarFallback>
            {" "}
            {isExpert
              ? expertProfile?.payload.data.fullname ||
                expertProfile?.payload.data.email
              : userProfile?.payload.data.fullName ||
                userProfile?.payload.data.userName ||
                "Anonymous"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium text-textChat text-sm sm:text-base">
            {isExpert
              ? expertProfile?.payload.data.fullname ||
                expertProfile?.payload.data.email
              : userProfile?.payload.data.fullName ||
                userProfile?.payload.data.userName ||
                "Anonymous"}
          </h3>
          <div className="flex items-center gap-2">
            <span
              className={`text-sm ${
                roleInGroup === "User"
                  ? "text-muted-foreground"
                  : "text-blue-400"
              }`}
            >
              {getRoleLabel(roleInGroup)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {!isOwner && !isOwnerInGroup && (
          <Button
            variant="outline"
            asChild
            onClick={() =>
              isFollowing ? handleUnfollow(userId!) : handleFollowUser()
            }
          >
            {!isFollowing ? (
              <div className="flex items-center space-x-2 hover:cursor-pointer">
                <UserPlus className="h-3 w-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-base hidden sm:block">
                  Theo dõi người dùng
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 hover:cursor-pointer">
                <UserCheck className="h-3 w-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-base hidden sm:block">
                  Bỏ theo dõi người dùng
                </span>
              </div>
            )}
          </Button>
        )}
        {isModeratorInGroup && !isOwner && !isOwnerInGroup && (
          <Button variant="destructive" onClick={() => handleRemoveMember()}>
            Xóa thành viên
          </Button>
        )}
      </div>
    </>
  );
}
