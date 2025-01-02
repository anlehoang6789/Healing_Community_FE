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
import {
  useCreateGroupMutation,
  useCrequestGroupMutation,
} from "@/queries/useGroup";
import { useUploadAvatarCoverFromFileMutation } from "@/queries/usePost";
import { CircleHelp, Plus } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { toast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";

const CrequestGroupDialog = () => {
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");

  const crequestGroupMutation = useCrequestGroupMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const groupData = {
      groupName,
      description,
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

      setOpen(false);
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4 text-textChat" />
          <span className="text-textChat">Yêu cầu tạo nhóm</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4 w-[375px] lg:w-[512px] md:w-[512px] sm:w-[512px]">
        <DialogHeader>
          <DialogTitle className="text-textChat">Yêu cầu tạo nhóm</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="w-[345px] lg:w-[482px] md:w-[482px] sm:w-[482px]"
        >
          <div className="mb-3">
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
