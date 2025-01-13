"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Role } from "@/constants/type";
import { formatDateTime } from "@/lib/utils";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import { useGetRoleByUserIdQuery } from "@/queries/useAuth";
import { useGetExpertProfileQuery } from "@/queries/useExpert";
import { useGetPostByPostIdQuery } from "@/queries/usePost";
import Image from "next/image";
import React from "react";

export default function ReportStoryDetails({ postId }: { postId: string }) {
  const { data: postById } = useGetPostByPostIdQuery({
    postId: postId as string,
    enabled: !!postId,
  });

  const { data: roleByUserId } = useGetRoleByUserIdQuery(
    postById?.payload.data.userId as string
  );
  const isExpert = roleByUserId?.payload.data.roleName === Role.Expert;
  //data của user theo userId lấy từ api postById
  const { data: userById } = useGetUserProfileQuery(
    postById?.payload.data.userId as string,
    !isExpert && !!postById?.payload.data.userId
  );
  const { data: expertProfile } = useGetExpertProfileQuery(
    postById?.payload.data.userId as string,
    isExpert && !!postById?.payload.data.userId
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="text-sm text-blue-500 hover:underline cursor-pointer">
          Chi tiết bài viết
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-7xl h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-textChat text-lg text-center font-semibold">
            Bài viết bị báo cáo
          </DialogTitle>
          <DialogDescription className="sr-only">
            Make changes to your profile here. Click save when you done.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full overflow-y-auto h-[calc(90vh-80px)]">
          {postById?.payload.data && (
            <Image
              src={
                postById?.payload.data.coverImgUrl ||
                "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
              }
              alt="Banner"
              width={1000}
              height={500}
              className="w-full h-[450px] object-cover"
            />
          )}

          <div className="flex items-center gap-2 px-4 py-8">
            <Avatar className="w-12 h-12 border-2 border-rose-300">
              <AvatarImage
                src={
                  isExpert
                    ? expertProfile?.payload.data.profileImageUrl
                    : userById?.payload.data.profilePicture ||
                      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                }
                alt={
                  isExpert
                    ? expertProfile?.payload.data.fullname
                    : userById?.payload.data.fullName ||
                      userById?.payload.data.userName
                }
              />
              <AvatarFallback>
                {isExpert
                  ? expertProfile?.payload.data.fullname
                  : userById?.payload.data.fullName ||
                    userById?.payload.data.userName}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500">
                {isExpert
                  ? expertProfile?.payload.data.fullname
                  : userById?.payload.data.fullName ||
                    userById?.payload.data.userName}
              </p>
              <p className="text-sm text-gray-500">
                {formatDateTime(postById?.payload.data.createAt as string)}
              </p>
            </div>
          </div>

          <h1 className="flex justify-center text-3xl px-4 font-bold text-textChat">
            {postById?.payload.data.title}
          </h1>
          <div className="px-4 py-5 space-y-4 text-textChat">
            <div
              dangerouslySetInnerHTML={{
                __html: postById?.payload.data.description as string,
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
