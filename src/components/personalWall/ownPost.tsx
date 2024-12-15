"use client";

import { createContext, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Ellipsis,
  FilePenLine,
  Globe,
  LockKeyhole,
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
  useAddReactionMutation,
  useCreateCommentMutation,
  useDeleteCommentByCommnetIdMutation,
  useDeletePostByPostIdMutation,
  useGetCommentCountQuery,
  useGetPostByUserIdQuery,
  useGetReactionCountQuery,
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
import CommentSection from "@/components/commentSection/commentSection";
import {
  CommentType,
  GetPostByUserIdResType,
} from "@/schemaValidations/post.schema";
import postApiRequest from "@/apiRequests/post";
import EditPersonalPost from "@/components/personalWall/editPersonalPost";
import Image from "next/image";
import { useUserIsOwnerStore } from "@/store/userStore";
import { useReactionStore } from "@/store/reactionStore";
import ReactionEmoji from "@/components/homePage/reactionEmoji";

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

const CommentCount: React.FC<{ postId: string }> = ({ postId }) => {
  const { data, isLoading, isError, refetch } = useGetCommentCountQuery(postId);

  if (isLoading)
    return (
      <span className="text-sm text-gray-500 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </span>
    );
  if (isError || !data)
    return <div>Hiện tại chức năng đang bảo trì bạn chờ chút nhé</div>;

  const commentCount = data.payload.data.countTotalComment;

  return (
    <span className="text-sm text-gray-500">{commentCount} bình luận</span>
  );
};

type PostItem = GetPostByUserIdResType["data"][0];
const OwnPostContext = createContext<{
  postId: string | undefined;
  setPostId: (value: string | undefined) => void;
  postDelete: PostItem | null;
  setPostDelete: (value: PostItem | null) => void;
}>({
  postId: undefined,
  setPostId: (value: string | undefined) => {},
  postDelete: null,
  setPostDelete: (value: PostItem | null) => {},
});

export default function OwnPost() {
  const { userId } = useParams(); //lấy userId từ url
  const userIdFromLocalStorage = getUserIdFromLocalStorage();
  const { theme } = useTheme();
  const { isThatOwner } = useUserIsOwnerStore();

  const { data } = useGetPostByUserIdQuery(userId as string);
  // const postList = data?.payload.data || [];
  const [postList, setPostList] = useState<GetPostByUserIdResType["data"]>([]);
  const { data: userById } = useGetUserProfileQuery(userId as string);
  const [postId, setPostId] = useState<string | undefined>(undefined);
  const [postDelete, setPostDelete] = useState<PostItem | null>(null);
  // filter bài viết theo status dựa theo isThatOwner. Nêú nó là isThatOwner thì hiển thị tất cả bài viết, ngược lại thì chỉ hiển thị bài viết public
  const postListByStatus = postList.filter(
    (post) => isThatOwner || post.status === 0
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

  const userIdComment = getUserIdFromLocalStorage() ?? "";
  const [commentsByPostId, setCommentsByPostId] = useState<{
    [key: string]: CommentType[];
  }>({});
  const { mutate: createComment } = useCreateCommentMutation(postId as string);
  const [visibleCommentPosts, setVisibleCommentPosts] = useState<{
    [postId: string]: boolean;
  }>({});

  const { mutate: deleteComment } = useDeleteCommentByCommnetIdMutation(
    postId as string
  );

  const handleDeleteComment = (commentId: string) => {
    deleteComment(commentId, {
      onSuccess: async () => {
        // Lặp qua từng post để tìm và cập nhật comments
        const updatedCommentsByPostId = { ...commentsByPostId };

        Object.keys(updatedCommentsByPostId).forEach((postId) => {
          updatedCommentsByPostId[postId] = updatedCommentsByPostId[
            postId
          ].filter(
            (comment) =>
              comment.commentId !== commentId && comment.parentId !== commentId
          );
        });

        // Cập nhật state comments
        setCommentsByPostId(updatedCommentsByPostId);

        // Nếu muốn đảm bảo đồng bộ, có thể fetch lại comments của từng post
        try {
          const postIds = Object.keys(commentsByPostId);
          const commentsPromises = postIds.map((postId) =>
            postApiRequest.getCommentsByPostId(postId)
          );

          const commentsResults = await Promise.all(commentsPromises);

          const refreshedCommentsByPostId: { [key: string]: CommentType[] } =
            {};
          postIds.forEach((postId, index) => {
            refreshedCommentsByPostId[postId] =
              commentsResults[index].payload.data;
          });

          setCommentsByPostId(refreshedCommentsByPostId);
        } catch (error) {
          console.error("Error refetching comments:", error);
        }
      },
      onError: (error) => {
        console.error("Error deleting comment:", error);
      },
    });
  };
  useEffect(() => {
    if (data) {
      setPostList(data.payload.data);
    }
  }, [data]);

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
          // Thay vì tạo comment ngay lập tức, hãy refetch toàn bộ comments
          postApiRequest
            .getCommentsByPostId(postId)
            .then((commentsResponse) => {
              setCommentsByPostId((prev) => ({
                ...prev,
                [postId]: commentsResponse.payload.data,
              }));
            })
            .catch((error) => {
              console.error("Error fetching comments:", error);
            });
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

  function AlertDialogDeletePost({
    postDelete,
    setPostDelete,
  }: {
    postDelete: PostItem | null;
    setPostDelete: (value: PostItem | null) => void;
  }) {
    const { mutateAsync } = useDeletePostByPostIdMutation(userId as string);
    const deletePost = async () => {
      if (postDelete) {
        try {
          // console.log("Trước khi xóa:", postDelete);
          const result = await mutateAsync(postDelete.postId);
          setPostList((prev) =>
            prev.filter((post) => post.postId !== postDelete.postId)
          );
          toast({
            description: result.payload.message,
            variant: "success",
          });
          setPostDelete(null);
        } catch (error) {
          handleErrorApi({ error });
        }
      }
    };

    return (
      <AlertDialog
        open={Boolean(postDelete)}
        onOpenChange={(value) => {
          if (!value) {
            setPostDelete(null);
          }
        }}
        aria-hidden={false}
      >
        <AlertDialogContent className="bg-backgroundChat">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-textChat font-bold text-lg">
              Xóa bài viết?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Bài viết có tiêu đề{" "}
              <span className="bg-muted text-primary-foreground rounded px-1">
                {postDelete?.title}
              </span>{" "}
              sẽ bị xóa vĩnh viễn
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-textChat">Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={deletePost}>Xác nhận</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

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
    <OwnPostContext.Provider
      value={{
        postId,
        setPostId,
        postDelete,
        setPostDelete,
      }}
    >
      <div className="mb-2">
        {postListByStatus.length === 0 ? (
          <div className="text-textChat text-center p-4 rounded-lg shadow-lg border mb-6">
            Hiện chưa có bài viết nào
          </div>
        ) : (
          postListByStatus.map((post) => {
            const isExpanded = expandedPosts[post.postId] || false;
            const truncate = shouldTruncateDescription(post.description);
            const openDeletePost = () => {
              setPostDelete(post);
            };
            const openEditPost = () => {
              setPostId(post.postId);
              console.log("postId dùng để sửa bài viết", post.postId);
            };
            const shouldRenderDropdown = userIdFromLocalStorage === userId;
            const isPostPublic = post.status === 0;
            return (
              <div
                key={post.postId}
                className=" rounded-lg shadow-lg border mb-6"
              >
                <Image
                  src={post.coverImgUrl}
                  alt="Banner"
                  width={1000}
                  height={500}
                  priority={true}
                  className="w-full h-[250px] object-cover rounded-t-lg"
                />
                <div className="flex items-center gap-4 mb-6 p-4">
                  {/* Avatar, name*/}
                  <Avatar className="w-10 h-10 sm:w-10 sm:h-10 border-2 border-rose-300 mb-2">
                    <AvatarImage
                      src={
                        userById?.payload.data.profilePicture ||
                        "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                      }
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
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500">
                        {formatDateTime(post.createAt)}
                      </p>
                      <p className="text-gray-500">
                        {isPostPublic ? (
                          <Globe className="h-4 w-4" />
                        ) : (
                          <LockKeyhole className="h-4 w-4" />
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Dropdown menu */}
                  {shouldRenderDropdown && (
                    <DropdownMenu modal={false} aria-hidden={false}>
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
                        <DropdownMenuItem onClick={openEditPost}>
                          <FilePenLine className="mr-2 h-4 w-4" />
                          <span>Sửa bài viết</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={openDeletePost}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Xóa bài viết</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ShieldMinus className="mr-2 h-4 w-4" />
                          <span>Chỉnh sửa quyền riêng tư</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
                <EditPersonalPost
                  postId={postId}
                  setPostId={setPostId}
                  onSubmitSuccess={() => {}}
                />
                <AlertDialogDeletePost
                  postDelete={postDelete}
                  setPostDelete={setPostDelete}
                />

                {/* Body of story */}
                <motion.div
                  animate={{ height: isExpanded ? "auto" : 300 }} // auto cho phép nội dung mở rộng tự nhiên
                  initial={{ height: 300 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="whitespace-pre-wrap mb-4 text-textChat p-4">
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
                  <div className="flex justify-end p-4">
                    <button
                      onClick={() => toggleExpand(post.postId, !isExpanded)}
                      className="text-blue-500 hover:underline focus:outline-none mt-2 mb-3"
                    >
                      {isExpanded ? "Thu gọn" : "Xem thêm"}
                    </button>
                  </div>
                )}

                {/* Like, share, comment tabs*/}
                <div className="flex flex-col items-start gap-4 p-4">
                  <div className="flex justify-between w-full">
                    <ReactionCount postId={post.postId} />
                    <span className="justify-end text-sm text-gray-500">
                      <CommentCount postId={post.postId} />
                    </span>
                  </div>

                  <div className="flex items-center justify-between w-full">
                    <div className="relative">
                      <div
                        className="inline-block"
                        onMouseEnter={() => setHoveredPostId(post.postId)}
                        onMouseLeave={() => setHoveredPostId(null)}
                      >
                        <Button
                          variant="iconDarkMod"
                          className="flex items-center gap-2 p-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {selectedReactions[post.postId] ? (
                            <span className="text-xl">
                              {selectedReactions[post.postId]}
                            </span>
                          ) : (
                            <div className="flex items-center gap-2">
                              <ThumbsUp className="w-4 h-4" />
                              Thích
                            </div>
                          )}
                        </Button>

                        {/* Hiển thị ReactionEmoji khi hover */}
                        {hoveredPostId === post.postId && (
                          <ReactionEmoji
                            onSelect={(reactionId, emoji, e) =>
                              handleEmojiSelect(
                                reactionId,
                                emoji,
                                post.postId,
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
                      <div className="px-5">
                        <CommentSection
                          comments={commentsByPostId[post.postId] || []}
                          onAddComment={(comment) =>
                            handleAddComment(post.postId, comment)
                          }
                          onAddReply={(parentId, reply) =>
                            handleAddReply(post.postId, parentId, reply)
                          }
                          deleteComment={(commentId) =>
                            handleDeleteComment(commentId)
                          }
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>
    </OwnPostContext.Provider>
  );
}
