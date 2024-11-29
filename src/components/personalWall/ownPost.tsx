"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Ellipsis,
  FilePenLine,
  MessageSquare,
  Share2,
  ShieldMinus,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import {
  useCreateCommentMutation,
  useDeletePostByPostIdMutation,
  useGetCommentsByPostIdQuery,
  useGetPostByUserIdQuery,
} from "@/queries/usePost";
import {
  formatDateTime,
  getUserIdFromLocalStorage,
  handleErrorApi,
} from "@/lib/utils";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { usePostStore } from "@/store/postStore";
import CommentSection from "@/components/commentSection/commentSection";
import {
  CommentType,
  GetCommentsByPostIdResponseType,
  PostByIdSchemaType,
  ReplyCommentType,
} from "@/schemaValidations/post.schema";
import postApiRequest from "@/apiRequests/post";

export default function OwnPost() {
  const { userId } = useParams(); //lấy userId từ url
  const { theme } = useTheme();

  const { data } = useGetPostByUserIdQuery(userId as string);
  const postList = data?.payload.data || [];
  const userIdByPost = postList.map((post) => post.userId);
  //lấy 1 userId từ mảng userIdByPost
  // const userIdPostItem = userIdByPost[0];
  const { data: userById } = useGetUserProfileQuery(userId as string);
  const selectedPostId = usePostStore((state) => state.selectedPostId);
  const setSelectedPostId = usePostStore((state) => state.setSelectedPostId);
  const [selectedPostTitle, setSelectedPostTitle] = useState<string | null>(
    null
  );
  const { mutateAsync } = useDeletePostByPostIdMutation(userId as string);
  const handleOpenDeleteDialog = (postId: string, postTitle: string) => {
    setSelectedPostId(postId);
    setSelectedPostTitle(postTitle);
  };

  const userIdComment = getUserIdFromLocalStorage() ?? "";
  const [commentsByPostId, setCommentsByPostId] = useState<{
    [key: string]: CommentType[];
  }>({});
  const { mutate: createComment } = useCreateCommentMutation();
  const [visibleCommentPosts, setVisibleCommentPosts] = useState<{
    [postId: string]: boolean;
  }>({});

  //hàm ẩn/hiện bình luận
  const toggleCommentVisibility = (postId: string) => {
    setVisibleCommentPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // Cập nhật comments khi data thay đổi
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsPromises = postList.map((post) =>
          postApiRequest.getCommentsByPostId(post.postId)
        );

        const commentsResults = await Promise.all(commentsPromises);

        const updatedCommentsByPostId: { [key: string]: CommentType[] } = {};

        postList.forEach((post, index) => {
          updatedCommentsByPostId[post.postId] =
            commentsResults[index].payload.data;
        });

        setCommentsByPostId(updatedCommentsByPostId);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (postList.length > 0) {
      fetchComments();
    }
  }, [postList]);

  const handleAddComment = (
    postId: string,
    comment: { content: string; coverImgUrl?: string | null }
  ) => {
    createComment(
      {
        postId: postId,
        parentId: null,
        content: comment.content,
        coverImgUrl: comment.coverImgUrl,
      },
      {
        onSuccess: (data) => {
          const newCommentId = data.payload.data;

          const newComment: CommentType = {
            commentId: newCommentId,
            postId: postId,
            parentId: null,
            userId: userIdComment,
            content: comment.content,
            createdAt: new Date().toISOString(),
            updatedAt: null,
            replies: [],
            coverImgUrl: comment.coverImgUrl,
          };

          // Cập nhật bình luận cho postId tương ứng
          setCommentsByPostId((prev) => ({
            ...prev,
            [postId]: [...(prev[postId] || []), newComment], // Thêm bình luận mới vào mảng bình luận của bài viết
          }));
        },
        onError: (error) => {
          console.error("Error creating comment:", error);
        },
      }
    );
  };

  const handleAddReply = (
    postId: string,
    parentId: string,
    reply: { content: string; coverImgUrl?: string | null }
  ) => {
    createComment(
      {
        postId: postId,
        parentId: parentId,
        content: reply.content,
        coverImgUrl: reply.coverImgUrl,
      },
      {
        onSuccess: async (data) => {
          try {
            // Fetch lại toàn bộ comments của post này
            const commentsResponse = await postApiRequest.getCommentsByPostId(
              postId
            );

            // Cập nhật lại toàn bộ comments cho post
            setCommentsByPostId((prev) => ({
              ...prev,
              [postId]: commentsResponse.payload.data,
            }));
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

  const handleConfirmDeletePost = async () => {
    if (selectedPostId) {
      try {
        const result = await mutateAsync(selectedPostId);
        setSelectedPostId(null);
        setSelectedPostTitle(null);
        toast({
          description: result.payload.message,
          variant: "success",
        });
        window.location.reload();
      } catch (error: any) {
        handleErrorApi(error);
      }
    }
  };

  // Trạng thái lưu thông tin mở rộng của từng bài viết
  const [expandedPosts, setExpandedPosts] = useState<{
    [key: string]: boolean;
  }>({});

  // Hàm kiểm tra xem một bài viết có cần bị rút gọn không
  const shouldTruncateDescription = (description: string): boolean => {
    const MAX_LENGTH = 300; // Chiều dài tối đa trước khi rút gọn
    return description.length > MAX_LENGTH;
  };

  // Hàm chuyển đổi trạng thái mở rộng cho từng bài viết
  const toggleExpand = (postId: string, shouldExpand: boolean) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: shouldExpand,
    }));
  };

  return (
    <div className="mb-2">
      {postList.length === 0 ? (
        <div className="text-textChat text-center p-4 rounded-lg shadow-lg border mb-6">
          Hiện chưa có bài viết nào
        </div>
      ) : (
        postList.map((post) => {
          const isExpanded = expandedPosts[post.postId] || false;
          const truncate = shouldTruncateDescription(post.description);
          return (
            <div
              key={post.postId}
              className="p-4 rounded-lg shadow-lg border mb-6"
            >
              <div className="flex items-center gap-4 mb-6">
                {/* Avatar, name*/}
                <Avatar className="w-10 h-10 sm:w-10 sm:h-10 border-2 border-rose-300 mb-2">
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
                <div>
                  <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500">
                    {userById?.payload.data.fullName ||
                      userById?.payload.data.userName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {formatDateTime(post.createAt)}
                  </p>
                </div>

                {/* Dropdown menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="ml-auto">
                    <Button variant="iconSend">
                      <Ellipsis />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className={`w-56 mt-4 ${
                      theme === "dark"
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <DropdownMenuItem>
                      <FilePenLine className="mr-2 h-4 w-4" />
                      <span>Sửa bài viết</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        handleOpenDeleteDialog(post.postId, post.title)
                      }
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Xóa bài viết</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ShieldMinus className="mr-2 h-4 w-4" />
                      <span>Chỉnh sửa quyền riêng tư</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Body of story */}

              {/* <div className="whitespace-pre-wrap mb-4 text-textChat">
                <div className="font-bold text-lg text-center mb-2">
                  {post.title}
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: isExpanded
                      ? post.description
                      : post.description.slice(0, 300) +
                        (truncate ? "..." : ""),
                  }}
                />
              </div> */}
              <motion.div
                animate={{ height: isExpanded ? "auto" : 300 }} // auto cho phép nội dung mở rộng tự nhiên
                initial={{ height: 300 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="whitespace-pre-wrap mb-4 text-textChat">
                  <div className="font-bold text-lg text-center mb-2">
                    {post.title}
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: post.description,
                    }}
                  />
                </div>
              </motion.div>

              {truncate && (
                <div className="flex justify-end">
                  <button
                    onClick={() => toggleExpand(post.postId, !isExpanded)}
                    className="text-blue-500 hover:underline focus:outline-none mt-2 mb-3"
                  >
                    {isExpanded ? "Thu gọn" : "Xem thêm"}
                  </button>
                </div>
              )}

              {/* Like, share, comment tabs*/}
              <div className="flex flex-col items-start gap-4">
                <div className="flex justify-between w-full">
                  <span className="text-sm text-gray-500">10 lượt thích</span>
                  <span className="justify-end text-sm text-gray-500">
                    10 bình luận
                  </span>
                </div>

                <div className="flex items-center justify-between w-full">
                  <Button
                    variant="iconDarkMod"
                    className="flex items-center gap-2 p-0"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    Thích
                  </Button>
                  <Button
                    variant="iconDarkMod"
                    className="flex items-center gap-2 p-0"
                    onClick={() => toggleCommentVisibility(post.postId)}
                  >
                    <MessageSquare className="w-4 h-4" />
                    Bình luận
                  </Button>
                  <Button
                    variant="iconDarkMod"
                    className="flex items-center gap-2 p-0"
                  >
                    <Share2 className="w-4 h-4" />
                    Chia sẻ
                  </Button>
                </div>
              </div>

              <AnimatePresence>
                {visibleCommentPosts[post.postId] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full mt-4 overflow-hidden"
                  >
                    <CommentSection
                      comments={commentsByPostId[post.postId] || []}
                      onAddComment={(comment) =>
                        handleAddComment(post.postId, comment)
                      }
                      onAddReply={(parentId, reply) =>
                        handleAddReply(post.postId, parentId, reply)
                      }
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })
      )}
      <AlertDialog
        open={Boolean(selectedPostId)}
        onOpenChange={(value) => {
          if (!value) {
            setSelectedPostId(null);
          }
        }}
      >
        <AlertDialogContent className="bg-backgroundChat text-textChat">
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa bài viết</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa bài viết này với tiêu đề{" "}
              <span className="font-semibold text-red-500">
                {selectedPostTitle}
              </span>{" "}
              này không? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDeletePost}>
              Xác nhận
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
