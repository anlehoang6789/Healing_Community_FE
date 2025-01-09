"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetRoleByUserIdQuery } from "@/queries/useAuth";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import { useGetExpertProfileQuery } from "@/queries/useExpert";
import { Role } from "@/constants/type";
import { getUserIdFromLocalStorage } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  useAssignRoleMutation,
  useCheckRoleInGroupQuery,
} from "@/queries/useGroup";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function GroupMemberDetailsForModerator({
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
  const { data } = useCheckRoleInGroupQuery(
    userIdFromLocalStorage as string,
    groupId
  );

  const isOwnerInGroup = data?.payload.data.roleInGroup === "Owner";

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(
    roleInGroup === "Moderator" ? 2 : 1
  );

  const [role, setRole] = useState<string>(String(selectedRole)); // Ép kiểu thành string

  useEffect(() => {
    if (dialogOpen) {
      // Reset role về giá trị mặc định khi Dialog mở
      setRole(roleInGroup === "Moderator" ? "2" : "1");
    }
  }, [dialogOpen, roleInGroup]);

  const assignRoleMutation = useAssignRoleMutation();

  const handleSave = async () => {
    const updatedRole = Number(role);
    try {
      await assignRoleMutation.mutateAsync({
        groupId,
        userId,
        role: updatedRole,
      });
      setDialogOpen(false);
    } catch (error) {
      console.error("Failed to assign role:", error);
    }
  };

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

      {isOwnerInGroup && userIdFromLocalStorage !== userId && (
        <Button variant="outline" onClick={() => setDialogOpen(true)}>
          Thay đổi vai trò
        </Button>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="text-textChat">
          <DialogHeader>
            <DialogTitle>Thay đổi vai trò</DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <Avatar className="w-12 h-12  border-2 border-rose-300 mb-2">
              <AvatarImage
                src={
                  userProfile?.payload.data.profilePicture ||
                  expertProfile?.payload.data.profileImageUrl ||
                  "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                }
                alt="Avatar"
              />
            </Avatar>
            <div>
              <h3>
                {isExpert
                  ? expertProfile?.payload.data.fullname ||
                    expertProfile?.payload.data.email
                  : userProfile?.payload.data.fullName ||
                    userProfile?.payload.data.userName ||
                    "Anonymous"}
              </h3>
            </div>
          </div>
          <RadioGroup
            value={role}
            onValueChange={(value) => setRole(value)}
            className=" gap-10 flex justify-center items-center"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="1" id="member" />
              <label htmlFor="member">Thành viên</label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="2" id="moderator" />
              <label htmlFor="moderator">Quản trị nhóm</label>
            </div>
          </RadioGroup>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSave}>Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
