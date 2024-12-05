"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Bookmark, Flag, Share2, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  useAddReactionMutation,
  useAddUserReferenceMutation,
  useGetHomePageLazyLoadQuery,
  useGetReactionCountQuery,
} from "@/queries/usePost";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import { formatDateTime, handleErrorApi } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { GetHomePageSchemaLazyLoadType } from "@/schemaValidations/post.schema";
import ReactionEmoji from "@/components/homePage/reactionEmoji";
import { useReactionStore } from "@/store/reactionStore";

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

const ReactionCount: React.FC<{ postId: string }> = ({ postId }) => {
  const { data, isLoading, isError } = useGetReactionCountQuery(postId);

  if (isLoading)
    return (
      <span className="text-sm text-gray-500 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </span>
    );
  if (isError || !data)
    return <div>Hiện tại chức năng đang bảo trì bạn chờ chút nhé</div>;

  const reactionCount = data.payload.data.total;

  return <span className="text-sm text-gray-500">{reactionCount} cảm xúc</span>;
};

export default function Posts({
  initialArticles,
}: {
  initialArticles: GetHomePageSchemaLazyLoadType[];
}) {
  const pageSizes = 5;
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [articles, setArticles] = useState(
    initialArticles?.slice(0, pageSizes) || []
  );

  //Phần xử lí add reaction
  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null);
  const { selectedReactions, setReaction } = useReactionStore();
  const addReactionMutation = useAddReactionMutation();
  const handleEmojiSelect = (
    reactionTypeId: string,
    emoji: string,
    postId: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    addReactionMutation.mutate({ postId, reactionTypeId });
    setReaction(postId, emoji);
    setHoveredPostId(null); // Ẩn menu emoji sau khi chọn
  };

  const { fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetHomePageLazyLoadQuery(pageSizes);
  const router = useRouter();

  const { mutateAsync } = useAddUserReferenceMutation();

  // Hàm xử lý sự kiện cuộn
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.scrollHeight * 0.8 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      setIsLoadingMore(true);
      fetchNextPage()
        .then((fetchResult) => {
          const newArticles =
            fetchResult.data?.pages.flatMap((page) => page.payload.data) || [];
          // console.log("dữ liệu ban đầu của bài viết", newArticles);
          setArticles((prevArticles) => {
            const existingPostIds = new Set(
              prevArticles.map((article) => article.postId)
            );
            const uniqueArticles = newArticles.filter(
              (article) => !existingPostIds.has(article.postId)
            );
            // console.log("du lieu sau khi load", [
            //   ...prevArticles,
            //   ...uniqueArticles,
            // ]);

            return [...prevArticles, ...uniqueArticles];
          });
        })
        .catch((error) => {
          console.error("Error while fetching next page:", error);
        })
        .finally(() => setIsLoadingMore(false));
    }
  };

  // Thêm sự kiện cuộn vào window
  useEffect(() => {
    if (!initialArticles) return;
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasNextPage, isFetchingNextPage]);

  // Ghép các trang dữ liệu
  // const articles = data?.pages.flatMap((page) => page.payload.data) || [];

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
            <div className="flex flex-col items-start gap-4">
              <div className="flex justify-between w-full">
                <ReactionCount postId={article.postId} />
                <span className="justify-end text-sm text-gray-500">
                  10 lượt chia sẻ
                </span>
              </div>

              <div className="flex items-center justify-between w-full">
                <div className="relative">
                  <div
                    className="inline-block"
                    onMouseEnter={() => setHoveredPostId(article.postId)}
                    onMouseLeave={() => setHoveredPostId(null)}
                  >
                    <Button
                      variant="iconDarkMod"
                      className="flex items-center gap-2 p-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {selectedReactions[article.postId] ? (
                        <span className="text-xl">
                          {selectedReactions[article.postId]}
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <ThumbsUp className="w-4 h-4" />
                          Thích
                        </div>
                      )}
                    </Button>

                    {/* Hiển thị ReactionEmoji khi hover */}
                    {hoveredPostId === article.postId && (
                      <ReactionEmoji
                        onSelect={(reactionId, emoji, e) =>
                          handleEmojiSelect(
                            reactionId,
                            emoji,
                            article.postId,
                            e
                          )
                        }
                      />
                    )}
                  </div>
                </div>
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
