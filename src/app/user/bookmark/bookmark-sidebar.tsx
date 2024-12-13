"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BookmarkList {
  id: string;
  name: string;
  posts: Post[];
}

interface Post {
  id: string;
  title: string;
  url: string;
  date: string;
  description: string;
}

interface SidebarProps {
  bookmarkLists: BookmarkList[];
  selectedList: BookmarkList | null;
  onSelectList: (list: BookmarkList) => void;
  onCreateList: (name: string) => void;
  isVisible: boolean;
}

export default function BookmarkSidebar({
  bookmarkLists,
  selectedList,
  onSelectList,
  onCreateList,
  isVisible,
}: SidebarProps) {
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [newListName, setNewListName] = useState("");

  const handleCreateList = () => {
    if (newListName.trim()) {
      onCreateList(newListName.trim());
      setNewListName("");
      setIsCreatingList(false);
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
        <Button onClick={() => setIsCreatingList(true)} className="w-full mb-4">
          <Plus className="mr-2 h-4 w-4" /> Tạo danh sách mới
        </Button>
        {isCreatingList && (
          <div className="flex items-center space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Tên danh sách"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
            <Button onClick={handleCreateList}>Tạo</Button>
          </div>
        )}
      </div>
      <ScrollArea className="h-[calc(100vh-140px)]">
        {bookmarkLists.map((list) => (
          <div
            key={list.id}
            className={`p-4 cursor-pointer hover:bg-accent ${
              selectedList?.id === list.id ? "bg-accent" : ""
            }`}
            onClick={() => onSelectList(list)}
          >
            <h2 className="text-lg font-semibold text-textChat">{list.name}</h2>
            <p className="text-sm text-muted-foreground">
              {list.posts.length} bài viết
            </p>
          </div>
        ))}
      </ScrollArea>
    </aside>
  );
}
