import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import {
  SendHorizontal,
  ImageIcon,
  X,
  Smile,
  Trash2,
  ChevronUp,
  ChevronDown,
  Flag,
} from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { SharedCommentType } from "@/schemaValidations/post.schema";
import { useUploadAvatarCoverFromFileMutation } from "@/queries/usePost";
import { getUserIdFromLocalStorage, handleErrorApi } from "@/lib/utils";
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
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { toast } from "@/hooks/use-toast";
import { useCheckContentByAIMutation } from "@/queries/useDetector";
import { useGetRoleByUserIdQuery } from "@/queries/useAuth";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import { Role } from "@/constants/type";
import { useGetExpertProfileQuery } from "@/queries/useExpert";

interface CommentSectionProps {
  comments: SharedCommentType[];
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
  deleteComment: (commentId: string, options?: any) => void; // Thêm prop này
}

export default function CommentSharedSection({
  comments: initialComments,
  onAddComment,
  onAddReply,
  deleteComment,
}: CommentSectionProps) {
  const { theme } = useTheme();

  const [comments, setComments] = useState<SharedCommentType[]>([]);
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
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);
  const [hoveredCommentId, setHoveredCommentId] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // state để quản lý việc mở/đóng replies
  const [expandedComments, setExpandedComments] = useState<{
    [key: string]: boolean;
  }>({});

  // Hàm toggle mở/đóng replies
  const toggleRepliesVisibility = (commentId: string) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const userIdComment = getUserIdFromLocalStorage() ?? "";

  const uploadAvatarCover = useUploadAvatarCoverFromFileMutation();

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

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    isReply: boolean,
    commentId?: string
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const uploadResult = await uploadAvatarCover.mutateAsync(formData);
        const imageUrl = uploadResult.payload.url;

        if (isReply && commentId) {
          setReplyImages((prev) => ({ ...prev, [commentId]: imageUrl }));
        } else {
          setCommentImage(imageUrl);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto"; // Reset height

    // Tính toán chiều cao mới
    const newHeight = textarea.scrollHeight;

    // Giới hạn chiều cao tối đa là 150px
    textarea.style.height = `${Math.min(newHeight, 150)}px`;

    // Cập nhật giá trị comment
    setNewComment(textarea.value);
  };

  const checkContentByAIMutation = useCheckContentByAIMutation();

  const handleAddComment = async () => {
    // Kiểm tra nếu đang trong quá trình gửi hoặc kiểm tra nội dung
    if (checkContentByAIMutation.isPending) return;

    // Kiểm tra nếu nội dung bình luận hoặc hình ảnh không rỗng
    if (newComment.trim() || commentImage) {
      setNewComment("");
      setCommentImage(null);
      try {
        // Kiểm tra nội dung bằng AI
        const checkResult = await checkContentByAIMutation.mutateAsync(
          newComment
        );

        // Nếu nội dung không an toàn, hiển thị thông báo và dừng lại
        if (!checkResult.payload.is_safe) {
          toast({
            title: "Oops! Bình luận của bạn không được chấp nhận.",
            description: checkResult.payload.message,
            variant: "destructive",
          });
          return;
        }

        // Gửi bình luận
        onAddComment({
          content: newComment,
          coverImgUrl: commentImage,
        });

        // Reset các trường sau khi gửi
        if (textareaRef.current) {
          textareaRef.current.style.height = "65.6px";
        }
        setNewComment("");
        setCommentImage(null); // Reset hình ảnh sau khi gửi
      } catch (error) {
        // Xử lý lỗi nếu có
        handleErrorApi({ error });
      }
    }
  };

  const handleAddReply = async (parentId: string) => {
    // Kiểm tra nếu đang trong quá trình gửi hoặc kiểm tra nội dung
    if (checkContentByAIMutation.isPending) return;

    // Kiểm tra nếu nội dung reply hoặc hình ảnh không rỗng
    if (replyContent.trim() || replyImages[parentId]) {
      setReplyContent("");
      setReplyingTo(null);
      setReplyImages((prev) => ({ ...prev, [parentId]: null }));
      try {
        // Kiểm tra nội dung bằng AI
        const checkResult = await checkContentByAIMutation.mutateAsync(
          replyContent
        );

        // Nếu nội dung không an toàn, hiển thị thông báo và dừng lại
        if (!checkResult.payload.is_safe) {
          toast({
            title: "Oops! Phản hồi của bạn không được chấp nhận.",
            description: checkResult.payload.message,
            variant: "destructive",
          });
          return;
        }

        // Gửi phản hồi
        onAddReply(parentId, {
          content: replyContent,
          coverImgUrl: replyImages[parentId],
        });

        // Reset các trường sau khi gửi
        setReplyContent("");
        setReplyingTo(null);
        setReplyImages((prev) => ({ ...prev, [parentId]: null })); // Reset hình ảnh reply
      } catch (error) {
        // Xử lý lỗi nếu có
        handleErrorApi({ error });
      }
    }
  };

  // Thêm hàm xử lý xóa comment
  const handleDeleteComment = () => {
    if (commentToDelete) {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.commentId !== commentToDelete)
      );

      deleteComment(commentToDelete, {
        onSuccess: () => {
          setCommentToDelete(null);
        },
      });
    }
  };

  const handleToggleReply = (commentId: string) => {
    // Nếu đang mở reply cho comment này thì đóng, ngược lại mở
    setReplyingTo((prevReplyingTo) =>
      prevReplyingTo === commentId ? null : commentId
    );

    // Reset nội dung và ảnh khi đóng
    if (replyingTo === commentId) {
      setReplyContent("");
      setReplyImages((prev) => ({ ...prev, [commentId]: null }));
    }
  };

  // Avatar của người comment
  const AvatarUserCommentProfile = ({ userId }: { userId: string }) => {
    // Fetch role của người dùng
    const { data: roleByUserId } = useGetRoleByUserIdQuery(userId, !!userId);

    // Fetch thông tin người dùng bình thường
    const { data: userProfile } = useGetUserProfileQuery(
      userId,
      roleByUserId?.payload.data.roleName === Role.User && !!userId
    );

    // Fetch thông tin chuyên gia
    const { data: expertProfile } = useGetExpertProfileQuery(
      userId,
      roleByUserId?.payload.data.roleName === Role.Expert && !!userId
    );

    // Hiển thị Avatar người comment
    return (
      <Link href={`/user/profile/${userId}`}>
        <Avatar className="w-8 h-8 border-2 border-rose-300">
          <AvatarImage
            src={
              userProfile?.payload.data.profilePicture ||
              expertProfile?.payload.data.profileImageUrl ||
              "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
            }
            alt={
              userProfile?.payload.data.fullName ||
              userProfile?.payload.data.userName ||
              expertProfile?.payload.data.fullname ||
              "User"
            }
          />
          <AvatarFallback>
            {userProfile?.payload.data.fullName ||
              userProfile?.payload.data.userName ||
              expertProfile?.payload.data.fullname ||
              expertProfile?.payload.data.email}
          </AvatarFallback>
        </Avatar>
      </Link>
    );
  };

  // Tên của người comment
  const FullNameUserCommentProfile = ({ userId }: { userId: string }) => {
    // Fetch role của người dùng
    const { data: roleByUserId } = useGetRoleByUserIdQuery(userId, !!userId);

    // Fetch thông tin người dùng bình thường
    const { data: userProfile } = useGetUserProfileQuery(
      userId,
      roleByUserId?.payload.data.roleName === Role.User && !!userId
    );

    // Fetch thông tin chuyên gia
    const { data: expertProfile } = useGetExpertProfileQuery(
      userId,
      roleByUserId?.payload.data.roleName === Role.Expert && !!userId
    );

    // Kiểm tra xem người dùng có phải là chuyên gia không
    const isExpert = roleByUserId?.payload.data.roleName === Role.Expert;

    // Hiển thị tên người comment
    return (
      <Link href={`/user/profile/${userId}`}>
        <div className="flex items-center space-x-2">
          <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500">
            {isExpert
              ? expertProfile?.payload.data.fullname ||
                expertProfile?.payload.data.email
              : userProfile?.payload.data.fullName ||
                userProfile?.payload.data.userName ||
                "Anonymous"}
          </span>

          {isExpert && (
            <div className="text-xs text-gray-100 font-semibold px-2 py-1 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] rounded-full shadow-md">
              Chuyên gia
            </div>
          )}
        </div>
      </Link>
    );
  };

  const renderComments = (comments: SharedCommentType[], depth = 0) => {
    return comments.map((comment) => {
      // Kiểm tra xem comment có phải của người dùng hiện tại không
      const isCurrentUserComment = comment.userId === userIdComment;

      const replies = comment.replies ?? [];
      // Kiểm tra xem comment có replies không
      const hasReplies = replies.length > 0;
      const isRepliesExpanded = expandedComments[comment.commentId];

      return (
        <div
          key={comment.commentId}
          className={`flex items-start gap-2 mt-2 ${depth > 0 ? "" : ""}`}
          onMouseEnter={() => setHoveredCommentId(comment.commentId)} // Set ID khi hover
          onMouseLeave={() => setHoveredCommentId(null)} // Reset ID khi rời khỏi hover
        >
          {/* Avatar người comment */}
          <AvatarUserCommentProfile userId={comment.userId} />

          <div className="flex-1">
            <div
              className={` rounded-lg p-2 overflow-hidden break-words relative ${
                theme === "dark"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              {isCurrentUserComment && (
                <>
                  <AlertDialog
                    open={commentToDelete === comment.commentId}
                    onOpenChange={() => setCommentToDelete(null)}
                  >
                    <AlertDialogContent className="bg-backgroundChat text-red-500">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Bạn có chắc chắn muốn xóa bình luận này?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Hành động này không thể hoàn tác. Bình luận sẽ bị xóa{" "}
                          <b className="text-red-500">vĩnh viễn</b>.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          onClick={() => setCommentToDelete(null)}
                        >
                          Hủy
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 text-white"
                          onClick={handleDeleteComment}
                        >
                          Xóa
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                    onClick={() => setCommentToDelete(comment.commentId)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Tên người comment */}
              <FullNameUserCommentProfile userId={comment.userId} />

              <p className=" whitespace-pre-wrap break-all">
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

              {/* Hiển thị icon Flag khi hover và comment không phải của người đăng nhập */}
              {!isCurrentUserComment &&
                hoveredCommentId === comment.commentId && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                    onClick={() =>
                      alert(`Report comment: ${comment.commentId}`)
                    }
                  >
                    <Flag className="h-4 w-4" />
                  </Button>
                )}
            </div>

            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
              <button
                className="hover:underline"
                onClick={() => handleToggleReply(comment.commentId)}
              >
                Phản hồi
              </button>
              <span>
                {new Date(comment.createdAt).toLocaleString("vi-VN", {
                  timeZone: "UTC",
                })}
              </span>
              {/* {comment.likes > 0 && (
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" /> {comment.likes}
              </span>
            )} */}
            </div>

            {/* Nút mở/đóng replies */}
            {hasReplies && (
              <div className="flex justify-start items-center">
                <Button
                  variant="link"
                  size="sm"
                  className="text-gray-500 "
                  onClick={() => toggleRepliesVisibility(comment.commentId)}
                >
                  {isRepliesExpanded ? (
                    <>
                      Thu gọn
                      <ChevronUp className="ml-1 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      {replies.length} phản hồi{" "}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            )}

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
                  <div className="absolute bottom-full right-16 z-[9999]">
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
            <AnimatePresence>
              {hasReplies && isRepliesExpanded && (
                <motion.div
                  key={`replies-${comment.commentId}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    transition: {
                      duration: 0.3,
                      ease: "easeInOut",
                    },
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    transition: {
                      duration: 0.3,
                      ease: "easeInOut",
                    },
                  }}
                  className="mt-2 pl-4 border-l-2 overflow-hidden"
                >
                  {renderComments(replies, depth + 1)}
                </motion.div>
              )}
            </AnimatePresence>
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
          ref={textareaRef}
          value={newComment}
          onChange={handleTextareaChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAddComment();
            }
          }}
          className="border rounded-lg p-2 pr-10 flex-1 resize-none text-muted-foreground"
          style={{
            height: "65.6px",
            maxHeight: "150px",
          }}
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
