"use client";

import { Button } from "@/components/ui/button";
import { Role } from "@/constants/type";

import { handleErrorApi } from "@/lib/utils";
import {
  useGetFollowingQuery,
  useUnfollowUserMutation,
} from "@/queries/useAccount";
import { useGetRoleByUserIdQuery } from "@/queries/useAuth";
import { useGetExpertProfileQuery } from "@/queries/useExpert";
import { useGetPostCountQuery } from "@/queries/usePost";
import { useUserIsOwnerStore } from "@/store/userStore";
import { BadgeCheck } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

export default function FollowedUser() {
  const { userId } = useParams();
  const { data } = useGetFollowingQuery(userId as string);
  const getFollowingList = data?.payload.data;
  const { isThatOwner } = useUserIsOwnerStore();
  const { data: roleByUserId } = useGetRoleByUserIdQuery(
    userId as string,
    !!userId
  );
  const isExpert = roleByUserId?.payload.data.roleName === Role.Expert;
  const { data: expertProfile } = useGetExpertProfileQuery(
    userId as string,
    isExpert && !!userId
  );

  //handle unfollow
  const unFollowUser = useUnfollowUserMutation(userId as string);
  const handleUnfollow = (userId: string) => {
    if (unFollowUser.isPending) return;
    try {
      unFollowUser.mutateAsync(userId);
    } catch (error: any) {
      handleErrorApi(error);
    }
  };

  // Số bài viết của người theo dõi
  const PostCount = ({ userId }: { userId: string }) => {
    const { data: postCountData } = useGetPostCountQuery(userId);

    return (
      <p className="text-xs text-gray-500">
        {postCountData?.payload.data.postCount} bài viết
      </p>
    );
  };

  if (!getFollowingList)
    return (
      <div className="text-center text-textChat">
        Hiện đang bảo trì, bạn đợi chút nhé
      </div>
    );

  return (
    <div className="p-4 rounded-lg shadow-lg border">
      <h2 className="text-lg font-bold pb-2 text-muted-foreground">
        Đã theo dõi
      </h2>

      <ul className="space-y-5 overflow-y-auto max-h-[300px] min-h-[100px]">
        {!getFollowingList.length ? (
          <div className="text-muted-foreground text-center text-sm">
            Hiện tại bạn chưa có theo dõi người dùng nào
          </div>
        ) : (
          <>
            {getFollowingList.map((user) => (
              <li
                key={user.userId}
                className="flex justify-between items-center my-2"
              >
                <Link
                  href={`/user/profile/${user.userId}`}
                  className="flex items-center space-x-2 sm:space-x-2 md:space-x-1 lg:space-x-3"
                >
                  <Image
                    src={
                      isExpert
                        ? (expertProfile?.payload.data
                            .profileImageUrl as string)
                        : user.profilePicture ||
                          "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                    }
                    alt={`${user.userName}'s avatar`}
                    width={40}
                    height={40}
                    className="rounded-full object-cover w-10 h-10 md:w-7 md:h-7 sm:w-10 sm:h-10 lg:w-10 lg:h-10"
                    priority
                  />
                  <div className="flex flex-col">
                    <p className="truncate max-w-[100px] bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500 text-base sm:text-base md:text-xs lg:text-base">
                      {isExpert
                        ? expertProfile?.payload.data.fullname ||
                          expertProfile?.payload.data.email
                        : user.fullName || user.userName}
                    </p>
                    <p className="text-xs text-gray-500">
                      <PostCount userId={user.userId} />
                    </p>
                  </div>
                </Link>

                {isThatOwner && (
                  <div className="flex items-center space-x-1 sm:space-x-1 md:space-x-1 lg:space-x-2">
                    <Button
                      variant="outline"
                      className="flex items-center bg-[#c2eaf7] hover:bg-[#d2f5ff] text-black text-xs rounded-full border-none px-4 py-2 md:px-1 md:py-0 sm:px-4 sm:py-2 lg:px-3 lg:py-1 sm:text-xs md:text-[10px] lg:text-xs"
                      onClick={() => handleUnfollow(user.userId)}
                    >
                      <BadgeCheck
                        className="w-5 h-5 mr-1 text-green-700 lg:w-5 lg:h-5 md:w-4 md:h-4 sm:w-5 sm:h-5"
                        strokeWidth="3px"
                      />
                      Đã theo dõi
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
}
