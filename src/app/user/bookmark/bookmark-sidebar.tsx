"use client";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GetBookmarkListSchemaType } from "@/schemaValidations/post.schema";
import CreateBookmarkList from "@/app/user/bookmark/create-bookmark-list";
import { toast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
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
import { useDeleteBookmarkListMutation } from "@/queries/usePost";
import { useState } from "react";

interface SidebarProps {
  bookmarkLists: GetBookmarkListSchemaType[];
  selectedList: GetBookmarkListSchemaType | null;
  onSelectList: (list: GetBookmarkListSchemaType) => void;
  isVisible: boolean;
  bookmarkTotals: Record<string, number>;
}

export default function BookmarkSidebar({
  bookmarkLists,
  selectedList,
  onSelectList,
  isVisible,
  bookmarkTotals,
}: SidebarProps) {
  const [bookmarkListDelete, setBookmarkListDelete] =
    useState<GetBookmarkListSchemaType | null>(null);
  const { mutateAsync } = useDeleteBookmarkListMutation();
  const deletePost = async () => {
    if (bookmarkListDelete) {
      try {
        const result = await mutateAsync(bookmarkListDelete.bookmarkId);
        toast({
          description: result.payload.message,
          variant: "success",
        });
        setBookmarkListDelete(null);
      } catch (error) {
        handleErrorApi({ error });
      }
    }
  };
  return (
    <aside
      className={`w-full h-full border-r border-border lg:block ${
        isVisible ? "block" : "hidden"
      }`}
    >
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-textChat">
          Các mục đã lưu
        </h1>
        <CreateBookmarkList />
      </div>
      <ScrollArea className="h-[calc(100vh-140px)]">
        {bookmarkLists.length > 0 ? (
          bookmarkLists.map((list) => {
            const total = bookmarkTotals[list.bookmarkId] || 0;
            return (
              <div
                key={list.bookmarkId}
                className={`p-4 cursor-pointer hover:bg-accent ${
                  selectedList?.bookmarkId === list.bookmarkId
                    ? "bg-accent"
                    : ""
                }`}
                onClick={() => onSelectList(list)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-textChat">
                      {list.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {total} bài lưu
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setBookmarkListDelete(list);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-textChat hover:text-red-500" />
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-textChat text-center p-4">
            Hãy tạo 1 bookmark mới cho bộ sưu tập của mình.
          </p>
        )}
      </ScrollArea>
      <AlertDialog
        open={Boolean(bookmarkListDelete)}
        onOpenChange={(value) => {
          if (!value) {
            setBookmarkListDelete(null);
          }
        }}
        aria-hidden={false}
      >
        <AlertDialogContent className="bg-backgroundChat">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-textChat font-bold text-lg">
              Xóa bộ sưu tập?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Bộ sưu tập có tên{" "}
              <span className="bg-muted text-textChat rounded px-1 font-bold">
                {bookmarkListDelete?.name}
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
    </aside>
  );
}
