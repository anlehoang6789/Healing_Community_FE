"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useViewPostInGroupByGroupIdQuery } from "@/queries/usePost";
import UserHeaderInGroup from "@/app/user/group/[groupId]/user-header-in-group";
import ReactionCount from "@/components/homePage/reactionCount";
import ReactionEmoji from "@/components/homePage/reactionEmoji";

export default function ViewPostInGroup({ groupId }: { groupId: string }) {
  const { theme } = useTheme();
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

  //data cua bai viet trong group theo groupId
  const { data } = useViewPostInGroupByGroupIdQuery(groupId);
  const postListInGroup = data?.payload.data || [];

  return (
    <div className="mb-2">
      {postListInGroup.length === 0 ? (
        <div className="max-w-4xl mx-auto text-textChat text-center p-4 rounded-lg shadow-lg border mb-6">
          Hiện chưa có bài viết nào
        </div>
      ) : (
        postListInGroup.map((post) => {
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
                <UserHeaderInGroup
                  userId={post.userId}
                  createPost={post.createAt}
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
                    {/* <CommentCount postId={post.postId} /> */}
                  </span>
                </div>

                <div className="flex items-center justify-between w-full">
                  <ReactionEmoji postId={post.postId} />
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
