"use client";

import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookmarkSidebar from "@/app/user/bookmark/bookmark-sidebar";
import BookmarkContent from "@/app/user/bookmark/bookmark-content";
import { useGetBookmarkListQuery } from "@/queries/usePost";
import { GetBookmarkListSchemaType } from "@/schemaValidations/post.schema";

export default function BookmarkManager() {
  const { data, isLoading, isError } = useGetBookmarkListQuery();
  const [selectedList, setSelectedList] =
    useState<GetBookmarkListSchemaType | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [bookmarkTotals, setBookmarkTotals] = useState<Record<string, number>>(
    {}
  );

  const bookmarkList = useMemo(
    () => data?.payload.data || [],
    [data?.payload.data]
  );

  useEffect(() => {
    if (bookmarkList.length > 0 && !selectedList) {
      setSelectedList(bookmarkList[0]);
    }
  }, [bookmarkList, selectedList]);

  const handleUpdateTotal = (bookmarkId: string, total: number) => {
    setBookmarkTotals((prev) => {
      // Nếu total không thay đổi, không cần cập nhật state
      if (prev[bookmarkId] === total) return prev;

      return { ...prev, [bookmarkId]: total };
    });
  };

  if (isLoading) {
    return (
      <aside className="w-full h-full border-r animate-pulse">
        <div className="p-4">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="w-full h-10 bg-gray-200 rounded mb-4"></div>
        </div>
        <div className="h-[calc(100vh-140px)]">
          <div className="p-4 cursor-pointer">
            <div className="h-5 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded mt-2"></div>
          </div>
        </div>
      </aside>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-textChat text-center">
        Chức năng đang bảo trì, vui lòng thử lại sau
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-background">
      <Button
        className="lg:hidden  top-30 right-4 z-10"
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
      >
        {isSidebarVisible ? (
          <X className="h-4 w-4" />
        ) : (
          <Menu className="h-4 w-4" />
        )}
      </Button>
      {/* Sidebar */}
      <div className="w-full lg:w-[30%] lg:max-w-xs">
        <BookmarkSidebar
          bookmarkLists={bookmarkList}
          selectedList={selectedList}
          onSelectList={(list) => {
            setSelectedList(list);
            setIsSidebarVisible(false);
          }}
          isVisible={isSidebarVisible}
          bookmarkTotals={bookmarkTotals}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <BookmarkContent
          selectedBookmark={selectedList || null}
          onUpdateTotal={handleUpdateTotal}
        />
      </div>
    </div>
  );
}
