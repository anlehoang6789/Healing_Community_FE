"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useCrequestGroupMutation } from "@/queries/useGroup";

import { CircleHelp, Plus } from "lucide-react";

import { toast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useUploadAvatarCoverFromFileMutation } from "@/queries/usePost";
import Image from "next/image";

const CrequestGroupDialog = () => {
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [coverImg, setCoverImg] = useState("");

  const crequestGroupMutation = useCrequestGroupMutation();
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
          setCoverImg(response.payload.url);
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
      coverImg,
    };

    try {
      const result = await crequestGroupMutation.mutateAsync(groupData);

      toast({
        description: result.payload.data,
        variant: "success",
      });

      // Reset form
      setGroupName("");
      setDescription("");
      setCoverImg("");
      setOpen(false);
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  const handleDialogClose = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setGroupName("");
      setDescription("");
      setCoverImg("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4 text-textChat" />
          <span className="text-textChat">Yêu cầu tạo nhóm</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4 w-[375px] lg:w-[512px] md:w-[512px] sm:w-[512px]">
        <DialogHeader>
          <div className="flex items-center">
            <DialogTitle className="text-textChat">
              Yêu cầu tạo nhóm
            </DialogTitle>
            <HoverCard>
              <HoverCardTrigger asChild>
                <CircleHelp className="ml-2 h-5 w-5 text-textChat" />
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-red-600">
                    Lưu ý
                  </h3>
                  <p className="mb-4">
                    Yêu cầu tạo nhóm mới phải đợi quản trị viên kiểm duyệt. Khi
                    duyệt tạo nhóm thì nhóm đó mặc định sẽ là{" "}
                    <span className="p-1 bg-yellow-300 rounded-lg text-gray-800">
                      nhóm kín
                    </span>{" "}
                    và người yêu cầu tạo nhóm sẽ là quản trị viên của nhóm đó.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          <DialogDescription className="sr-only">
            Make changes to your profile here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="w-[345px] lg:w-[482px] md:w-[482px] sm:w-[482px]"
        >
          <div className="mb-3">
            <div className="flex flex-col items-center gap-3 mb-3">
              {coverImg ? (
                <Image
                  width={200}
                  height={200}
                  src={coverImg}
                  alt="Group"
                  className="rounded-lg object-cover h-[200px] w-[200px]"
                />
              ) : (
                <div className="h-52 w-52 bg-gray-300 flex items-center justify-center text-gray-700 rounded-lg">
                  No Image
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="w-full border border-gray-300 text-textChat"
                required
              />
            </div>
            <label className="block text-sm font-medium text-textChat">
              Tên nhóm
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="mt-1 block border border-gray-300 rounded-md p-2 w-[345px] lg:w-[482px] md:w-[482px] sm:w-[482px] text-textChat"
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
              className="mt-1 block w-[345px] lg:w-[482px] md:w-[482px] sm:w-[482px] border border-gray-300 rounded-md p-2 text-textChat resize-none h-[80px]"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={crequestGroupMutation.isPending}>
              {crequestGroupMutation.isPending ? "Đang yêu cầu..." : "Yêu cầu"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CrequestGroupDialog;
