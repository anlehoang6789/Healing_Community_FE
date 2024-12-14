"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookmarkSidebar from "@/app/user/bookmark/bookmark-sidebar";
import BookmarkContent from "@/app/user/bookmark/bookmark-content";

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

const initialBookmarkLists: BookmarkList[] = [
  {
    id: "1",
    name: "Công nghệ",
    posts: [
      {
        id: "1",
        title: "Xu hướng AI năm 2023",
        url: "https://example.com/ai-trends",
        date: "2023-06-15",
        description: "Tổng hợp các xu hướng AI đang nổi bật trong năm 2023",
      },
      {
        id: "2",
        title: "So sánh React và Vue",
        url: "https://example.com/react-vs-vue",
        date: "2023-06-10",
        description:
          "Phân tích chi tiết ưu nhược điểm của React và Vue trong phát triển web",
      },
    ],
  },
  {
    id: "2",
    name: "Du lịch",
    posts: [
      {
        id: "3",
        title: "10 địa điểm đẹp ở Việt Nam",
        url: "https://example.com/vietnam-destinations",
        date: "2023-06-05",
        description: "Khám phá 10 địa điểm du lịch tuyệt vời nhất tại Việt Nam",
      },
      {
        id: "4",
        title: "Kinh nghiệm du lịch Nhật Bản",
        url: "https://example.com/japan-travel-tips",
        date: "2023-06-01",
        description: "Những lưu ý quan trọng khi du lịch Nhật Bản lần đầu",
      },
    ],
  },
  {
    id: "3",
    name: "Ẩm thực",
    posts: [
      {
        id: "5",
        title: "Cách làm phở ngon",
        url: "https://example.com/pho-recipe",
        date: "2023-05-28",
        description: "Công thức nấu phở chuẩn vị Hà Nội tại nhà",
      },
      {
        id: "6",
        title: "Top 5 nhà hàng ở Hà Nội",
        url: "https://example.com/hanoi-restaurants",
        date: "2023-05-25",
        description: "Giới thiệu 5 nhà hàng ngon nhất tại Hà Nội",
      },
    ],
  },
];

export default function BookmarkManager() {
  const [bookmarkLists, setBookmarkLists] =
    useState<BookmarkList[]>(initialBookmarkLists);
  const [selectedList, setSelectedList] = useState<BookmarkList | null>(
    bookmarkLists[0]
  );
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const createBookmarkList = (name: string) => {
    const newList: BookmarkList = {
      id: Date.now().toString(),
      name: name,
      posts: [],
    };
    setBookmarkLists([...bookmarkLists, newList]);
  };

  const deletePost = (listId: string, postId: string) => {
    setBookmarkLists(
      bookmarkLists.map((list) =>
        list.id === listId
          ? { ...list, posts: list.posts.filter((post) => post.id !== postId) }
          : list
      )
    );
  };

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
          bookmarkLists={bookmarkLists}
          selectedList={selectedList}
          onSelectList={(list) => {
            setSelectedList(list);
            setIsSidebarVisible(false);
          }}
          onCreateList={createBookmarkList}
          isVisible={isSidebarVisible}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <BookmarkContent
          selectedList={selectedList}
          onDeletePost={deletePost}
        />
      </div>

      {/* dialog để thêm bài viết vào bookmark */}
      {/* <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-4 right-4">
            <Bookmark className="mr-2 h-4 w-4" /> Lưu bài viết
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lưu vào danh sách Bookmark</DialogTitle>
          </DialogHeader>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Chọn danh sách</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {bookmarkLists.map((list) => (
                <DropdownMenuItem
                  key={list.id}
                  onSelect={() => addPostToList(list.id, currentPost)}
                >
                  {list.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
