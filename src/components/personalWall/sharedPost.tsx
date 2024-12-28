import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { CommentType } from "@/schemaValidations/post.schema";
import ReactionCount from "@/components/homePage/reactionCount";
import ShareSection from "@/components/shareSection/shareSection";
import CommentSection from "@/components/commentSection/commentSection";

interface SharePostSectionProps {
  sharedPosts: any[];
  commentsByPostId: { [key: string]: CommentType[] };
  handleAddComment: (
    postId: string,
    comment: { content: string; coverImgUrl?: string | null }
  ) => void;
  handleAddReply: (
    postId: string,
    parentId: string,
    reply: { content: string; coverImgUrl?: string | null }
  ) => void;
  handleDeleteComment: (commentId: string) => void;
  toggleCommentVisibility: (postId: string) => void;
  visibleCommentPosts: { [postId: string]: boolean };
}

const SharePostSection: React.FC<SharePostSectionProps> = ({
  sharedPosts,
  commentsByPostId,
  handleAddComment,
  handleAddReply,
  handleDeleteComment,
  toggleCommentVisibility,
  visibleCommentPosts,
}) => {
  return (
    <>
      {sharedPosts.length > 0 ? (
        sharedPosts.map((sharedPost) => {
          return (
            <div
              key={sharedPost.shareId}
              className="mb-6 rounded-lg shadow-lg border"
            >
              {/* Người chia sẻ */}
              <div className="flex items-center gap-4 p-4">
                <Avatar className="w-10 h-10 border-2 border-rose-300">
                  <AvatarImage
                    src={
                      sharedPost.userProfilePicture || "/placeholder-user.jpg"
                    }
                    alt={sharedPost.title}
                  />
                  <AvatarFallback>{sharedPost.title[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500">
                    {sharedPost.userName}
                  </h2>
                  <p className="text-sm text-gray-500">{sharedPost.shareAt}</p>
                </div>
              </div>

              {/* Bài viết gốc */}
              <motion.div
                animate={{ height: "auto" }}
                initial={{ height: 100 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="p-4">
                  <div className="font-bold text-lg text-center mb-2">
                    {sharedPost.title}
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: sharedPost.description }}
                  />
                </div>
              </motion.div>

              {/* Tương tác */}
              <div className="flex flex-col items-start gap-4 p-4">
                <div className="flex justify-between w-full">
                  <ReactionCount postId={sharedPost.shareId} />
                  <span className="text-sm text-gray-500">
                    {/* Comment Count Component */}
                  </span>
                </div>

                <div className="flex items-center justify-between w-full">
                  <Button
                    variant="iconDarkMod"
                    className="flex items-center gap-2 p-0"
                    onClick={() => toggleCommentVisibility(sharedPost.shareId)}
                  >
                    Bình luận
                  </Button>
                  <ShareSection postId={sharedPost.shareId}>
                    <Button
                      variant="iconDarkMod"
                      className="flex items-center gap-2 p-0"
                    >
                      Chia sẻ
                    </Button>
                  </ShareSection>
                </div>
              </div>

              <AnimatePresence>
                {visibleCommentPosts[sharedPost.shareId] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full mt-4"
                  >
                    <div className="px-4 pb-4">
                      <CommentSection
                        comments={commentsByPostId[sharedPost.shareId] || []}
                        onAddComment={(comment) =>
                          handleAddComment(sharedPost.shareId, comment)
                        }
                        onAddReply={(parentId, reply) =>
                          handleAddReply(sharedPost.shareId, parentId, reply)
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
      ) : (
        <p className="text-center text-gray-500">
          Chưa có bài viết nào được chia sẻ.
        </p>
      )}
    </>
  );
};

export default SharePostSection;
