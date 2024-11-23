"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bookmark,
  Flag,
  Heart,
  ImageIcon,
  MessageCircle,
  MoreHorizontal,
  SendHorizontal,
  Share2,
  Smile,
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
  useGetCommentsByPostIdQuery,
  useGetPostByPostIdQuery,
} from "@/queries/usePost";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import { formatDateTime } from "@/lib/utils";
import CommentSection from "@/components/commentSection/commentSection";
import { CommentType, ReplyCommentType } from "@/schemaValidations/post.schema";

export default function DetailPost() {
  const { theme } = useTheme();
  const [commentImage, setCommentImage] = useState<string | null>(null);

  // data của post theo postId
  const postId = "01JAPSEY7FD3H7QFP2CSHHBDRW";
  const { data: postById } = useGetPostByPostIdQuery(postId);
  //data của user theo userId lấy từ api postById
  const { data: userById } = useGetUserProfileQuery(
    postById?.payload.data.userId as string
  );
  const { data: commentsData } = useGetCommentsByPostIdQuery(postId);

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
    const newComment: CommentType = {
      commentId: `temp-${Date.now()}`, // ID tạm thời
      postId: postId,
      parentId: null,
      userId: "current-user-id", // ID user hiện tại
      content: comment.content,
      createdAt: new Date().toISOString(),
      updatedAt: null,
      replies: [], // Khởi tạo replies là mảng rỗng
      coverImgUrl: comment.coverImgUrl || null,
    };

    // Cập nhật state comments
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleAddReply = (
    parentId: string,
    reply: {
      content: string;
      coverImgUrl?: string | null;
    }
  ) => {
    const newReply: ReplyCommentType = {
      commentId: `temp-reply-${Date.now()}`, // ID tạm thời
      postId: postId,
      parentId: parentId,
      userId: "current-user-id", // ID user hiện tại
      content: reply.content,
      coverImgUrl: reply.coverImgUrl || null,
      createdAt: new Date().toISOString(),
      updatedAt: null,
      replies: [], // Khởi tạo replies là mảng rỗng
    };

    // Cập nhật comments với reply mới
    const updatedComments = comments.map((comment) => {
      if (comment.commentId === parentId) {
        return {
          ...comment,
          replies: comment.replies
            ? [...comment.replies, newReply]
            : [newReply], // Nếu replies null thì khởi tạo thành mảng mới
        };
      }
      return comment;
    });

    setComments(updatedComments);
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
            src={
              "https://firebasestorage.googleapis.com/v0/b/healing-community-4d0b5.appspot.com/o/upload%2FCandlelight%2C%20there%20is%20an%20orange%20glowing%20butterfly%2C%20in%20front%20of%20him%20was%20a%20colorful%20garden%20full%20of%20flowers%20and%20butterflies%2C%20in%20the%20style%20of%20contemporary%20illustration.png?alt=media&token=7e822c04-0824-408c-a708-9e5561e95d82"
            }
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
                alt={userById?.payload.data.userName}
              />
              <AvatarFallback>{userById?.payload.data.userName}</AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <Link href="#">
              <p className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500">
                {userById?.payload.data.userName}
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
          {commentImage && (
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
          )}
        </div>
      </div>
    </div>
  );
}
