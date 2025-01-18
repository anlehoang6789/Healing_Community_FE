"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Role } from "@/constants/type";
import { formatDateTime } from "@/lib/utils";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import { useGetRoleByUserIdQuery } from "@/queries/useAuth";
import { useGetExpertProfileQuery } from "@/queries/useExpert";
import { useRouter } from "next/navigation";
import React from "react";

export default function UserHeaderTopPostInGroupForModerator({
  userId,
  createPost,
  groupId,
  roleInGroup,
}: {
  userId: string;
  createPost: string;
  groupId: string;
  roleInGroup: string;
}) {
  const router = useRouter();
  const { data: roleByUserId } = useGetRoleByUserIdQuery(userId, !!userId);
  const isExpert = roleByUserId?.payload.data.roleName === Role.Expert;
  const {
    data: userProfile,
    isLoading: userLoading,
    isError: userError,
  } = useGetUserProfileQuery(userId, !isExpert && !!userId);
  const {
    data: expertProfile,
    isLoading: expertLoading,
    isError: expertError,
  } = useGetExpertProfileQuery(userId, isExpert && !!userId);

  const isOwnerGroup = roleInGroup === "Owner";
  const isModeratorGroup = roleInGroup === "Moderator";

  if (userLoading || expertLoading)
    return (
      <div className="animate-pulse">
        <div className="w-10 h-10 sm:w-10 sm:h-10 mb-2 bg-gray-200 rounded-full"></div>
        <div>
          <div className="flex items-center space-x-2">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-2 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );

  if (userError || expertError)
    return (
      <div className="text-textChat font-semibold">
        Chức năng đang bảo trì, bạn đợi chút nhé
      </div>
    );
  const handleNavigation = () => {
    router.push(`/user/group-user/${groupId}/user/${userId}`);
  };

  return (
    <>
      <div onClick={handleNavigation}>
        <Avatar className="w-10 h-10 sm:w-10 sm:h-10 border-2 border-rose-300 mb-2">
          <AvatarImage
            src={
              isExpert
                ? expertProfile?.payload.data.profileImageUrl
                : userProfile?.payload.data.profilePicture ||
                  "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
            }
            alt={
              isExpert
                ? expertProfile?.payload.data.fullname ||
                  expertProfile?.payload.data.email
                : userProfile?.payload.data.fullName ||
                  userProfile?.payload.data.userName ||
                  "Anonymous"
            }
          />
          <AvatarFallback>
            {isExpert
              ? expertProfile?.payload.data.fullname ||
                expertProfile?.payload.data.email
              : userProfile?.payload.data.fullName ||
                userProfile?.payload.data.userName ||
                "Anonymous"}
          </AvatarFallback>
        </Avatar>
      </div>
      <div>
        <div className="flex items-center space-x-2">
          <h2
            className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500 mb-1 hover:cursor-pointer"
            onClick={handleNavigation}
          >
            {isExpert
              ? expertProfile?.payload.data.fullname ||
                expertProfile?.payload.data.email
              : userProfile?.payload.data.fullName ||
                userProfile?.payload.data.userName ||
                "Anonymous"}
          </h2>
          {(isOwnerGroup || isModeratorGroup) && (
            <div
              className={`text-xs font-semibold px-2 py-0.5 rounded-full shadow-md ${
                isOwnerGroup
                  ? "bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-gray-100"
                  : "bg-gradient-to-r from-[#d4fc79] to-[#96e6a1] text-gray-600"
              }`}
            >
              {isOwnerGroup ? "Chủ nhóm" : "Quản trị nhóm"}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <p className="text-sm text-gray-500">{formatDateTime(createPost)}</p>
        </div>
      </div>
    </>
  );
}
