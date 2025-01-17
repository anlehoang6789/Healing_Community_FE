"use client";
import React from "react";
import { Role } from "@/constants/type";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import { useGetRoleByUserIdQuery } from "@/queries/useAuth";
import { useGetExpertProfileQuery } from "@/queries/useExpert";

export default function NameSidebarChat({ userId }: { userId: string }) {
  const { data: roleByUserId } = useGetRoleByUserIdQuery(userId);
  const { data: userProfile } = useGetUserProfileQuery(
    userId,
    roleByUserId?.payload.data.roleName === Role.User && !!userId
  );

  // Fetch thông tin chuyên gia
  const { data: expertProfile } = useGetExpertProfileQuery(
    userId,
    roleByUserId?.payload.data.roleName === Role.Expert && !!userId
  );
  const isExpert = roleByUserId?.payload.data.roleName === Role.Expert;
  return (
    <div className="flex items-center space-x-2">
      <span className="font-medium text-sm bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500">
        {isExpert
          ? expertProfile?.payload.data.fullname ||
            userProfile?.payload.data.userName
          : userProfile?.payload.data.fullName ||
            userProfile?.payload.data.userName ||
            "Anonymous"}
      </span>
      {isExpert && (
        <div className="text-xs text-gray-100 px-1 font-semibold bg-gradient-to-r from-[#00c6ff] to-[#0072ff] rounded-full shadow-md">
          Chuyên gia
        </div>
      )}
    </div>
  );
}
