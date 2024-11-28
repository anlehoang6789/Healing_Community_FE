"use client";

import { useEffect, useState } from "react";
import {
  Bookmark,
  Flag,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import {
  useCreateCommentMutation,
  useGetCommentsByPostIdQuery,
  useGetPostByPostIdQuery,
} from "@/queries/usePost";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import { formatDateTime, getUserIdFromLocalStorage } from "@/lib/utils";
import CommentSection from "@/components/commentSection/commentSection";
import { CommentType } from "@/schemaValidations/post.schema";
import postApiRequest from "@/apiRequests/post";
import { useParams } from "next/navigation";

export default function DetailPost() {
  const { theme } = useTheme();

  // data của post theo postId
  // const postId = "01JDHS5Z5ECX2AWNKGQ2NHG2Z8";
  const userIdComment = getUserIdFromLocalStorage() ?? "";
  const param = useParams();
  const postIdFromUrl = param?.postId;
  // console.log("postIdFromUrl", postIdFromUrl);

  const { data: postById } = useGetPostByPostIdQuery(postIdFromUrl as string);
  //data của user theo userId lấy từ api postById
  const { data: userById } = useGetUserProfileQuery(
    postById?.payload.data.userId as string
  );
  const { data: commentsData } = useGetCommentsByPostIdQuery(
    postIdFromUrl as string
  );

  const { mutate: createComment } = useCreateCommentMutation();

  // Sử dụng kiểu CommentType từ schema
  const [comments, setComments] = useState<CommentType[]>([]);

  // Cập nhật comments khi data thay đổi
  useEffect(() => {
    if (commentsData?.payload?.data) {
      setComments(commentsData.payload.data);
    }
  }, [commentsData]);

  const handleAddComment = (comment: {
    content: string;
    coverImgUrl?: string | null;
  }) => {
    console.log("Comment Image URL in DetailPost:", comment.coverImgUrl);
    console.log("Comment content in DetailPost:", comment.content);
    console.log("Comment data being sent to API:", comment);

    // Gọi API để tạo bình luận
    createComment(
      {
        postId: postIdFromUrl as string,
        parentId: null,
        content: comment.content,
        coverImgUrl: comment.coverImgUrl,
      },
      {
        onSuccess: (data) => {
          const newCommentId = data.payload.data;

          // Tạo comment mới với commentId từ API
          const newComment: CommentType = {
            commentId: newCommentId, // Sử dụng commentId từ API
            postId: postIdFromUrl as string,
            parentId: null,
            userId: userIdComment as string,
            content: comment.content,
            createdAt: new Date().toISOString(),
            updatedAt: null,
            replies: [],
            coverImgUrl: comment.coverImgUrl,
          };

          // Cập nhật state comments với bình luận mới từ API
          setComments((prevComments) => [...prevComments, newComment]);
        },
        onError: (error) => {
          console.error("Error creating comment:", error);
        },
      }
    );
  };

  const handleAddReply = (
    parentId: string,
    reply: { content: string; coverImgUrl?: string | null }
  ) => {
    createComment(
      {
        postId: postIdFromUrl as string,
        parentId: parentId,
        content: reply.content,
        coverImgUrl: reply.coverImgUrl,
      },
      {
        onSuccess: async (data) => {
          try {
            // Fetch lại toàn bộ comments của post này
            const commentsResponse = await postApiRequest.getCommentsByPostId(
              postIdFromUrl as string
            );

            // Cập nhật lại toàn bộ comments
            setComments(commentsResponse.payload.data);
          } catch (error) {
            console.error("Error refetching comments:", error);
          }
        },
        onError: (error) => {
          console.error("Error creating reply:", error);
        },
      }
    );
  };

  return (
    <div className="w-full relative">
      {/* Vertical icon bar */}
      <div className="absolute h-64 left-0 top-10 bottom-0 p-1 flex-col items-center justify-center lg:flex hidden">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Heart className="h-8 w-8 text-red-500" />
        </Button>
        <span className="text-xs font-semibold text-muted-foreground">
          {20}
        </span>
        <Button variant="ghost" size="icon" className="rounded-full mt-5">
          <MessageCircle className="h-8 w-8 text-blue-500" />
        </Button>
        <span className="text-xs font-semibold text-muted-foreground">
          {10}
        </span>
        <Button variant="ghost" size="icon" className="rounded-full mt-5">
          <Share2 className="h-8 w-8 text-green-500" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full mt-7">
          <Bookmark className="h-8 w-8 text-purple-500" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full mt-7">
          <Flag className="h-8 w-8 text-red-500" />
        </Button>
      </div>

      {/* Main content */}
      <div className="lg:ml-16 w-auto mx-auto border shadow-md rounded-md overflow-hidden">
        {postById?.payload.data && (
          <Image
            src={postById?.payload.data.coverImgUrl}
            alt="Banner"
            width={1000}
            height={500}
            className="w-full h-[450px] object-cover"
          />
        )}

        <div className="flex items-center gap-2 px-4 py-8">
          <Link href="#">
            <Avatar className="w-12 h-12 border-2 border-rose-300">
              <AvatarImage
                src={userById?.payload.data.profilePicture}
                alt={
                  userById?.payload.data.fullName ||
                  userById?.payload.data.userName
                }
              />
              <AvatarFallback>
                {userById?.payload.data.fullName ||
                  userById?.payload.data.userName}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <Link href="#">
              <p className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500">
                {userById?.payload.data.fullName ||
                  userById?.payload.data.userName}
              </p>
            </Link>
            <p className="text-sm text-gray-500">
              {formatDateTime(postById?.payload.data.createAt as string)}
            </p>
          </div>

          {/* Mobile action buttons */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="ml-auto lg:hidden">
              <Button variant="iconSend" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className={`w-56 mt-4 ${
                theme === "dark" ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              <DropdownMenuItem>
                <Bookmark className="mr-2 h-4 w-4" />
                <span>Lưu bài viết</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Flag className="mr-2 h-4 w-4" />
                <span>Báo cáo bài viết</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <h1 className="flex justify-center text-3xl px-4 font-bold text-textChat">
          {postById?.payload.data.title}
        </h1>
        <div className="px-4 py-5 space-y-4 text-textChat">
          <div
            dangerouslySetInnerHTML={{
              __html: postById?.payload.data.description as string,
            }}
          />

          <div className="flex gap-10 justify-center text-muted-foreground">
            <span>#Chữa lành</span>
            <span>#Chữa lành</span>
            <span>#Chữa lành</span>
            <span>#Chữa lành</span>
          </div>
        </div>
        <div className="flex bg-gray-500 w-auto h-0.5 mx-8 mb-8"></div>

        {/* Mobile action buttons */}
        <div className="flex items-center justify-between py-2 mb-4 border-t border-b lg:hidden">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-muted-foreground"
          >
            <Heart className="h-5 w-5 text-red-500" />
            Thích
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-muted-foreground"
          >
            <MessageCircle className="h-5 w-5 text-blue-500" />
            Bình luận
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-muted-foreground"
          >
            <Share2 className="h-5 w-5 text-green-500" />
            Chia sẻ
          </Button>
        </div>

        {/* Comment section */}
        <div className="px-4 pb-3 space-y-4">
          <h2 className="text-2xl font-bold text-muted-foreground">
            Bình luận
          </h2>
          <div className="w-full flex  relative gap-4">
            <Link href="#">
              <Avatar className="w-9 h-9 border-2 border-rose-300">
                <AvatarImage
                  src={userById?.payload.data.profilePicture}
                  alt={userById?.payload.data.userName}
                />
                <AvatarFallback>
                  {userById?.payload.data.userName}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="w-full">
              <CommentSection
                comments={comments}
                onAddComment={handleAddComment}
                onAddReply={handleAddReply}
              />
            </div>
          </div>

          {/* image comment preview */}
          {/* {commentImage && (
            <div className="relative w-24 h-24 mb-4">
              <Image
                src={commentImage}
                alt="Uploaded image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={() => setCommentImage(null)}
                className="absolute top-1 right-1 h-6 w-6 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
