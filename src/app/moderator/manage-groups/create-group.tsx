"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCreateGroupMutation } from "@/queries/useGroup";
import { useUploadAvatarCoverFromFileMutation } from "@/queries/usePost";
import { Plus } from "lucide-react";

const CreateGroupDialog = () => {
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [avatarGroup, setAvatarGroup] = useState("");
  const [isPublic, setIsPublic] = useState(0);
  const [isAutoApprove, setIsAutoApprove] = useState(true);
  const [memberLimit, setMemberLimit] = useState<number>(50);

  const { mutate, isError, error } = useCreateGroupMutation();
  const { mutateAsync: uploadAvatarCover } =
    useUploadAvatarCoverFromFileMutation();

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
        console.error("Failed to upload avatar:", err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const groupData = {
      groupName,
      description,
      avatarGroup,
      groupVisibility: isPublic,
      isAutoApprove,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      memberLimit,
    };

    try {
      await mutate(groupData);
      setGroupName("");
      setDescription("");
      setAvatarGroup("");
      setIsPublic(0);
      setIsAutoApprove(true);
      setMemberLimit(100);
      setOpen(false);
      console.log("Group created successfully");
    } catch (err) {
      console.error("Failed to create group:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          <span>Tạo nhóm</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4 w-[375px] lg:w-[512px] md:w-[512px] sm:w-[512px]">
        <DialogHeader>
          <DialogTitle>Tạo nhóm mới</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="w-[345px] lg:w-[482px] md:w-[482px] sm:w-[482px]"
        >
          <div className="mb-3">
            <div className="flex flex-col items-center gap-3 w-[345px] lg:w-[482px] md:w-[482px] sm:w-[482px]">
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
              <Input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="w-full border border-gray-300 rounded-md "
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-textChat">
              Tên nhóm
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="mt-1 block border border-gray-300 rounded-md p-2 w-[345px] lg:w-[482px] md:w-[482px] sm:w-[482px]"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-textChat">
              Mô tả nhóm
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-[345px] lg:w-[482px] md:w-[482px] sm:w-[482px] border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-textChat">
              Giới hạn thành viên
            </label>
            <input
              type="number"
              value={memberLimit}
              onChange={(e) => setMemberLimit(Number(e.target.value))}
              className="mt-1 block w-[345px] lg:w-[482px] md:w-[482px] sm:w-[482px] border border-gray-300 rounded-md p-2 text-textChat"
              required
            />
          </div>

          <div className="flex justify-between">
            <div className="mb-3">
              <label className="block text-sm font-medium text-textChat w-[200px]">
                Trạng thái nhóm
              </label>
              <select
                value={isPublic === 0 ? "public" : "private"}
                onChange={(e) =>
                  setIsPublic(e.target.value === "public" ? 0 : 1)
                }
                className="mt-1 block w-[145px] lg:w-[200px] md:w-[200px] sm:w-[200px] border border-gray-300 text-textChat rounded-md p-2"
              >
                <option value="public">Nhóm công khai</option>
                <option value="private">Nhóm riêng tư</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-textChat w-[200px]">
                Duyệt
              </label>
              <select
                value={isAutoApprove ? "auto" : "manual"}
                onChange={(e) => setIsAutoApprove(e.target.value === "auto")}
                className="mt-1 block w-[145px] lg:w-[200px] md:w-[200px] sm:w-[200px] border border-gray-300 rounded-md p-2 text-textChat"
              >
                <option value="auto">Tự động duyệt</option>
                <option value="manual">Duyệt thủ công</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Tạo nhóm</Button>
          </div>

          {isError && (
            <div className="text-red-500 text-sm mt-2">
              Error: {error?.message || "Có lỗi xảy ra, vui lòng thử lại!"}
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupDialog;
