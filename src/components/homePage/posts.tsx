"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Bookmark,
  Ellipsis,
  Flag,
  Globe,
  LockKeyhole,
  Share2,
  ThumbsUp,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  useAddUserReferenceMutation,
  useGetHomePageLazyLoadQuery,
  useGetReactionCountQuery,
} from "@/queries/usePost";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import { formatDateTime, handleErrorApi } from "@/lib/utils";
import { useRouter } from "next/navigation";
import ReactionEmoji from "@/components/homePage/reactionEmoji";
import { useAppContext } from "@/components/app-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import BookmarkDialogMobile from "@/app/user/bookmark/bookmark-dialog-mobile";

type UserProfileProps = {
  userId: string;
  postDate: string;
  isPostPublic: boolean;
  postId: string;
};

const UserProfile: React.FC<UserProfileProps> = ({
  userId,
  postDate,
  isPostPublic,
  postId,
}) => {
  const { isAuth } = useAppContext();
  const { theme } = useTheme();
  const [isBookmarkDialogOpen, setIsBookmarkDialogOpen] = useState(false);
  const { data, isLoading, isError } = useGetUserProfileQuery(userId);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error fetching user profile</div>;

  const user = data.payload.data;
  const openBookmarkDialog = () => {
    setIsBookmarkDialogOpen(true);
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <Avatar className="w-10 h-10 sm:w-10 sm:h-10 border-2 border-rose-300 mb-2">
        <AvatarImage
          src={
            user.profilePicture ||
            "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
          }
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
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500">{formatDateTime(postDate)}</p>
          <p className="text-gray-500">
            {isPostPublic ? (
              <Globe className="h-4 w-4" />
            ) : (
              <LockKeyhole className="h-4 w-4" />
            )}
          </p>
        </div>
      </div>
      {isAuth && (
        <div className="ml-auto">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild className="ml-auto">
              <Button variant="iconSend" size="icon">
                <Ellipsis className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className={`w-56 mt-4 z-50${
                theme === "dark" ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              <DropdownMenuItem
                onClick={(e) => {
                  openBookmarkDialog();
                  e.stopPropagation();
                }}
              >
                <Bookmark className="mr-2 h-4 w-4" />
                <span>Lưu bài viết</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Flag className="mr-2 h-4 w-4" />
                <span>Báo cáo bài viết</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <BookmarkDialogMobile
            postId={postId}
            isOpen={isBookmarkDialogOpen}
            setIsOpen={setIsBookmarkDialogOpen}
          />
        </div>
      )}
    </div>
  );
};

const ReactionCount: React.FC<{
  postId: string;
}> = ({ postId }) => {
  const { data, isLoading, isError } = useGetReactionCountQuery(postId);

  if (isLoading)
    return (
      <span className="text-sm text-gray-500 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </span>
    );
  if (isError || !data)
    return (
      <div className="text-textChat">
        Hiện tại chức năng đang bảo trì bạn chờ chút nhé
      </div>
    );

  const reactionCount = data.payload.data.total;

  return <span className="text-sm text-gray-500">{reactionCount} cảm xúc</span>;
};

export default function Posts() {
  const { isAuth } = useAppContext();
  const pageSizes = 5;
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  //Phần home page lazy load
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetHomePageLazyLoadQuery(pageSizes);
  const router = useRouter();

  //hành vi người dùng
  const { mutateAsync } = useAddUserReferenceMutation();

  // Hàm xử lý sự kiện cuộn
  // Thêm sự kiện cuộn vào window
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.scrollHeight * 0.8 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage()
          .catch((error) => {
            console.error("Error while fetching next page:", error);
          })
          .finally(() => setIsLoadingMore(false));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Ghép các trang dữ liệu
  const articles = data?.pages.flatMap((page) => page.payload.data) || [];
  // const uniqueArticles = Array.from(
  //   new Map(articles.map((article) => [article.postId, article])).values()
  // );

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
        const isPostPublic = article.status === 0;
        return (
          <div
            key={article.postId}
            className="p-4 rounded-lg shadow-lg border mb-6"
            onClick={(e) =>
              handlePostClick(article.postId, article.categoryId, e)
            }
          >
            <UserProfile
              userId={article.userId}
              postDate={article.createAt}
              isPostPublic={isPostPublic}
              postId={article.postId}
            />

            <div className="whitespace-pre-wrap mb-4 text-textChat flex flex-col">
              <h1 className="font-bold text-lg text-center mb-2">
                {article.title}
              </h1>
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
            {isAuth && (
              <div className="flex flex-col items-start gap-4">
                <div className="flex justify-between w-full">
                  <ReactionCount postId={article.postId} />
                  <span className="justify-end text-sm text-gray-500">
                    10 lượt chia sẻ
                  </span>
                </div>

                <div className="flex items-center justify-between w-full">
                  <ReactionEmoji postId={article.postId} />
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
            )}
          </div>
        );
      })}
      {isLoadingMore && (
        <div className="animate-pulse p-4 bg-gray-500 rounded-lg shadow-lg border mb-6">
          <div className="whitespace-pre-wrap mb-4 text-gray-500 flex flex-col">
            <h1 className="h-6 mb-2 bg-gray-300 rounded"></h1>
            <div className="h-20 bg-gray-300 rounded mb-4"></div>
            <div className="h-48 bg-gray-300 rounded"></div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <div className="flex justify-between w-full">
              <span className="h-4 w-24 bg-gray-300 rounded"></span>
              <span className="h-4 w-24 bg-gray-300 rounded"></span>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2 p-0 h-6 w-16 bg-gray-300 rounded"></div>
              <div className="flex items-center gap-2 p-0 h-6 w-16 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
