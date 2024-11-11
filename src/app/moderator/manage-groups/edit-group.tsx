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
import { Pencil } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type Group = {
  id: string;
  name: string;
  memberCount: number;
  createdDate: string;
  isPublic: boolean;
  leader?: string;
  imageUrl: string;
};

type EditGroupProps = {
  group: Group;
};

const EditGroup: React.FC<EditGroupProps> = ({ group }) => {
  const [name, setName] = useState(group.name);
  const [isPublic, setIsPublic] = useState(group.isPublic);
  const [leader, setLeader] = useState(
    group.isPublic ? "" : group.leader || ""
  );

  const [imageUrl, setImageUrl] = useState(group.imageUrl); // State cho hình ảnh

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string); // Cập nhật hình ảnh
      };
      reader.readAsDataURL(file); // Đọc file hình ảnh
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý cập nhật nhóm ở đây
    console.log({
      id: group.id,
      name,
      isPublic,
      leader,
      imageUrl,
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
              <Image
                width={200}
                height={200}
                src={imageUrl}
                alt="Group"
                className="rounded-lg object-cover"
              />
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-md "
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Tên nhóm</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">
              Số lượng thành viên
            </label>
            <span className="block w-full  rounded-md ">
              {group.memberCount.toLocaleString()}
            </span>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Ngày tạo</label>
            <span className=" block w-full  rounded-md ">
              {group.createdDate}
            </span>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Trạng thái nhóm</label>
            <select
              value={isPublic ? "public" : "private"}
              onChange={(e) => {
                const value = e.target.value === "public";
                setIsPublic(value);
                if (value) {
                  setLeader(""); // Reset trưởng nhóm nếu chuyển sang công khai
                }
              }}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="public">Công khai</option>
              <option value="private">Riêng tư</option>
            </select>
          </div>

          {!isPublic && (
            <div className="mb-4">
              <label className="block text-sm font-medium">Trưởng nhóm</label>
              <Input
                type="text"
                value={leader}
                onChange={(e) => setLeader(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          )}
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
