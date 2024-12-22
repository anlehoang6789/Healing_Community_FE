"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { toast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { useUpdateGroupMutation } from "@/queries/useGroup";
import { useUploadAvatarCoverFromFileMutation } from "@/queries/usePost";
import { GroupType } from "@/schemaValidations/group.schema";
import { CircleHelp, Pencil } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type EditGroupProps = {
  group: GroupType;
};

const EditGroup: React.FC<EditGroupProps> = ({ group }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [groupName, setGroupName] = useState(group.groupName);
  const [isPublic, setIsPublic] = useState(group.groupVisibility === 0);
  const [isAutoApprove, setIsAutoApprove] = useState(group.isAutoApprove);
  const [avatarGroup, setAvatarGroup] = useState(
    group.avatarGroup ||
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
  );
  const [description, setDescription] = useState(group.description || "");

  const updateGroupMutation = useUpdateGroupMutation();
  const { mutateAsync: uploadAvatarCover } =
    useUploadAvatarCoverFromFileMutation();

  const [memberLimit, setMemberLimit] = useState<string>(
    String(group.memberLimit)
  );

  const handleMemberLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^[1-9]\d*$/.test(value) || value === "") {
      setMemberLimit(value);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await uploadAvatarCover(formData);

        if (response && response.payload && response.payload.url) {
          setAvatarGroup(response.payload.url);
        }
      } catch (err) {
        handleErrorApi({ error: err });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await updateGroupMutation.mutateAsync({
        groupId: group.groupId,
        payload: {
          groupName,
          description,
          avatarGroup,
          groupVisibility: isPublic ? 0 : 1,

          isAutoApprove: isAutoApprove,
          memberLimit: memberLimit ? parseInt(memberLimit, 10) : 0,

          createdAt: group.createdAt,
          updatedAt: new Date().toISOString(),
        },
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
        <div className="flex items-center hover:cursor-pointer hover:bg-gray-200 rounded-lg p-2">
          <Pencil className="mr-2 h-4 w-4" />
          <span>Chỉnh sửa</span>
        </div>
      </DialogTrigger>
      <DialogContent className="p-4 w-[375px] lg:w-[512px] md:w-[512px] sm:w-[512px]">
        <DialogTitle className="sr-only">Chỉnh sửa nhóm</DialogTitle>
        <DialogDescription className="sr-only">
          Make changes to your group here. Click save when done.
        </DialogDescription>
        <form
          onSubmit={handleSubmit}
          className="w-[345px] lg:w-[482px] md:w-[482px] sm:w-[482px]"
        >
          <div className="mb-3">
            <div className="flex flex-col items-center gap-3">
              {avatarGroup ? (
                <Image
                  width={200}
                  height={200}
                  src={avatarGroup}
                  alt="Group"
                  className="rounded-lg object-cover"
                />
              ) : (
                <div className="h-52 w-52 bg-gray-300 flex items-center justify-center text-gray-700">
                  No Image
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="w-full border border-gray-300 text-textChat "
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-textChat ">
              Tên nhóm
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-textChat "
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-textChat ">
              Mô tả nhóm
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-textChat resize-none h-[80px]"
            />
          </div>

          <div className="mb-3">
            <div className="flex items-center">
              <label className="block text-sm font-medium text-textChat">
                Giới hạn thành viên
              </label>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <CircleHelp className="ml-2 h-4 w-4 text-textChat" />
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">Chú ý</h4>
                    <p className="text-sm">
                      Giới hạn thành viên tối thiểu là 20 người và tối đa là
                      9999 người
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
            <input
              value={memberLimit}
              type="number"
              onChange={handleMemberLimitChange}
              className="mt-1 block w-[345px] lg:w-[482px] md:w-[482px] sm:w-[482px] border border-gray-300 rounded-md p-2 text-textChat appearance-none "
              required
              min={20}
              max={9999}
            />
          </div>

          <div className="flex justify-between">
            <div className="mb-3">
              <label className="block text-sm font-medium text-textChat ">
                Trạng thái nhóm
              </label>
              <select
                value={isPublic ? "public" : "private"}
                onChange={(e) => setIsPublic(e.target.value === "public")}
                className="mt-1 block w-[145px] lg:w-[200px] md:w-[200px] sm:w-[200px] text-textChat border border-gray-300 rounded-md p-2"
              >
                <option value="public">Công khai</option>
                <option value="private">Riêng tư</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-textChat ">
                Duyệt
              </label>
              <select
                value={isAutoApprove ? "auto" : "manual"}
                onChange={(e) => setIsAutoApprove(e.target.value === "auto")}
                className="mt-1 block w-[145px] lg:w-[200px] md:w-[200px] sm:w-[200px] text-textChat border border-gray-300 rounded-md p-2"
              >
                <option value="auto">Tự động duyệt</option>
                <option value="manual">Duyệt thủ công</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={updateGroupMutation.isPending}>
              {updateGroupMutation.isPending
                ? "Đang cập nhật..."
                : "Cập nhật nhóm"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditGroup;
