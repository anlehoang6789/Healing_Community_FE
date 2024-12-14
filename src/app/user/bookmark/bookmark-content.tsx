"use client";
import { useState } from "react";
import { SortAsc, SortDesc, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GetBookmarkListSchemaType } from "@/schemaValidations/post.schema";
import { useGetBookmarkListDetailsQuery } from "@/queries/usePost";
import Link from "next/link";
import { formatDateTime } from "@/lib/utils";

interface MainContentProps {
  selectedBookmark: GetBookmarkListSchemaType | null;
}

export default function BookmarkContent({
  selectedBookmark,
}: // onDeletePost,
MainContentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const { data, isLoading, isError } = useGetBookmarkListDetailsQuery({
    bookmarkId: selectedBookmark?.bookmarkId!,
    enabled: !!selectedBookmark?.bookmarkId,
  });
  const posts = data?.payload?.data || [];

  const filteredPosts = posts
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const sortedPosts = [...filteredPosts].sort((a, b) =>
    sortOrder === "asc"
      ? new Date(a.createAt).getTime() - new Date(b.createAt).getTime()
      : new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
  );

  if (!selectedBookmark) {
    return <div className="p-6">Vui lòng chọn một danh sách bookmark</div>;
  }

  return (
    <div className="p-4 md:p-6 overflow-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-2xl md:text-3xl font-bold text-textChat">
          {selectedBookmark.name}
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
          <div
            key={post.postId}
            className="bg-card p-3 md:p-4 rounded-lg shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <Link
                  href={`/content/${post.postId}`}
                  className="text-lg font-semibold text-textChat hover:underline"
                >
                  {post.title}
                </Link>
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.description,
                  }}
                  className="text-sm text-textChat mt-1"
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 3, // Số dòng muốn hiển thị
                    maxHeight: "4.5em", // Giới hạn chiều cao (phụ thuộc vào line-height)
                  }}
                />
              </div>
              <Button
                variant="headerIcon"
                size="icon"
                className="!hover:bg-none border-none"
              >
                <Trash2 className="h-4 w-4 text-textChat hover:text-red-500" />
              </Button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-muted-foreground">
                {formatDateTime(post.createAt)}
              </span>
              <Link
                href={`/content/${post.postId}`}
                className="text-sm text-textChat hover:underline"
              >
                Đọc thêm
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
