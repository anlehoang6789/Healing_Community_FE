"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { X } from "lucide-react";
import React, { useEffect } from "react";
import { useGetHomePageLazyLoadQuery } from "@/queries/usePost";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import { useQuickPostStore } from "@/store/postStore";

type UserProfileProps = {
  userId: string;
  postDate: string;
};

const UserProfile: React.FC<UserProfileProps> = ({ userId, postDate }) => {
  const { data, isLoading, isError } = useGetUserProfileQuery(userId);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error fetching user profile</div>;

  const user = data.payload.data;

  return (
    <div className="flex items-center gap-4 mb-6">
      <Avatar className="w-10 h-10 sm:w-10 sm:h-10 border-2 border-rose-300 mb-2">
        <AvatarImage
          src={user.profilePicture || ""}
          alt={user.fullName || "Anonymous"}
        />
        <AvatarFallback>
          {user.fullName || user.userName || "Anonymous"}
        </AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500">
          {user.fullName || user.userName || "Anonymous"}
        </h2>
        {/* Ngày tạo acc người dùng */}
        <p className="text-sm text-gray-500">{formatDateTime(postDate)}</p>
      </div>
      <Button className="ml-auto rounded-full" variant={"ghost"} size={"icon"}>
        <X className="w-4 h-4 text-textChat" />
      </Button>
    </div>
  );
};

export default function Posts() {
  const pageSizes = 5;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetHomePageLazyLoadQuery(pageSizes);
  const { setPostData } = useQuickPostStore();
  const handleClickedPost = (postId: string, userId: string) => {
    setPostData(postId, userId);
  };

  // Hàm xử lý sự kiện cuộn
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 100 &&
      hasNextPage
    ) {
      fetchNextPage();
    }
  };

  // Thêm sự kiện cuộn vào window
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasNextPage]);

  // Ghép các trang dữ liệu
  const articles = data?.pages.flatMap((page) => page.payload.data) || [];

  return (
    <div>
      {articles.map((article) => {
        const truncatedDescription =
          article.description.length > 300
            ? article.description.slice(0, 300) + "..."
            : article.description;
        return (
          <div
            key={article.postId}
            className="p-4 rounded-lg shadow-lg border mb-6"
          >
            <UserProfile userId={article.userId} postDate={article.createAt} />

            <div className="whitespace-pre-wrap mb-4 text-textChat flex flex-col">
              <div className="font-bold text-lg text-center mb-2">
                {article.title}
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: truncatedDescription,
                }}
              />
              <div className="flex justify-end mt-2">
                <Link
                  href={`/content/${article.postId}`}
                  className="text-blue-500 hover:underline"
                  onClick={() =>
                    handleClickedPost(article.postId, article.userId)
                  }
                >
                  Xem thêm
                </Link>
              </div>

              <Image
                src={
                  article.coverImgUrl ||
                  "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                }
                alt="Banner"
                width={1000}
                height={500}
                className="w-full h-auto md:h-[450px] object-cover mt-4 rounded-md"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
