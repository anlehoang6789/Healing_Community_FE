"use client";
import { useState } from "react";
import { SortAsc, SortDesc, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Post {
  id: string;
  title: string;
  url: string;
  date: string;
  description: string;
}

interface BookmarkList {
  id: string;
  name: string;
  posts: Post[];
}

interface MainContentProps {
  selectedList: BookmarkList | null;
  onDeletePost: (listId: string, postId: string) => void;
}

export default function BookmarkContent({
  selectedList,
  onDeletePost,
}: MainContentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredPosts = selectedList
    ? selectedList.posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const sortedPosts = [...filteredPosts].sort((a, b) =>
    sortOrder === "asc"
      ? new Date(a.date).getTime() - new Date(b.date).getTime()
      : new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (!selectedList) {
    return <div className="p-6">Vui lòng chọn một danh sách bookmark</div>;
  }

  return (
    <div className="p-4 md:p-6 overflow-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-2xl md:text-3xl font-bold text-textChat">
          {selectedList.name}
        </h2>
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Input
            type="text"
            placeholder="Tìm kiếm bookmark..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64"
          />
          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? (
              <SortAsc className="h-4 w-4 text-textChat" />
            ) : (
              <SortDesc className="h-4 w-4 text-textChat" />
            )}
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedPosts.map((post) => (
          <div key={post.id} className="bg-card p-3 md:p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <a
                  href={post.url}
                  className="text-lg font-semibold text-textChat hover:underline"
                >
                  {post.title}
                </a>
                <p className="text-sm text-muted-foreground mt-1">
                  {post.description}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeletePost(selectedList.id, post.id)}
              >
                <Trash2 className="h-4 w-4 text-textChat" />
              </Button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-muted-foreground">{post.date}</span>
              <a
                href={post.url}
                className="text-sm text-textChat hover:underline"
              >
                Đọc thêm
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
