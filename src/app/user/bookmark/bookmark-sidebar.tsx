"use client";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GetBookmarkListSchemaType } from "@/schemaValidations/post.schema";

interface SidebarProps {
  bookmarkLists: GetBookmarkListSchemaType[];
  selectedList: GetBookmarkListSchemaType | null;
  onSelectList: (list: GetBookmarkListSchemaType) => void;
  isVisible: boolean;
}

export default function BookmarkSidebar({
  bookmarkLists,
  selectedList,
  onSelectList,
  isVisible,
}: SidebarProps) {
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
        <Button className="w-full mb-4">
          <Plus className="mr-2 h-4 w-4" /> Tạo danh sách mới
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-140px)]">
        {bookmarkLists.length > 0 ? (
          bookmarkLists.map((list) => (
            <div
              key={list.bookmarkId}
              className={`p-4 cursor-pointer hover:bg-accent ${
                selectedList?.bookmarkId === list.bookmarkId ? "bg-accent" : ""
              }`}
              onClick={() => onSelectList(list)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-textChat">
                    {list.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {/* {list.posts.length} bài viết */}2 bài lưu
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Trash2 className="h-4 w-4 text-textChat hover:text-red-500" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-textChat text-center p-4">
            Hãy tạo 1 bookmark mới cho bộ sưu tập của mình.
          </p>
        )}
      </ScrollArea>
    </aside>
  );
}
