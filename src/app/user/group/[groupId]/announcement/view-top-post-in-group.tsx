"use client";
import {
  useCreateCommentMutation,
  useDeleteCommentByCommnetIdMutation,
  useGetTopPostInGroupQuery,
} from "@/queries/usePost";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactionCount from "@/components/homePage/reactionCount";
import CommentCount from "@/components/commentSection/commentCount";
import ReactionEmoji from "@/components/homePage/reactionEmoji";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import CommentSection from "@/components/commentSection/commentSection";
import { CommentType } from "@/schemaValidations/post.schema";
import postApiRequest from "@/apiRequests/post";
import UserHeaderTopPostInGroup from "@/app/user/group/[groupId]/announcement/user-header-top-post-in-group";

export default function ViewTopPostInGroup() {
  const param = useParams();
  const groupId = param.groupId;

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

  const [visibleCommentPosts, setVisibleCommentPosts] = useState<{
    [postId: string]: boolean;
  }>({});

  const [commentsByPostId, setCommentsByPostId] = useState<{
    [key: string]: CommentType[];
  }>({});

  //data cua bai viet trong group theo groupId
  const { data } = useGetTopPostInGroupQuery(groupId as string);
  const topPostListInGroup = data?.payload.data || [];
  const { mutate: createComment } = useCreateCommentMutation();
  const { mutate: deleteComment } = useDeleteCommentByCommnetIdMutation();

  useEffect(() => {
    // Lặp qua tất cả các bài viết và fetch dữ liệu bình luận nếu cần
    Object.keys(visibleCommentPosts).forEach((postId) => {
      if (visibleCommentPosts[postId]) {
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
      }
    });
  }, [visibleCommentPosts]); // Theo dõi sự thay đổi của visibleCommentPosts

  // hàm ẩn hiện bình luận
  const toggleCommentVisibility = (postId: string) => {
    setVisibleCommentPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

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

  const handleDeleteComment = (commentId: string) => {
    deleteComment(
      {
        commentId,
        postId: Object.keys(commentsByPostId).find((postId) =>
          commentsByPostId[postId].some(
            (comment) =>
              comment.commentId === commentId || comment.parentId === commentId
          )
        ),
      },
      {
        onSuccess: async () => {
          // Lặp qua từng post để tìm và cập nhật comments
          const updatedCommentsByPostId = { ...commentsByPostId };

          Object.keys(updatedCommentsByPostId).forEach((postId) => {
            updatedCommentsByPostId[postId] = updatedCommentsByPostId[
              postId
            ].filter(
              (comment) =>
                comment.commentId !== commentId &&
                comment.parentId !== commentId
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
      }
    );
  };

  return (
    <div className="mb-2">
      {topPostListInGroup.length === 0 ? (
        <div className="max-w-4xl mx-auto text-textChat text-center p-4 rounded-lg shadow-lg border mb-6">
          Hiện chưa có bài viết nào
        </div>
      ) : (
        topPostListInGroup.map((post) => {
          const isExpanded = expandedPosts[post.postId] || false;
          const truncate = shouldTruncateDescription(post.description);

          return (
            <div
              key={post.postId}
              className="max-w-4xl mx-auto mb-4 rounded-lg shadow-lg border"
            >
              <Image
                src={post.coverImgUrl}
                alt="Banner"
                width={1000}
                height={500}
                priority={true}
                className="w-full h-[250px] object-cover rounded-t-lg"
              />
              {/* Header with name, avatar, post create at, dropdown edit and delete */}
              <div className="flex items-center gap-4 mb-6 p-4">
                <UserHeaderTopPostInGroup
                  userId={post.userId}
                  createPost={post.createAt}
                  groupId={groupId as string}
                  roleInGroup={post.roleInGroup}
                />
                {/* Chỗ này có thể là dropdown nếu cần */}
              </div>
              {/* Title and content */}
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
              {/* Reaction, Comment */}
              <div className="flex flex-col items-start gap-4 p-4">
                <div className="flex justify-between w-full">
                  <ReactionCount postId={post.postId} />
                  <span className="justify-end text-sm text-gray-500">
                    {/* Comment chỗ này */}
                    <CommentCount postId={post.postId} />
                  </span>
                </div>

                <div className="flex items-center justify-between w-full">
                  <ReactionEmoji postId={post.postId} />
                  <Button
                    variant="iconDarkMod"
                    className="flex items-center gap-2 p-0"
                    onClick={() => toggleCommentVisibility(post.postId)}
                  >
                    <MessageSquare className="w-4 h-4" />
                    Bình luận
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
                    className="w-full mt-4 "
                  >
                    <div className="px-4 pb-4">
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
  );
}
