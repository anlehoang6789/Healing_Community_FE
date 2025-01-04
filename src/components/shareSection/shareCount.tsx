import React from "react";
import { useGetShareCountQuery } from "@/queries/usePost";

const ShareCount: React.FC<{ postId: string; showText?: boolean }> = ({
  postId,
  showText = true,
}) => {
  const { data, isLoading, isError } = useGetShareCountQuery(postId);

  if (isLoading)
    return (
      <span className="text-sm text-gray-500 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </span>
    );

  if (isError || !data)
    return <div>Hiện tại chức năng đang bảo trì bạn chờ chút nhé</div>;

  const shareCount = data.payload.data.shareCount;

  if (shareCount === 0) return null;

  return (
    <span className="text-sm text-gray-500">
      {showText ? `${shareCount} lượt chia sẻ` : shareCount}
    </span>
  );
};

export default ShareCount;
