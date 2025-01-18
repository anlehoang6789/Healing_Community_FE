"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Role } from "@/constants/type";
import { toast } from "@/hooks/use-toast";
import { formatDateTime, handleErrorApi } from "@/lib/utils";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import { useGetRoleByUserIdQuery } from "@/queries/useAuth";
import { useGetExpertProfileQuery } from "@/queries/useExpert";
import { useApproveOrRejectRequestJoinGroupMutation } from "@/queries/useGroup";
import { RequestJoinGroupType } from "@/schemaValidations/group.schema";
import { Check, X } from "lucide-react";

export default function RequestJoinDetailsForModerator({
  queueId,
  groupId,
  userId,
  requestedAt,
}: RequestJoinGroupType) {
  const { data: roleByUserId } = useGetRoleByUserIdQuery(userId, !!userId);
  const isExpert = roleByUserId?.payload.data.roleName === Role.Expert;
  const { data: userProfile } = useGetUserProfileQuery(
    userId,
    !isExpert && !!userId
  );
  const { data: expertProfile } = useGetExpertProfileQuery(
    userId,
    isExpert && !!userId
  );
  //approve or reject request
  const approveOrRejectMutation =
    useApproveOrRejectRequestJoinGroupMutation(groupId);
  const handleApproveRequest = async () => {
    if (approveOrRejectMutation.isPending) return;
    try {
      const result = await approveOrRejectMutation.mutateAsync({
        queueId,
        isApproved: true,
      });
      toast({
        description: result.payload.message,
        variant: "success",
      });
    } catch (error: any) {
      handleErrorApi(error);
    }
  };

  const handleRejectRequest = async () => {
    if (approveOrRejectMutation.isPending) return;
    try {
      const result = await approveOrRejectMutation.mutateAsync({
        queueId,
        isApproved: false,
      });
      toast({
        description: result.payload.message,
        variant: "success",
      });
    } catch (error: any) {
      handleErrorApi(error);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:items-center sm:justify-between sm:w-full">
      <div className="flex items-center space-x-4 sm:space-x-6">
        <Avatar>
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
        <div>
          <p className="font-medium">
            {" "}
            {isExpert
              ? expertProfile?.payload.data.fullname ||
                expertProfile?.payload.data.email
              : userProfile?.payload.data.fullName ||
                userProfile?.payload.data.userName ||
                "Anonymous"}
          </p>
          <p className="text-sm text-muted-foreground">
            Ngày yêu cầu: {formatDateTime(requestedAt)}
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
        <Button
          size="sm"
          className="w-full sm:w-auto"
          onClick={handleApproveRequest}
        >
          <Check className="w-4 h-4 mr-1" />
          Chấp thuận
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="w-full sm:w-auto"
          onClick={handleRejectRequest}
        >
          <X className="w-4 h-4 mr-1" />
          Từ chối
        </Button>
      </div>
    </div>
  );
}
