"use client";

import { toast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { useDeletePersonalPostInGroupMutation } from "@/queries/usePost";
import { GetPersonalPostGroupListResType } from "@/schemaValidations/post.schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type PersonalPostInGroupItem = GetPersonalPostGroupListResType["data"][0];
export default function AlertDialogDeletePersonalPostInGroup({
  postDelete,
  setPostDelete,
  userId,
  groupId,
}: {
  postDelete: PersonalPostInGroupItem | null;
  setPostDelete: (value: PersonalPostInGroupItem | null) => void;
  userId: string;
  groupId: string;
}) {
  const { mutateAsync } = useDeletePersonalPostInGroupMutation({
    userId: userId as string,
    groupId: groupId as string,
  });
  const deletePost = async () => {
    if (postDelete) {
      try {
        // console.log("Trước khi xóa:", postDelete);
        const result = await mutateAsync(postDelete.postId);
        toast({
          description: result.payload.message,
          variant: "success",
        });
        setPostDelete(null);
      } catch (error) {
        handleErrorApi({ error });
      }
    }
  };

  return (
    <AlertDialog
      open={Boolean(postDelete)}
      onOpenChange={(value) => {
        if (!value) {
          setPostDelete(null);
        }
      }}
      aria-hidden={false}
    >
      <AlertDialogContent className="bg-backgroundChat">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-textChat font-bold text-lg">
            Xóa bài viết?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Bài viết có tiêu đề{" "}
            <span className="bg-muted text-textChat rounded px-1">
              {postDelete?.title}
            </span>{" "}
            sẽ bị xóa vĩnh viễn
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-textChat">Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={deletePost}>Xác nhận</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
