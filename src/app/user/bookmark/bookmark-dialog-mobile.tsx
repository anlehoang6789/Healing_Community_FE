"use client";
import { toast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import {
  useAddBookmarkListDetailsMutation,
  useCreateBookmarkListMutation,
  useDeleteBookmarkListDetailsMutation,
  useGetBookmarkListDetailsQuery,
  useGetBookmarkListQuery,
} from "@/queries/usePost";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { DeleteBookmarkListDetailsBodyType } from "@/schemaValidations/post.schema";

interface BookmarkDialogMobileProps {
  postId: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function BookmarkDialogMobile({
  postId,
  isOpen,
  setIsOpen,
}: BookmarkDialogMobileProps) {
  const [isCreatingBookmark, setIsCreatingBookmark] = useState(false);
  const [newBookmarkName, setNewBookmarkName] = useState("");
  const [isCreatingBookmarkLoading, setIsCreatingBookmarkLoading] =
    useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState<string | null>(null);
  //show bookmark list
  const {
    data: bookmarkList,
    isLoading: isLoadingBookmarks,
    isError,
  } = useGetBookmarkListQuery();
  const bookmarkListArray = bookmarkList?.payload.data || [];

  //get bookmark details
  const bookmarkDetails = useGetBookmarkListDetailsQuery({
    bookmarkId: selectedBookmark || "",
    enabled: !!selectedBookmark,
  });
  const bookmarkDetailsArray = bookmarkDetails.data?.payload.data || [];

  const isPostBookmarked = bookmarkDetailsArray.some(
    (detail) => detail.postId === postId
  );

  //add bookmark
  const addPostToBookmarkMutation = useAddBookmarkListDetailsMutation(
    selectedBookmark || ""
  );
  const handleAddPostToBookmark = async () => {
    if (addPostToBookmarkMutation.isPending) return;
    try {
      const result = await addPostToBookmarkMutation.mutateAsync({
        bookmarkId: selectedBookmark || "",
        postId,
      });
      toast({
        description: result.payload.message,
        variant: "success",
      });
      setIsOpen(false);
    } catch (error: any) {
      handleErrorApi(error);
    }
  };

  //delete bookmark details
  const deleteBookmarkListDetailsMutation =
    useDeleteBookmarkListDetailsMutation(selectedBookmark || "");
  const handleDelete = async (body: DeleteBookmarkListDetailsBodyType) => {
    if (deleteBookmarkListDetailsMutation.isPending) return;
    try {
      const res = await deleteBookmarkListDetailsMutation.mutateAsync(body);
      toast({
        description: res.payload.message,
        variant: "success",
      });
      setIsOpen(false);
    } catch (error: any) {
      handleErrorApi(error);
    }
  };

  const createBookmarkListMutation = useCreateBookmarkListMutation();
  const handleCreateBookmark = async (e: FormEvent) => {
    try {
      setIsCreatingBookmarkLoading(true);
      // Gọi API tạo bookmark list
      const result = await createBookmarkListMutation.mutateAsync({
        name: newBookmarkName,
      });
      e.stopPropagation();
      toast({
        description: result.payload.message,
        variant: "success",
      });
      setNewBookmarkName("");
      setIsCreatingBookmark(false);
    } catch (error: any) {
      handleErrorApi(error);
    }
  };

  if (isError) {
    return (
      <p className="text-center font-semibold text-textChat">
        Chức năng hiện đang bảo trì. Bạn chờ chút nhé
      </p>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-textChat">
            Chọn danh sách Bookmark
          </DialogTitle>
          <DialogDescription className="sr-only">
            Phiên bản mobile cho trang details post
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {isLoadingBookmarks ? (
            <div className="animate-pulse">
              <button className="rounded-full mt-7 bg-gray-200 h-8 w-8"></button>

              <div>
                <h1 className="text-textChat font-bold">
                  Chọn danh sách Bookmark
                </h1>
                <div className="space-y-4 py-2">
                  <p className="bg-gray-200 h-4 w-full rounded"></p>
                  <p className="bg-gray-200 h-4 w-full rounded"></p>
                  <p className="bg-gray-200 h-4 w-full rounded"></p>
                </div>
                <div>
                  <button className="bg-gray-200 h-10 w-10 rounded"></button>
                  <button className="bg-gray-200 h-10 w-10 rounded"></button>
                </div>
              </div>
            </div>
          ) : bookmarkListArray.length ? (
            bookmarkListArray.map((bookmarkItem) => (
              <div
                key={bookmarkItem.bookmarkId}
                className={`flex items-center justify-between px-4 py-2 border rounded-md cursor-pointer ${
                  selectedBookmark === bookmarkItem.bookmarkId
                    ? "bg-purple-100 border-purple-400"
                    : "hover:bg-gray-100"
                }`}
                onClick={(e) => {
                  setSelectedBookmark(bookmarkItem.bookmarkId);
                  e.stopPropagation();
                }}
              >
                <p className="font-semibold text-gray-600">
                  {bookmarkItem.name}
                </p>
                {selectedBookmark === bookmarkItem.bookmarkId &&
                isPostBookmarked ? (
                  <BookmarkFilledIcon className="h-5 w-5 text-gray-600" />
                ) : (
                  <Bookmark className="h-5 w-5 text-gray-600" />
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-center text-textChat font-semibold">
                Bạn chưa có danh sách bookmark nào.
              </p>
              <Button
                variant="default"
                onClick={(e) => {
                  setIsCreatingBookmark(true);
                  e.stopPropagation();
                }}
              >
                Tạo danh sách mới
              </Button>
              {isCreatingBookmark && (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    className="border rounded px-2 py-1 text-textChat"
                    placeholder="Nhập tên danh sách"
                    value={newBookmarkName}
                    onChange={(e) => {
                      setNewBookmarkName(e.target.value);
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
                  <Button
                    variant="default"
                    onClick={handleCreateBookmark}
                    disabled={
                      !newBookmarkName.trim() || isCreatingBookmarkLoading
                    }
                  >
                    {isCreatingBookmarkLoading ? "Đang tạo..." : "Lưu"}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            className="text-muted-foreground mt-2 md:mt-0"
            onClick={() => {
              setSelectedBookmark(null);
              setIsOpen(false);
            }}
          >
            Hủy
          </Button>
          {isPostBookmarked ? (
            <Button
              onClick={() =>
                handleDelete({
                  bookmarkId: selectedBookmark || "",
                  postId,
                })
              }
              disabled={deleteBookmarkListDetailsMutation.isPending}
            >
              {deleteBookmarkListDetailsMutation.isPending
                ? "Đang xóa..."
                : "Xóa khỏi Bookmark"}
            </Button>
          ) : (
            <>
              {bookmarkListArray.length && (
                <Button
                  onClick={handleAddPostToBookmark}
                  disabled={
                    !selectedBookmark || addPostToBookmarkMutation.isPending
                  }
                >
                  {addPostToBookmarkMutation.isPending
                    ? "Đang thêm..."
                    : "Thêm vào Bookmark"}
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
