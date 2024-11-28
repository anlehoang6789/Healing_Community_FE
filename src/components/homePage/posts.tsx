"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Bookmark, Flag, Share2, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  useAddUserReferenceMutation,
  useGetHomePageLazyLoadQuery,
} from "@/queries/usePost";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import { formatDateTime, handleErrorApi } from "@/lib/utils";
// import Link from "next/link";
// import { useQuickPostStore } from "@/store/postStore";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

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
      <div className="ml-auto">
        <Button
          className=" rounded-full"
          variant={"ghost"}
          size={"icon"}
          onClick={(e) => e.stopPropagation()}
        >
          <Bookmark className="w-5 h-5 text-textChat" />
        </Button>
        <Button
          className=" rounded-full"
          variant={"ghost"}
          size={"icon"}
          onClick={(e) => e.stopPropagation()}
        >
          <Flag className="w-5 h-5 text-textChat" />
        </Button>
      </div>
    </div>
  );
};

export default function Posts() {
  const pageSizes = 5;
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetHomePageLazyLoadQuery(pageSizes);
  const router = useRouter();
  const { mutateAsync } = useAddUserReferenceMutation();
  // const { setPostData } = useQuickPostStore();
  // const handleClickedPost = (postId: string, userId: string) => {
  //   setPostData(postId, userId);
  // };

  // Hàm xử lý sự kiện cuộn
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 100 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      setIsLoadingMore(true);
      fetchNextPage()
        .then(() => setIsLoadingMore(false))
        .catch(() => setIsLoadingMore(false));
    }
  };

  // Thêm sự kiện cuộn vào window
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasNextPage, isFetchingNextPage]);

  // Ghép các trang dữ liệu
  const articles = data?.pages.flatMap((page) => page.payload.data) || [];

  const handlePostClick = async (
    postId: string,
    categoryId: string,
    e: React.MouseEvent
  ) => {
    const target = e.target as HTMLElement;
    // Nếu click vào nút, ngừng sự kiện
    if (target.closest("button")) {
      e.stopPropagation();
    } else {
      try {
        await mutateAsync({ categoryId });
        // Nếu không phải nút, chuyển hướng tới bài viết
        router.push(`/content/${postId}`);
      } catch (error: any) {
        handleErrorApi(error);
      }
    }
  };

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
            onClick={(e) =>
              handlePostClick(article.postId, article.categoryId, e)
            }
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
            <div className="flex flex-col items-start gap-4">
              <div className="flex justify-between w-full">
                <span className="text-sm text-gray-500">10 lượt thích</span>
                <span className="justify-end text-sm text-gray-500">
                  10 lượt chia sẻ
                </span>
              </div>

              <div className="flex items-center justify-between w-full">
                <Button
                  variant="iconDarkMod"
                  className="flex items-center gap-2 p-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ThumbsUp className="w-4 h-4" />
                  Thích
                </Button>
                <Button
                  variant="iconDarkMod"
                  className="flex items-center gap-2 p-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Share2 className="w-4 h-4" />
                  Chia sẻ
                </Button>
              </div>
            </div>
          </div>
        );
      })}
      {(isFetchingNextPage || isLoadingMore) && (
        <div className="p-4 rounded-lg shadow-lg border mb-6">
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-48 w-full rounded-md" />
        </div>
      )}
    </div>
  );
}
