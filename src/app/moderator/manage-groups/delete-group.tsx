"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Trash2 } from "lucide-react";
import { useDeleteGroupByGroupIdMutation } from "@/queries/useGroup";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteGroupProps {
  groupId: string;
  groupName: string;
}

export default function DeleteGroup({ groupId, groupName }: DeleteGroupProps) {
  const deleteGroupMutation = useDeleteGroupByGroupIdMutation();

  const handleDelete = async () => {
    try {
      const result = await deleteGroupMutation.mutateAsync(groupId);
      toast({
        description: result.payload.message,
        variant: "success",
      });
    } catch (error) {
      toast({
        description: "Xóa nhóm thất bại. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex items-center group hover:cursor-pointer hover:bg-gray-200 rounded-lg p-2">
          <Trash2 className="mr-2 h-4 w-4 group-hover:text-red-500" />
          <span className="group-hover:text-red-500">Xóa nhóm</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px] bg-backgroundChat text-red-500">
        <AlertDialogTitle className="sr-only">Delete Group</AlertDialogTitle>
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-red-500">Xác nhận xóa nhóm</h1>
          <p className="text-muted-foreground">
            Bạn có chắc chắn muốn xóa nhóm{" "}
            <b className="text-red-500">{groupName} </b>không?
          </p>
        </div>
        <AlertDialogFooter className="flex flex-col md:flex-row items-center mt-3">
          <AlertDialogCancel asChild>
            <Button
              type="button"
              variant={"outline"}
              className="text-muted-foreground hover:border-[#ef4444] hover:bg-[#ff5d5d0a] hover:text-red-500 md:mb-0 mb-4"
            >
              Hủy
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white hover:bg-red-700"
            onClick={handleDelete}
          >
            Xác nhận
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
