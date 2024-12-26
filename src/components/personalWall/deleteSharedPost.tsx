"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { useDeleteSharedPostMutation } from "@/queries/usePost";
import { SharedPostType } from "@/schemaValidations/post.schema";
import { getUserIdFromLocalStorage } from "@/lib/utils";

type AlertDialogDeleteSharedPostProps = {
  sharedPost: SharedPostType;
  onDeleteSuccess?: () => void;
  children?: React.ReactNode;
};

export default function AlertDialogDeleteSharedPost({
  sharedPost,
  onDeleteSuccess,
  children,
}: AlertDialogDeleteSharedPostProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userId = getUserIdFromLocalStorage();
  const deleteSharedPostMutation = useDeleteSharedPostMutation(
    userId as string
  );

  const handleDeleteSharedPost = async () => {
    try {
      const result = await deleteSharedPostMutation.mutateAsync(
        sharedPost.shareId
      );

      toast({
        description: result.payload.message,
        variant: "success",
      });

      onDeleteSuccess?.();
      setIsDialogOpen(false);
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        {children || (
          <div className="flex items-center w-full p-2 text-sm rounded-md select-none hover:bg-gray-300">
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Xóa bài viết</span>
          </div>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-backgroundChat text-red-500">
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa bài viết được chia sẻ?</AlertDialogTitle>
          <AlertDialogDescription>
            Bài viết được chia sẻ với tiêu đề{" "}
            <span className="bg-muted text-red-500 rounded px-1">
              {sharedPost.title}
            </span>{" "}
            sẽ bị xóa vĩnh viễn
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-textChat">Hủy</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white hover:bg-red-700"
            onClick={handleDeleteSharedPost}
          >
            Xác nhận
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
