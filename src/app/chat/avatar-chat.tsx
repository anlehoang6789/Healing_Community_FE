"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Role } from "@/constants/type";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import { useGetRoleByUserIdQuery } from "@/queries/useAuth";
import { useGetExpertProfileQuery } from "@/queries/useExpert";
import React from "react";

export default function AvatarChat({ userId }: { userId: string }) {
  const { data: roleByUserId } = useGetRoleByUserIdQuery(userId, !!userId);
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
    <Avatar className="h-10 w-10">
      <AvatarImage
        src={
          isExpert
            ? expertProfile?.payload.data.profileImageUrl
            : userProfile?.payload.data.profilePicture ||
              "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
        }
      />
      <AvatarFallback>
        {isExpert
          ? expertProfile?.payload.data.fullname ||
            expertProfile?.payload.data.email
          : userProfile?.payload.data.profilePicture ||
            userProfile?.payload.data.email}
      </AvatarFallback>
    </Avatar>
  );
}
