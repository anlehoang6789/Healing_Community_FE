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
import { Input } from "@/components/ui/input";
import { GroupType } from "@/schemaValidations/group.schema";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type EditGroupProps = {
  group: GroupType;
};

const EditGroup: React.FC<EditGroupProps> = ({ group }) => {
  const [groupName, setGroupName] = useState(group.groupName);
  const [isPublic, setIsPublic] = useState(group.groupVisibility === 0);
  const [avatarGroup, setAvatarGroup] = useState(
    group.avatarGroup ||
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
  );
  const [description, setDescription] = useState(group.description || "");

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarGroup(reader.result as string); // Cập nhật avatar
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      groupId: group.groupId,
      groupName,
      description,
      avatarGroup,
      isAutoApprove: group.isAutoApprove,
      groupVisibility: isPublic ? 1 : 0,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center hover:cursor-pointer hover:bg-gray-200 rounded-lg p-2">
          <Pencil className="mr-2 h-4 w-4" />
          <span>Chỉnh sửa</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="sr-only">Chỉnh sửa nhóm</DialogTitle>
        <DialogDescription className="sr-only">
          Make changes to your group here. Click save when done.
        </DialogDescription>
        <form onSubmit={handleSubmit} className="p-4">
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
              <Input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="w-full border border-gray-300 rounded-md "
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Tên nhóm</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Mô tả nhóm</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Trạng thái nhóm</label>
            <select
              value={isPublic ? "public" : "private"}
              onChange={(e) => setIsPublic(e.target.value === "public")}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="public">Công khai</option>
              <option value="private">Riêng tư</option>
            </select>
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="submit">
              Cập nhật nhóm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditGroup;
