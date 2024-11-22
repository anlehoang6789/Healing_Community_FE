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
import CommentSection from "@/components/commentSection/commentSection";

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
              content: "Bài viết hữu ích quá",
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
  const handleAddComment = (comment: Comment) => {
    post.comments.push(comment);
  };

  // hàm trả lời bình luận
  const handleAddReply = (parentId: string, reply: Comment) => {
    const updateReplies = (comments: Comment[]): Comment[] => {
      return comments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply],
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
    // Cập nhật state nếu cần
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
      </div>

      <CommentSection
        comments={post.comments}
        onAddComment={handleAddComment}
        onAddReply={handleAddReply}
      />
    </div>
  );
}
