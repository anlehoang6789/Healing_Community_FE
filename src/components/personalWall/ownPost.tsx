"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Ellipsis,
  FilePenLine,
  MessageSquare,
  SendHorizontal,
  Share2,
  ShieldMinus,
  ThumbsUp,
  Trash2,
  ImageIcon,
  X,
  Smile,
} from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import Link from "next/link";

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  image?: string;
  replies?: Comment[];
}

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  totalcomments: number;
  comments: Comment[];
}

const post: Post = {
  id: "1",
  user: {
    name: "Hoàng An",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  content: `HUAWEI Mate XT ULTIMATE DESIGN ra mắt: Smartphone gập ba màn hình, giá từ 69,3 triệu đồng
Vào ngày 10/9/2024 (theo giờ Việt Nam), Huawei Mate XT Ultimate Design ra mắt chính thức tại thị trường nội địa Trung Quốc điện thoại gập 3 màn hình. Đây chính là hãng sản xuất kế tiếp phát triển những Huawei là hãng đầu tiên thành công trong việc thương mại hóa chính thức dòng smartphone này.
Thiết kế HUAWEI Mate XT ULTIMATE DESIGN
Về ngoại hình tổng thể HUAWEI Mate XT ULTIMATE DESIGN sở hữu màn hình kích thước lần lượt là đến 10,2 inch, con số này nhất thời trong smartphone gập. Màn hình này có khả năng gập làm ba với hai bản lề.
Vì vậy, người dùng công cụ thể sử dụng thiết bị dưới dạng 1 màn hình 4,4 inch hoặc 2 màn hình 7,9 inch.
Dưới đây sẽ là kích thước tổng thể của HUAWEI Mate XT ULTIMATE DESIGN ở 3 trạng thái khác nhau:
  • Trạng thái 1 màn hình: 156,7 x 75,5 x 17,4 mm.
  • Trạng thái 2 màn hình: 156,7 x 143,9 x 7,45/6,75 mm.
  • Trạng thái 3 màn hình: 156,7 x 219 x 3,6 mm/4,75 mm.

Nội dung sau hình ảnh: Đây là một ví dụ về nội dung xuất hiện sau hình ảnh. Chúng ta cần đảm bảo rằng phần này cũng được xử lý đúng cách trong quá trình thu gọn và mở rộng nội dung bài viết.`,
  image:
    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  timestamp: "13h",
  likes: 20,
  totalcomments: 10,
  comments: [
    {
      id: "1",
      user: {
        name: "HungNghia",
        avatar:
          "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
      },
      content: "Bài viết hữu ích quá",
      timestamp: "10 phút",
      likes: 10,
      replies: [
        {
          id: "2",
          user: {
            name: "HungNghia",
            avatar:
              "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
          },
          content: "Bài viết hữu ích quá",
          timestamp: "10 phút",
          likes: 10,
          replies: [
            {
              id: "3",
              user: {
                name: "HungNghia",
                avatar:
                  "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
              },
              content: "Bài viết hữu ích quá ádfasdfasdf",
              timestamp: "10 phút",
              likes: 10,
            },
          ],
        },
        {
          id: "4",
          user: {
            name: "ThanhDat",
            avatar:
              "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
          },
          content: "Đọc vài điều chưa hay lắm về sản phẩm này",
          timestamp: "5 giờ",
          likes: 0,
        },
      ],
    },
    {
      id: "5",
      user: {
        name: "ThanhDat",
        avatar:
          "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
      },
      content: "Đọc vài điều chưa hay lắm về sản phẩm này",
      timestamp: "5 giờ",
      likes: 0,
      replies: [
        {
          id: "6",
          user: {
            name: "HungNghia",
            avatar:
              "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
          },
          content: "Bài viết hữu ích quá",
          timestamp: "10 phút",
          likes: 10,
        },
      ],
    },
  ],
};

export default function OwnPost() {
  const [isExpanded, setIsExpanded] = useState(false); // Trạng thái để kiểm tra xem bài viết có đang mở rộng hay không
  const [shouldTruncate, setShouldTruncate] = useState(false); // Trạng thái để kiểm tra xem nội dung có nên bị rút gọn hay không
  const contentRef = useRef<HTMLDivElement>(null); // Khai báo ref để tham chiếu đến nội dung bài viết
  const { theme } = useTheme();
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

  const addEmoji = (emoji: any, isReply: boolean, commentId?: string) => {
    if (isReply && commentId) {
      setReplyContent((prevContent) => prevContent + emoji.native);
      setEmojiPickerForReply(null); // Đóng emoji picker sau khi chọn
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

  //kiểm tra chiều cao của nội dung và xác định xem nó có cần rút gọn không
  useEffect(() => {
    if (contentRef.current) {
      setShouldTruncate(contentRef.current.scrollHeight > 300);
    }
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // hàm thêm bình luận mới
  const handleAddComment = () => {
    if (newComment.trim() || commentImage) {
      const comment: Comment = {
        id: `comment-${Date.now()}`,
        user: {
          name: "Gia Minh",
          avatar:
            "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
        },
        content: newComment,
        timestamp: "Vừa xong",
        likes: 0,
        image: commentImage || undefined,
      };

      post.comments.push(comment);
      setNewComment("");
      setCommentImage(null);
    }
  };

  // hàm trả lời bình luận
  const handleAddReply = (parentId: string) => {
    if (replyContent.trim() || replyImages[parentId]) {
      const newReply: Comment = {
        id: Date.now().toString(),
        user: {
          name: "Gia Minh",
          avatar:
            "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
        },
        content: replyContent,
        timestamp: "Vừa xong",
        likes: 0,
        image: replyImages[parentId] || undefined,
      };

      const updateReplies = (comments: Comment[]): Comment[] => {
        return comments.map((comment) => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newReply],
            };
          }
          if (comment.replies) {
            return {
              ...comment,
              replies: updateReplies(comment.replies),
            };
          }
          return comment;
        });
      };

      post.comments = updateReplies(post.comments);
      setReplyingTo(null);
      setReplyContent("");
      setReplyImages((prev) => ({ ...prev, [parentId]: null }));
    }
  };

  // hiển thị comment lồng nhau
  const renderComments = (comments: Comment[], depth = 0) => {
    return comments.map((comment) => (
      <div
        key={comment.id}
        className={`flex items-start gap-2 mb-2 ${depth > 0 ? "" : ""}`}
      >
        <Link href="#">
          <Avatar className="w-8 h-8 border-2 border-rose-300">
            <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
            <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex-1">
          <div className="bg-gray-100 rounded-lg p-2  overflow-hidden break-words">
            <Link href="#">
              <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500">
                {comment.user.name}
              </span>
            </Link>

            <p className="text-black whitespace-pre-wrap break-all">
              {comment.content}
            </p>

            {comment.image && (
              <Image
                src={comment.image}
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
              onClick={() => setReplyingTo(comment.id)}
            >
              Trả lời
            </button>
            <span>{comment.timestamp}</span>
            {comment.likes > 0 && (
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" /> {comment.likes}
              </span>
            )}
          </div>

          {/* input reply */}
          {replyingTo === comment.id && (
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
                      handleAddReply(comment.id);
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
                onChange={(e) => handleImageUpload(e, true, comment.id)}
                accept="image/*"
                className="hidden"
              />

              <Button
                variant="iconSend"
                onClick={() => handleAddReply(comment.id)}
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
                    emojiPickerForReply === comment.id ? null : comment.id
                  );
                }}
                className="absolute right-16 top-1/2 transform -translate-y-1/2"
              >
                <Smile className="h-5 w-5" />
              </Button>

              {/* Emoji Picker chỉ hiện cho comment đang được chọn */}
              {emojiPickerForReply === comment.id && (
                <div className="absolute bottom-full right-16 z-50">
                  <Picker
                    data={data}
                    onEmojiSelect={(emoji: any) =>
                      addEmoji(emoji, true, comment.id)
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
          {replyImages[comment.id] && (
            <div className="relative w-24 h-24 mb-4">
              <Image
                src={replyImages[comment.id] as string}
                alt="Uploaded image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={() =>
                  setReplyImages((prev) => ({ ...prev, [comment.id]: null }))
                }
                className="absolute top-1 right-1 h-6 w-6 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-2">
              {renderComments(comment.replies, depth + 1)}
            </div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="p-4 rounded-lg shadow-lg border">
      <div className="flex items-center gap-4 mb-6">
        {""}
        {/* Avatar, name*/}
        <Link href="#">
          <Avatar className="w-10 h-10 sm:w-10 sm:h-10 border-2 border-rose-300 mb-2">
            <AvatarImage src={post.user.avatar} alt={post.user.name} />
            <AvatarFallback>{post.user.name[0]}</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <Link href="#" className="hover:underline">
            <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500">
              {post.user.name}
            </h2>
          </Link>
          <p className="text-sm text-gray-500">{post.timestamp}</p>
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
              theme === "dark" ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            <DropdownMenuItem>
              <FilePenLine className="mr-2 h-4 w-4" />
              <span>Sửa bài viết</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
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

      <div
        ref={contentRef}
        className={`relative ${
          !isExpanded && shouldTruncate ? "max-h-[600px] overflow-hidden" : ""
        }`}
      >
        <div className="whitespace-pre-wrap mb-4 text-muted-foreground">
          {post.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
        {post.image && (
          <div className="my-4">
            <Image
              src={post.image}
              alt="Post image"
              width={700}
              height={700}
              style={{ width: "auto", height: "auto" }}
              loading="lazy"
              className="rounded-lg"
            />
          </div>
        )}
        {!isExpanded && shouldTruncate && (
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
        )}
        <p className="whitespace-pre-wrap mb-4 text-muted-foreground">
          {post.content}
        </p>
      </div>
      {shouldTruncate && (
        <div className="flex justify-end">
          <button
            onClick={toggleExpand}
            className="text-blue-500 hover:underline focus:outline-none mt-2 mb-3"
          >
            {isExpanded ? "Thu gọn" : "Xem thêm"}
          </button>
        </div>
      )}

      {/* Like, share, comment tabs*/}
      <div className="flex flex-col items-start gap-4">
        <div className="flex justify-between w-full">
          <span className="text-sm text-gray-500">{post.likes} lượt thích</span>
          <span className="justify-end text-sm text-gray-500">
            {post.totalcomments} bình luận
          </span>
        </div>

        <div className="flex items-center justify-between w-full">
          <Button variant="iconDarkMod" className="flex items-center gap-2 p-0">
            <ThumbsUp className="w-4 h-4" />
            Thích
          </Button>
          <Button variant="iconDarkMod" className="flex items-center gap-2 p-0">
            <MessageSquare className="w-4 h-4" />
            Bình luận
          </Button>
          <Button variant="iconDarkMod" className="flex items-center gap-2 p-0">
            <Share2 className="w-4 h-4" />
            Chia sẻ
          </Button>
        </div>

        {/* input comment */}
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

        {/* Comment */}
        <div className="w-full">{renderComments(post.comments)}</div>
      </div>
    </div>
  );
}
