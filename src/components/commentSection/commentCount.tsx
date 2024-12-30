import React from "react";
import { useGetCommentCountQuery } from "@/queries/usePost";

const CommentCount: React.FC<{ postId: string }> = ({ postId }) => {
  const { data, isLoading, isError } = useGetCommentCountQuery(postId);

  if (isLoading)
    return (
      <span className="text-sm text-gray-500 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </span>
    );

  if (isError || !data)
    return <div>Hiện tại chức năng đang bảo trì bạn chờ chút nhé</div>;

  const commentCount = data.payload.data.countTotalComment;

  if (commentCount === 0) return null;

  return (
    <span className="text-sm text-gray-500">{commentCount} bình luận</span>
  );
};

export default CommentCount;
