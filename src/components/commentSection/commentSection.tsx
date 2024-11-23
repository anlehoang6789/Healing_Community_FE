import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { SendHorizontal, ImageIcon, X, Smile, ThumbsUp } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { CommentType } from "@/schemaValidations/post.schema";
import { useGetAllUsers } from "@/queries/useUser";
import { UserType } from "@/schemaValidations/user.schema";

interface CommentSectionProps {
  comments: CommentType[];
  onAddComment: (comment: {
    content: string;
    coverImgUrl?: string | null;
  }) => void;
  onAddReply: (
    parentId: string,
    reply: {
      content: string;
      coverImgUrl?: string | null;
    }
  ) => void;
}

export default function CommentSection({
  comments: initialComments,
  onAddComment,
  onAddReply,
}: CommentSectionProps) {
  const { data: users } = useGetAllUsers();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [commentImage, setCommentImage] = useState<string | null>(null);
  const [replyImages, setReplyImages] = useState<{
    [key: string]: string | null;
  }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiPickerForReply, setEmojiPickerForReply] = useState<string | null>(
    null
  );

  // Cập nhật comments khi prop thay đổi
  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const addEmoji = (emoji: any, isReply: boolean, commentId?: string) => {
    if (isReply && commentId) {
      setReplyContent((prevContent) => prevContent + emoji.native);
      setEmojiPickerForReply(null);
    } else {
      setNewComment((prevComment) => prevComment + emoji.native);
      setShowEmojiPicker(false);
    }
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    isReply: boolean,
    commentId?: string
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isReply && commentId) {
          setReplyImages((prev) => ({
            ...prev,
            [commentId]: reader.result as string,
          }));
        } else {
          setCommentImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment({
        content: newComment, // Chỉ gửi content
        coverImgUrl: commentImage,
      });

      setNewComment("");
      setCommentImage(null); // Reset hình ảnh sau khi gửi
    }
  };

  const handleAddReply = (parentId: string) => {
    if (replyContent.trim()) {
      onAddReply(parentId, {
        content: replyContent, // Chỉ gửi content
        coverImgUrl: replyImages[parentId],
      });

      setReplyContent("");
      setReplyingTo(null);
      setReplyImages((prev) => ({ ...prev, [parentId]: null })); // Reset hình ảnh reply
    }
  };

  const findUserById = (userId: string): UserType | undefined => {
    return users?.find((user) => user.userId === userId);
  };
  const renderComments = (comments: CommentType[], depth = 0) => {
    return comments.map((comment) => {
      // Tìm thông tin người dùng dựa trên userId
      const user = findUserById(comment.userId);

      return (
        <div
          key={comment.commentId}
          className={`flex items-start gap-2 mt-2 ${depth > 0 ? "ml-8" : ""}`}
        >
          <Link href="#">
            <Avatar className="w-8 h-8 border-2 border-rose-300">
              <AvatarImage
                src={user?.profilePicture || "/default-avatar.png"}
                alt={user?.userName || "User"}
              />
              <AvatarFallback>{user?.userName?.[0] || "U"}</AvatarFallback>
            </Avatar>
          </Link>

          <div className="flex-1">
            <div className="bg-gray-100 rounded-lg p-2 overflow-hidden break-words">
              <Link href="#">
                <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500">
                  {user?.userName || user?.fullName || comment.userId}
                </span>
              </Link>

              <p className="text-black whitespace-pre-wrap break-all">
                {comment.content}
              </p>

              {comment.coverImgUrl && (
                <Image
                  src={comment.coverImgUrl}
                  alt="Comment image"
                  width={200}
                  height={200}
                  className="mt-2 rounded-lg"
                />
              )}
            </div>

            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
              <button className="hover:underline">Thích</button>
              <button
                className="hover:underline"
                onClick={() => setReplyingTo(comment.commentId)}
              >
                Trả lời
              </button>
              <span>{new Date(comment.createdAt).toLocaleString()}</span>
              {/* {comment.likes > 0 && (
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" /> {comment.likes}
              </span>
            )} */}
            </div>

            {replyingTo === comment.commentId && (
              <div className="mt-2 flex items-center w-full relative">
                <div className="flex-1 mr-2">
                  <textarea
                    value={replyContent}
                    onChange={(e) => {
                      const textarea = e.target;
                      textarea.style.height = "auto";
                      textarea.style.height = `${textarea.scrollHeight}px`;
                      setReplyContent(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleAddReply(comment.commentId);
                      }
                    }}
                    className="border rounded-lg p-2 pr-10 w-full resize-none min-h-[40px] max-h-[120px] text-muted-foreground"
                    placeholder="Nhập trả lời..."
                  />
                </div>

                <Button
                  variant="iconSend"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                  className=" absolute right-9 top-1/2 transform -translate-y-1/2 "
                >
                  <ImageIcon className="h-5 w-5" />
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) =>
                    handleImageUpload(e, true, comment.commentId)
                  }
                  accept="image/*"
                  className="hidden"
                />

                <Button
                  variant="iconSend"
                  onClick={() => handleAddReply(comment.commentId)}
                  className="absolute right-0"
                >
                  <SendHorizontal className="h-5 w-5 hover:text-blue-500" />
                </Button>

                {/* Emoji Button */}
                <Button
                  variant="iconSend"
                  size="icon"
                  onClick={() => {
                    // Nếu đang mở cho comment này thì đóng, ngược lại mở
                    setEmojiPickerForReply(
                      emojiPickerForReply === comment.commentId
                        ? null
                        : comment.commentId
                    );
                  }}
                  className="absolute right-16 top-1/2 transform -translate-y-1/2"
                >
                  <Smile className="h-5 w-5" />
                </Button>

                {/* Emoji Picker chỉ hiện cho comment đang được chọn */}
                {emojiPickerForReply === comment.commentId && (
                  <div className="absolute bottom-full right-16 z-50">
                    <Picker
                      data={data}
                      onEmojiSelect={(emoji: any) =>
                        addEmoji(emoji, true, comment.commentId)
                      }
                      theme="light"
                      previewPosition="none"
                      skinTonePosition="none"
                      autoFocus={true}
                      locale="vi"
                    />
                  </div>
                )}
              </div>
            )}

            {/* image comment preview */}
            {replyImages[comment.commentId] && (
              <div className="relative w-24 h-24 mb-4">
                <Image
                  src={replyImages[comment.commentId] as string}
                  alt="Uploaded image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() =>
                    setReplyImages((prev) => ({
                      ...prev,
                      [comment.commentId]: null,
                    }))
                  }
                  className="absolute top-1 right-1 h-6 w-6 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Hiển thị replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-2">
                {renderComments(comment.replies, depth + 1)}
              </div>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      {/* Input comment */}
      <div className="w-full flex items-center relative">
        <textarea
          value={newComment}
          onChange={(e) => {
            const textarea = e.target;
            textarea.rows = 1;
            const newRowCount = Math.ceil(
              textarea.scrollHeight / textarea.offsetHeight
            );
            textarea.rows = newRowCount;
            setNewComment(textarea.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddComment();
            }
          }}
          className="border rounded-lg p-2 pr-10 flex-1 resize-none h-auto text-muted-foreground"
          placeholder="Nhập bình luận..."
        />

        <Button
          variant="iconSend"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          className=" absolute right-9 top-1/2 transform -translate-y-1/2 "
        >
          <ImageIcon className="h-5 w-5" />
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleImageUpload(e, false)}
          accept="image/*"
          className="hidden"
        />

        <Button
          variant="iconSend"
          onClick={handleAddComment}
          className="absolute right-0 "
        >
          <SendHorizontal className="h-5 w-5 hover:text-blue-500" />
        </Button>

        {/* emoji Button */}
        <Button
          variant="iconSend"
          size="icon"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="absolute right-16 top-1/2 transform -translate-y-1/2"
        >
          <Smile className="h-5 w-5" />
        </Button>

        {showEmojiPicker && (
          <div className="absolute bottom-full right-16 z-50">
            <Picker
              data={data}
              onEmojiSelect={(emoji: any) => addEmoji(emoji, false)}
              theme="light"
              previewPosition="none"
              skinTonePosition="none"
              autoFocus="true"
              locale="vi"
            />
          </div>
        )}
      </div>

      {/* Comment preview */}
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

      {/* Render comments */}
      <div className="w-full">{renderComments(comments)}</div>
    </div>
  );
}
