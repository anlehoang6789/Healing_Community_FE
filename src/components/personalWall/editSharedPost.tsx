"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserIdFromLocalStorage } from "@/lib/utils";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import { toast } from "@/hooks/use-toast";
import { useUpdateSharedPostMutation } from "@/queries/usePost";
import { handleErrorApi } from "@/lib/utils";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";
import { SharedPostType } from "@/schemaValidations/post.schema";
import { useGetExpertProfileQuery } from "@/queries/useExpert";
import { Role } from "@/constants/type";
import { useGetRoleByUserIdQuery } from "@/queries/useAuth";
import accountApiRequest from "@/apiRequests/account";
import { PersonalInformationBodyType } from "@/schemaValidations/account.schema";

type UpdateSharedPostDialogProps = {
  sharedPost: SharedPostType;
  children?: React.ReactNode;
};

export default function UpdateSharedPostDialog({
  sharedPost,
  children,
}: UpdateSharedPostDialogProps) {
  const [description, setDescription] = useState(
    sharedPost.shareDescription || ""
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [originalPostUserProfile, setOriginalPostUserProfile] = useState<
    PersonalInformationBodyType["data"] | null
  >(null);

  const userId = getUserIdFromLocalStorage();
  const { data: userById } = useGetUserProfileQuery(userId as string);
  const { data: roleByUserId } = useGetRoleByUserIdQuery(
    userId as string,
    !!userId
  );
  const isExpert = roleByUserId?.payload.data.roleName === Role.Expert;
  const { data: expertProfile } = useGetExpertProfileQuery(
    userId as string,
    isExpert
  );

  useEffect(() => {
    const fetchOriginalPostUserProfile = async () => {
      try {
        const userProfileResponse = await accountApiRequest.getUserProfile(
          sharedPost.userId
        );
        setOriginalPostUserProfile(userProfileResponse.payload.data);
      } catch (error) {
        console.error(
          `Error fetching profile for shared post ${sharedPost.shareId}:`,
          error
        );
        setOriginalPostUserProfile(null);
      }
    };

    if (sharedPost.userId) {
      fetchOriginalPostUserProfile();
    }
  }, [sharedPost.userId, sharedPost.shareId]);

  const updateSharedPostMutation = useUpdateSharedPostMutation();

  const handleUpdateSharedPost = async () => {
    try {
      const result = await updateSharedPostMutation.mutateAsync({
        shareId: sharedPost.shareId,
        description,
      });

      toast({
        description: result.payload.message,
        variant: "success",
      });

      setIsDialogOpen(false);
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {children || <Button variant="outline">Sửa bài viết</Button>}
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="w-full flex text-textChat text-2xl items-center justify-center">
            Cập nhật bài viết
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10 border-2 border-rose-300">
              <AvatarImage
                src={
                  userById?.payload.data.profilePicture ||
                  expertProfile?.payload.data.profileImageUrl ||
                  "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                }
              />
              <AvatarFallback>
                {userById?.payload.data.fullName ||
                  userById?.payload.data.userName ||
                  expertProfile?.payload.data.fullname ||
                  "A"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col pt-2 justify-center gap-1">
              <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500">
                {userById?.payload.data.fullName ||
                  userById?.payload.data.userName ||
                  expertProfile?.payload.data.fullname ||
                  "Anonymous"}
              </span>
              <div className="flex items-center gap-1">
                <div className="h-7 text-xs text-textChat ">Tường nhà</div>
              </div>
            </div>
          </div>

          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onClick={(e) => {
              e.stopPropagation();
            }}
            placeholder="Hãy nói gì đó về nội dung này (không bắt buộc)"
            className="min-h-[100px] resize-none mb-2 mt-4"
          />

          <div className="flex justify-end">
            <Button
              onClick={handleUpdateSharedPost}
              className="bg-gradient-to-r from-rose-400 to-violet-500 text-black"
            >
              Cập nhật
            </Button>
          </div>

          {/* Bài viết gốc */}
          <Card className="mt-4 border rounded-lg overflow-hidden">
            <div className="flex items-center gap-4 p-4">
              <Avatar className="w-10 h-10 border-2 border-rose-300">
                <AvatarImage
                  src={
                    originalPostUserProfile?.profilePicture ||
                    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                  }
                  alt="Post author"
                />
                <AvatarFallback>
                  {originalPostUserProfile?.fullName?.[0] || "A"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500">
                  {originalPostUserProfile?.fullName ||
                    originalPostUserProfile?.userName ||
                    "Anonymous"}
                </h2>
                <p className="text-sm text-gray-500">
                  {formatDateTime(sharedPost.createAt)}
                </p>
              </div>
            </div>

            <Image
              src={sharedPost.coverImgUrl}
              alt="Post cover"
              width={1000}
              height={500}
              className="w-full h-[200px] object-cover"
            />

            <div className="p-4">
              <div className="font-bold text-lg text-center mb-2">
                {sharedPost.title}
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
